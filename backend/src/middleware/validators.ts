import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const checkValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateLlmInput = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ max: 255 })
    .withMessage('Le nom ne peut pas dépasser 255 caractères'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Le slug est requis')
    .isLength({ max: 255 })
    .withMessage('Le slug ne peut pas dépasser 255 caractères')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets'),
  checkValidationErrors
];
