import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { getCursorPagination } from '../utils/pagination.js';

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({ message: 'Text and videoId required' });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const newComment = new Comment({
      text,
      author: req.userId,
      video: videoId
    });

    await newComment.save();

    video.comments.push(newComment._id);
    await video.save();

    await newComment.populate('author', 'username profilePicture');

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

// Get comments for video (with cursor pagination)
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { cursor, limit } = req.query;

    const pagination = await getCursorPagination(Comment, {
      filter: { video: videoId },
      cursor,
      limit: parseInt(limit) || 20,
      sortField: 'createdAt',
      sortOrder: -1
    });

    // Populate author for the results
    const results = await Comment.populate(pagination.results, {
      path: 'author',
      select: 'username profilePicture'
    });

    res.status(200).json({
      status: 'success',
      ...pagination,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Cannot delete other users comments' });
    }

    await Video.findByIdAndUpdate(comment.video, {
      $pull: { comments: commentId }
    });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};

// Like comment
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.likedBy.includes(req.userId)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    comment.likedBy.push(req.userId);
    comment.likes += 1;

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error: error.message });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text required' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Cannot edit other users comments' });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};
