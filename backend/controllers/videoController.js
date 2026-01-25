const Video = require('../models/Video');

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('creator', 'username channelName profilePicture')
      .sort({ createdAt: -1 });

    // Return videos directly as array (simpler for frontend)
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get single video
exports.getVideoById = async (req, res) => {
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

// Upload video
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, duration, category } = req.body;

    if (!title || !videoUrl || !thumbnailUrl) {
      return res.status(400).json({ message: 'Title, videoUrl, thumbnailUrl required' });
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
exports.deleteVideo = async (req, res) => {
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
exports.likeVideo = async (req, res) => {
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
exports.dislikeVideo = async (req, res) => {
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
exports.getVideosByCategory = async (req, res) => {
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

// Search videos
exports.searchVideos = async (req, res) => {
  try {
    const { query } = req.params;

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
      .populate('creator', 'username channelName profilePicture')
      .sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error searching', error: error.message });
  }
};

// Get creator videos
exports.getCreatorVideos = async (req, res) => {
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
