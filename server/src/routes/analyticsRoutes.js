import express from 'express';
import * as analyticsController from '../services/analytics.service.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/video-stats', authMiddleware, analyticsController.getVideoAnalytics);
router.get('/platform-stats', analyticsController.getPlatformStats);
router.get('/trending', analyticsController.getTrendingVideos);

export default router;
