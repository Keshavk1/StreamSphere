import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:videoId', commentController.getComments);
router.post('/', authMiddleware, commentController.addComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);
router.put('/:commentId', authMiddleware, commentController.updateComment);
router.post('/:commentId/like', authMiddleware, commentController.likeComment);

export default router;
