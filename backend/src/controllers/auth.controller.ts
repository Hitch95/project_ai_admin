import authService from "../services/auth.service.ts";
import { type Request, type Response } from "express";

const authController = {
  login: async function (req: Request, res: Response, next: Function) {
    const { email, password } = req.body;

    try {
      const userData = await authService.login(email, password);
      if (userData.user) {
        delete userData.user.dataValues.password;
      }
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;