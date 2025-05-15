import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.ts";

const { User } = db;

async function findUserByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Authentication failed: User not found");
  }
  return user;
}

const authService = {
  login: async function (email: string, password: string) {
    const user = await findUserByEmail(email);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Authentication failed: Incorrect password');
    }

    const token = jwt.sign(
      {
        email: user.email,
        user_id: user.id,
      },
      process.env.SECRET_API_KEY as string,
      { expiresIn: "24h" }
    );

    return { user, token };
  },

  verifyAndDecode: function (req: any, res: any) {
    try {
      if (!req.headers.authorization) {
        return { valid: false, error: "Unauthorized" };
      }

      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_API_KEY as string);
      if (
        typeof decodedToken !== "object" ||
        !("email" in decodedToken) ||
        !("user_id" in decodedToken)
      ) {
        throw new Error("Invalid token");
      }
      res.locals.decodedToken = decodedToken;
      return { valid: true };
    } catch (err) {
      console.error("[verifyAndDecode] " + err);
      return { valid: false, error: "Unauthorized" };
    }
  },
};

export default authService;