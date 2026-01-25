# 🚀 YouTube Clone - Complete Setup Guide

## 📁 Project Created!

Your YouTube clone application has been created with a clean folder structure:

```
youtube/
├── backend/           ✅ Complete backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── frontend/          ✅ Core frontend files
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .gitignore
```

---

## ⚙️ INSTALLATION STEPS

### **Step 1: Install Backend Dependencies**

Option A: Run the batch file
```bash
install-backend.bat
```

Or manually:
```bash
cd youtube/backend
npm install
```

### **Step 2: Install Frontend Dependencies**

```bash
cd youtube/frontend
npm install
```

---

## 🚀 RUNNING THE APPLICATION

### **Prerequisites**
- Make sure MongoDB is running on your system (localhost:27017)
- Or use MongoDB Compass if installed

### **Terminal 1: Start Backend**
```bash
cd youtube/backend
npm run dev
```
✅ You should see: `✅ Server running on http://localhost:5000`

### **Terminal 2: Start Frontend**
```bash
cd youtube/frontend
npm run dev
```
✅ You should see: `VITE v... ready in ... ms`

### **Open Browser**
Go to: http://localhost:5173

---

## 📝 Next Steps

The backend is fully functional. The frontend needs:

1. **Create components** (Navbar, VideoCard, CommentBox)
2. **Create pages** (Home, Login, Register, Upload, Watch, Dashboard)
3. **Create context** (AuthContext for state management)
4. **Create services** (API service with Axios)
5. **Add CSS styling**

Would you like me to continue with the frontend components and pages?

---

## 🔧 Troubleshooting

### MongoDB not running?
```bash
# Windows: Start MongoDB service
# Or use MongoDB Compass GUI
```

### Port 5000 already in use?
- Change PORT in backend/.env to 5001

### Port 5173 already in use?
- Vite will automatically use the next available port

---

## 📊 What's Included

### **Backend Features**
- ✅ User authentication (register, login)
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Video CRUD operations
- ✅ Comments system
- ✅ Like/Dislike functionality
- ✅ Category filtering
- ✅ Search functionality
- ✅ MongoDB connection
- ✅ Error handling

### **API Endpoints**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/videos` - Get all videos
- `POST /api/videos` - Upload video
- `GET /api/videos/:videoId` - Get video details
- `POST /api/comments` - Add comment
- `GET /api/comments/:videoId` - Get comments

---

**Backend is ready! Ready to build the frontend?** 🎉
