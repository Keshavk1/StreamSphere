import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      enum: ['Music', 'Gaming', 'Education', 'Entertainment', 'Sports', 'Tech', 'News', 'Other'],
      default: 'Other'
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  { timestamps: true }
);

// Indexes for performance
videoSchema.index({ category: 1 });
videoSchema.index({ creator: 1 });
videoSchema.index({ createdAt: -1 });

// Text index for search
videoSchema.index({ title: 'text', description: 'text' });

const Video = mongoose.model('Video', videoSchema);
export default Video;
