import { body } from 'express-validator';

export const videoUploadValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title too long'),
  body('category')
    .optional()
    .isIn(['Music', 'Gaming', 'Education', 'Entertainment', 'Sports', 'Tech', 'News', 'Other'])
    .withMessage('Invalid category')
];
