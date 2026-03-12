import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { commentValidator } from '../validators/commentValidator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.get('/:videoId', commentController.getComments);
router.post('/', authMiddleware, commentValidator, validate, commentController.addComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);
router.put('/:commentId', authMiddleware, commentValidator, validate, commentController.updateComment);
router.post('/:commentId/like', authMiddleware, commentController.likeComment);

export default router;
