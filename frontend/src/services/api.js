import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Video API calls
export const videoAPI = {
  // Get all videos
  getAllVideos: () => api.get('/videos'),
  
  // Get video by ID
  getVideoById: (videoId) => api.get(`/videos/${videoId}`),
  
  // Search videos
  searchVideos: (query) => api.get(`/videos/search/${query}`),
  
  // Get videos by category
  getVideosByCategory: (category) => api.get(`/videos/category/${category}`),
  
  // Get creator's videos
  getCreatorVideos: (creatorId) => api.get(`/videos/creator/${creatorId}`),
  
  // Upload video
  uploadVideo: (videoData) => api.post('/videos', videoData),
  
  // Delete video
  deleteVideo: (videoId) => api.delete(`/videos/${videoId}`),
  
  // Like video
  likeVideo: (videoId) => api.post(`/videos/${videoId}/like`),
  
  // Dislike video
  dislikeVideo: (videoId) => api.post(`/videos/${videoId}/dislike`),
};

// Comment API calls
export const commentAPI = {
  // Get comments for a video
  getComments: (videoId) => api.get(`/comments/${videoId}`),
  
  // Add comment
  addComment: (videoId, commentData) => api.post('/comments', {
    ...commentData,
    videoId,
  }),
  
  // Delete comment
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
  
  // Update comment
  updateComment: (commentId, text) => api.put(`/comments/${commentId}`, { text }),
  
  // Like comment
  likeComment: (commentId) => api.post(`/comments/${commentId}/like`),
};

export default api;
