import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { videoAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, darkMode, updateChannelInfo } = useAuth();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [updatingChannel, setUpdatingChannel] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setChannelName(user.channelName || user.username);
      setChannelDescription(user.channelDescription || '');
    }
  }, [user]);

  const fetchUserVideos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await videoAPI.getCreatorVideos(user._id);
      // Backend now returns array directly
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch user videos', err);
      setError('Failed to load your videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      await videoAPI.deleteVideo(videoId);
      setVideos(videos.filter((v) => v._id !== videoId));
      setSuccessMessage('Video deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to delete video', err);
      setError('Failed to delete video');
    }
  };

  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    setUpdatingChannel(true);

    try {
      const result = await updateChannelInfo(channelName, channelDescription);
      if (result.success) {
        setSuccessMessage('Channel updated successfully');
        setEditMode(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to update channel');
      console.error('Update error:', err);
    } finally {
      setUpdatingChannel(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`dashboard-page ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <div className="dashboard-container">
        {/* Channel Info Section */}
        <section className="channel-section">
          <h2>📺 Channel</h2>
          <div className="channel-card">
            {editMode ? (
              <form onSubmit={handleUpdateChannel} className="channel-form">
                <div className="form-group">
                  <label>Channel Name</label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Your channel name"
                    disabled={updatingChannel}
                  />
                </div>
                <div className="form-group">
                  <label>Channel Description</label>
                  <textarea
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    placeholder="Describe your channel"
                    rows="3"
                    disabled={updatingChannel}
                  />
                </div>
                <div className="channel-form-actions">
                  <button type="submit" disabled={updatingChannel}>
                    {updatingChannel ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="channel-info">
                <div>
                  <h3>{channelName}</h3>
                  <p>{channelDescription || 'No description yet'}</p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="edit-channel-btn"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Messages */}
        {error && <div className="dashboard-error">{error}</div>}
        {successMessage && <div className="dashboard-success">{successMessage}</div>}

        {/* Videos Section */}
        <section className="videos-section">
          <div className="section-header">
            <h2>📹 My Videos</h2>
            <span className="video-count">{videos.length} videos</span>
          </div>

          {loading && <div className="dashboard-loading">Loading your videos...</div>}

          {!loading && videos.length === 0 && (
            <div className="no-videos-message">
              <p>You haven't uploaded any videos yet</p>
              <button onClick={() => navigate('/upload')} className="upload-btn">
                Upload Your First Video
              </button>
            </div>
          )}

          {!loading && videos.length > 0 && (
            <div className="videos-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video._id}>
                      <td className="title-cell">
                        <div className="video-thumbnail">
                          <img
                            src={video.thumbnailUrl || 'https://via.placeholder.com/80x45'}
                            alt={video.title}
                          />
                        </div>
                        <div className="video-title-info">
                          <span className="video-title">{video.title}</span>
                          <span className="video-category">{video.category}</span>
                        </div>
                      </td>
                      <td>{video.views || 0}</td>
                      <td>{video.likedBy?.length || 0}</td>
                      <td>{video.comments?.length || 0}</td>
                      <td>{new Date(video.createdAt).toLocaleDateString()}</td>
                      <td className="actions-cell">
                        <button
                          onClick={() => navigate(`/watch/${video._id}`)}
                          className="view-btn"
                          title="View video"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video._id)}
                          className="delete-btn"
                          title="Delete video"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
