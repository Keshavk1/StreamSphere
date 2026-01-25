const express = require('express');
const videoController = require('../controllers/videoController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Important: Specific routes MUST come before :videoId route
// Otherwise :videoId will match /category, /search, /creator
router.get('/category/:category', videoController.getVideosByCategory);
router.get('/search/:query', videoController.searchVideos);
router.get('/creator/:creatorId', videoController.getCreatorVideos);

// General routes (/:videoId should be LAST)
router.get('/', optionalAuth, videoController.getAllVideos);
router.get('/:videoId', optionalAuth, videoController.getVideoById);

router.post('/', authMiddleware, videoController.uploadVideo);
router.delete('/:videoId', authMiddleware, videoController.deleteVideo);
router.post('/:videoId/like', authMiddleware, videoController.likeVideo);
router.post('/:videoId/dislike', authMiddleware, videoController.dislikeVideo);

module.exports = router;
