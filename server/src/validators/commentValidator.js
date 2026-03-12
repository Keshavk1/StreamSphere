import { body } from 'express-validator';

export const commentValidator = [
  body('text')
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ max: 500 })
    .withMessage('Comment too long'),
  body('videoId')
    .optional() // only required for adding, not updating
    .isMongoId()
    .withMessage('Invalid video ID')
];
