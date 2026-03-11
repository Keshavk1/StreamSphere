require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Initialize app
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error', error: error.message });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API Endpoints:`);
  console.log(`   GET    /api/health                 - Health check`);
  console.log(`   POST   /api/auth/register          - Register`);
  console.log(`   POST   /api/auth/login             - Login`);
  console.log(`   GET    /api/videos                 - Get all videos`);
  console.log(`   POST   /api/videos                 - Upload video`);
  console.log(`   GET    /api/videos/:videoId        - Get video`);
  console.log(`   POST   /api/comments               - Add comment`);
});
