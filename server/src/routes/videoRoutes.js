import express from 'express';
import * as videoController from '../controllers/videoController.js';
import { authMiddleware, optionalAuth } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { videoUploadValidator } from '../validators/videoValidator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Important: Specific routes MUST come before :videoId route
router.get('/category/:category', videoController.getVideosByCategory);
router.get('/search/:query', videoController.searchVideos);
router.get('/creator/:creatorId', videoController.getCreatorVideos);

// General routes (/:videoId should be LAST)
router.get('/', optionalAuth, videoController.getAllVideos);
router.get('/:videoId', optionalAuth, videoController.getVideoById);

router.post(
  '/', 
  authMiddleware, 
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), 
  videoUploadValidator,
  validate,
  videoController.uploadVideo
);
router.delete('/:videoId', authMiddleware, videoController.deleteVideo);
router.post('/:videoId/like', authMiddleware, videoController.likeVideo);
router.post('/:videoId/dislike', authMiddleware, videoController.dislikeVideo);

export default router;
