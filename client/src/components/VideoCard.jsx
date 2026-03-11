import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { videoAPI } from '../services/api';
import '../styles/VideoCard.css';

const VideoCard = ({ video, onLikeChange }) => {
  const { user } = useAuth();
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);

  React.useEffect(() => {
    // Check if current user liked or disliked this video
    if (user) {
      setLiked(video.likedBy?.includes(user._id) || false);
      setDisliked(video.dislikedBy?.includes(user._id) || false);
    }
  }, [video, user]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to like videos');
      return;
    }

    try {
      await videoAPI.likeVideo(video._id);
      setLiked(!liked);
      if (disliked) setDisliked(false);
      if (onLikeChange) onLikeChange();
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to dislike videos');
      return;
    }

    try {
      await videoAPI.dislikeVideo(video._id);
      setDisliked(!disliked);
      if (liked) setLiked(false);
      if (onLikeChange) onLikeChange();
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };
  const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return '0:00';

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  // Format: "1:05:03" if hours exist, otherwise "5:03"
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};
  return (
    <Link to={`/watch/${video._id}`} className="video-card">
      {/* Thumbnail */}
      <div className="video-thumbnail">
        <img
  src={video.thumbnailUrl}
  alt={video.title}
  className="thumbnail-img"
  // If the URL is broken, this function runs:
  onError={(e) => {
    e.target.src = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop'; 
    // Or use a local asset: e.target.src = '/images/default-thumbnail.jpg';
  }}
/>
       <span className="video-duration">{formatDuration(video.duration)}</span>
      </div>

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        
        <p className="video-channel">
          {video.creator?.username || 'Unknown Channel'}
        </p>

        <div className="video-stats">
          <span className="views">{video.views || 0} views</span>
          <span className="date">
            {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'Unknown'}
          </span>
        </div>

        <p className="video-description">{video.description?.substring(0, 100)}...</p>

        {/* Like/Dislike Section */}
        <div className="video-engagement" onClick={(e) => e.preventDefault()}>
          <button
            className={`like-btn ${liked ? 'active' : ''}`}
            onClick={handleLike}
            title="Like"
          >
            👍 {video.likedBy?.length || 0}
          </button>
          <button
            className={`dislike-btn ${disliked ? 'active' : ''}`}
            onClick={handleDislike}
            title="Dislike"
          >
            👎 {video.dislikedBy?.length || 0}
          </button>
          <span className="comment-count">
            💬 {video.comments?.length || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
