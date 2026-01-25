import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoAPI } from '../services/api';
import VideoCard from '../components/VideoCard';
import '../styles/Search.css';

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await videoAPI.searchVideos(query);
      
      // Handle response - backend returns array directly
      const searchResults = Array.isArray(response.data) ? response.data : [];
      setVideos(searchResults);
      
      if (searchResults.length === 0) {
        setError(`No videos found for "${query}"`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch search results');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results for "{query}"</h1>
        <p className="result-count">{videos.length} video{videos.length !== 1 ? 's' : ''} found</p>
      </div>

      {loading && <div className="loading">Loading search results...</div>}

      {error && !loading && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && !error && (
        <div className="no-results">
          <p>No videos match your search</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default Search;
