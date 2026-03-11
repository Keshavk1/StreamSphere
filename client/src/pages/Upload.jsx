import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { videoAPI } from '../services/api';
import '../styles/Upload.css';

const Upload = () => {
  const { user, darkMode } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Education',
    videoUrl: '',
    thumbnailUrl: '',
    duration: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Music', 'Sports', 'Gaming', 'Education', 'News', 'Entertainment', 'Tech', 'Vlog'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('You must be logged in to upload videos');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.videoUrl.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const videoData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        videoUrl: formData.videoUrl,
        thumbnailUrl: formData.thumbnailUrl || 'https://via.placeholder.com/320x180?text=Video+Thumbnail',
        duration: parseInt(formData.duration) || 0,
      };

      await videoAPI.uploadVideo(videoData);
      setSuccess('Video uploaded successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={`upload-page ${darkMode ? 'dark' : 'light'}`}>
        <Navbar />
        <div className="upload-container">
          <div className="auth-required">
            <h2>Login Required</h2>
            <p>You must be logged in to upload videos.</p>
            <button onClick={() => navigate('/login')} className="login-redirect-btn">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`upload-page ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <div className="upload-container">
        <div className="upload-form-wrapper">
          <h1>Upload Video</h1>

          {error && <div className="upload-error">{error}</div>}
          {success && <div className="upload-success">{success}</div>}

          <form onSubmit={handleSubmit} className="upload-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Video Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                maxLength="100"
                disabled={loading}
                required
              />
              <small>{formData.title.length}/100</small>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your video..."
                maxLength="500"
                rows="5"
                disabled={loading}
                required
              />
              <small>{formData.description.length}/500</small>
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Video URL */}
            <div className="form-group">
              <label htmlFor="videoUrl">Video URL *</label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://example.com/video.mp4"
                disabled={loading}
                required
              />
              <small>Enter a valid video file URL</small>
            </div>

            {/* Thumbnail */}
            <div className="form-group">
              <label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</label>
              <input
                type="url"
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://example.com/thumbnail.jpg"
                disabled={loading}
              />
            </div>

            {/* Duration */}
            <div className="form-group">
              <label htmlFor="duration">Duration (Optional)</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 10:30"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="upload-submit-btn" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </form>
        </div>

        <div className="upload-tips">
          <h3>📝 Upload Tips</h3>
          <ul>
            <li>Make sure your video file is in MP4 format</li>
            <li>Maximum file size: 5GB</li>
            <li>Use clear, descriptive titles (50-100 characters)</li>
            <li>Write detailed descriptions to help viewers find your content</li>
            <li>Choose an appropriate category</li>
            <li>Add a custom thumbnail for better engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;
