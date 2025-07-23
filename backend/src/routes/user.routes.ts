import express from 'express';
import { body, param } from 'express-validator';

import UserController from '../controllers/user.controller.js';
import { checkValidationErrors } from '../middleware/validators.js';

const router = express.Router();

// Create a new user
router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  checkValidationErrors,
  UserController.createUser
);

// Get all users
router.get('/', UserController.getAllUsers);

// Get a user by ID
router.get(
  '/:id',
  [param('id').isNumeric().withMessage('ID must be a number')],
  checkValidationErrors,
  UserController.getUserById
);

// Update a user
router.put(
  '/:id',
  [
    param('id').isNumeric().withMessage('ID must be a number'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  checkValidationErrors,
  UserController.updateUser
);

// Delete a user
router.delete(
  '/:id',
  [param('id').isNumeric().withMessage('ID must be a number')],
  checkValidationErrors,
  UserController.deleteUser
);

export default router;
