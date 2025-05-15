import express from "express";
import type { Express, Request, Response } from "express";

import UserController from "../controllers/user.controller.ts";
import { authJwt } from "../middleware/auth.ts";
import { checkValidationErrors } from "../middleware/validators.ts";

const router = express.Router();

router.post("/", authJwt, checkValidationErrors, async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});
router.get("/:id", authJwt, checkValidationErrors, async (req: Request, res: Response) => {
  await UserController.getUserById(req, res);
});
router.put("/:id", authJwt, checkValidationErrors, async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

export default router;