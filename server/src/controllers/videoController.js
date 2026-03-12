import Video from '../models/Video.js';
import APIFeatures from '../utils/apiFeatures.js';
import { getCursorPagination } from '../utils/pagination.js';

// Get all videos with cursor pagination
export const getAllVideos = async (req, res) => {
  try {
    const { cursor, limit, category } = req.query;
    const filter = category ? { category } : {};
    
    const pagination = await getCursorPagination(Video, {
      filter,
      cursor,
      limit: parseInt(limit) || 12,
      sortField: 'createdAt',
      sortOrder: -1
    });

    // Populate creator for the results
    const results = await Video.populate(pagination.results, {
      path: 'creator',
      select: 'username channelName profilePicture'
    });

    res.status(200).json({
      status: 'success',
      ...pagination,
      results
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get single video
export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
      .populate('creator', 'username channelName profilePicture subscribers')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profilePicture' }
      });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

// Upload video (Modified for Cloudinary & Multer)
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, duration, category } = req.body;
    
    // Check for uploaded files
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: 'Video and thumbnail files are required' });
    }

    const videoUrl = req.files.video[0].path;
    const thumbnailUrl = req.files.thumbnail[0].path;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration: duration || 0,
      category: category || 'Other',
      creator: req.userId
    });

    await newVideo.save();
    await newVideo.populate('creator', 'username channelName profilePicture');

    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Cannot delete other users videos' });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

// Like video
export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.likedBy.includes(req.userId)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    if (video.dislikedBy.includes(req.userId)) {
      video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== req.userId);
      video.dislikes -= 1;
    }

    video.likedBy.push(req.userId);
    video.likes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error liking video', error: error.message });
  }
};

// Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.dislikedBy.includes(req.userId)) {
      return res.status(400).json({ message: 'Already disliked' });
    }

    if (video.likedBy.includes(req.userId)) {
      video.likedBy = video.likedBy.filter(id => id.toString() !== req.userId);
      video.likes -= 1;
    }

    video.dislikedBy.push(req.userId);
    video.dislikes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error disliking video', error: error.message });
  }
};

// Get videos by category
export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const videos = await Video.find({ category })
      .populate('creator', 'username channelName profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Search videos (Leveraging text index)
export const searchVideos = async (req, res) => {
  try {
    const { query } = req.params;
    const { cursor, limit } = req.query;

    const pagination = await getCursorPagination(Video, {
      filter: { $text: { $search: query } },
      cursor,
      limit: parseInt(limit) || 12,
      sortField: 'createdAt',
      sortOrder: -1
    });

    const results = await Video.populate(pagination.results, {
      path: 'creator',
      select: 'username channelName profilePicture'
    });

    res.status(200).json({
      status: 'success',
      ...pagination,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching', error: error.message });
  }
};

// Get creator videos
export const getCreatorVideos = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const videos = await Video.find({ creator: creatorId })
      .populate('creator', 'username channelName profilePicture subscribers')
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};
