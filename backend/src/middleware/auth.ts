import AuthJwtSrv from "../services/auth.service.ts";

export const authJwt = (req, res, next) => {
  const tokenValidity = AuthJwtSrv.verifyAndDecode(req, res);
  if (!tokenValidity.valid) {
    return res.status(401).json({ error: "Invalid token" });
  }
  return next();
};