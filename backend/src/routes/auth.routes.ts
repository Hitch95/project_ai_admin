import express, {type Express } from "express";
import { body } from "express-validator";

// middleware
import { checkValidationErrors } from "../middleware/validators.ts";

// controllers
import authController from "../controllers/auth.controller.ts";

// router
const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString(),
  checkValidationErrors,
  authController.login
);

export default router;