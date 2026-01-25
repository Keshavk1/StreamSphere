import React, { useState, useEffect } from 'react';
import { videoAPI } from '../services/api';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { darkMode } = useAuth();

  const categories = ['All', 'Music', 'Sports', 'Gaming', 'Education', 'News', 'Entertainment'];

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (selectedCategory === 'All') {
        response = await videoAPI.getAllVideos();
      } else {
        response = await videoAPI.getVideosByCategory(selectedCategory);
      }
      // Backend now returns array directly
      setVideos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchVideos();
  };

  return (
    <div className={`home ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <div className="home-container">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleRefresh} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading videos...</p>
          </div>
        )}

        {/* Video Grid */}
        {!loading && videos.length > 0 && (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onLikeChange={handleRefresh}
              />
            ))}
          </div>
        )}

        {/* No Videos Message */}
        {!loading && videos.length === 0 && !error && (
          <div className="no-videos">
            <p>📹 No videos found in this category</p>
            <button onClick={() => setSelectedCategory('All')} className="reset-btn">
              View All Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
