import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';

dotenv.config();

// Connect MongoDB
connectDB();

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
