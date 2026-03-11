import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoCard from '../components/VideoCard';
import { videoAPI } from '../services/api';
import CommentBox from '../components/CommentBox';
import '../styles/Watch.css';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideo();
    fetchRecommended();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await videoAPI.getVideoById(id);
      // Backend returns video directly
      setVideo(res.data);
    } catch (err) {
      console.error('Failed to fetch video', err);
      setError('Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommended = async () => {
    try {
      const res = await videoAPI.getAllVideos();
      // Backend now returns array directly
      const videos = Array.isArray(res.data) ? res.data : [];
      const list = videos.filter((v) => v._id !== id).slice(0, 6);
      setRecommended(list);
    } catch (err) {
      console.error('Failed to fetch recommended videos', err);
    }
  };

  const handleEngagementChange = () => {
    // refresh video stats (likes/dislikes/views)
    fetchVideo();
  };

  return (
    <div className="watch-page">
      <Navbar />

      <div className="watch-container">
        <main className="watch-main">
          {loading && <div className="watch-loading">Loading video...</div>}
          {error && <div className="watch-error">{error}</div>}

          {video && (
            <div className="video-section">
              <div className="player-wrapper">
                {/* Use HTML5 video player; backend should provide `video.url` */}
                <video
                  key={video._id}
                  src={video.videoUrl || video.url || ''}
                  controls
                  className="video-player"
                />
              </div>

              <div className="video-meta">
                <h1 className="video-title">{video.title}</h1>
                <div className="video-channel-row">
                  <div className="channel-info">
                    <span className="channel-name">{video.creator?.username || 'Unknown'}</span>
                    <span className="video-views">{video.views || 0} views</span>
                  </div>
                  <div className="engagement-actions">
                    <button className="engage-btn" onClick={handleEngagementChange}>👍 {video.likedBy?.length || 0}</button>
                    <button className="engage-btn" onClick={handleEngagementChange}>👎 {video.dislikedBy?.length || 0}</button>
                  </div>
                </div>

                <p className="video-description">{video.description}</p>

                <CommentBox videoId={video._id} onCommentAdded={() => {}} />
              </div>
            </div>
          )}
        </main>

        <aside className="watch-sidebar">
          <h3>Up next</h3>
          <div className="recommended-list">
            {recommended.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Watch;
