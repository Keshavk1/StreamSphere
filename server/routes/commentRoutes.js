const express = require('express');
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/:videoId', commentController.getComments);
router.post('/', authMiddleware, commentController.addComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);
router.put('/:commentId', authMiddleware, commentController.updateComment);
router.post('/:commentId/like', authMiddleware, commentController.likeComment);

module.exports = router;
