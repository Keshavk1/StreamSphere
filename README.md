# StreamSphere – Full Stack Video Streaming Platform

StreamSphere is a full-stack video sharing platform inspired by modern video platforms.  
It enables users to upload, discover, and interact with video content through a scalable REST API and responsive web interface.

The project demonstrates backend architecture, authentication systems, and full-stack application design using the MERN ecosystem.

---

# System Overview

StreamSphere is designed as a client–server architecture:

Frontend → React SPA  
Backend → Node.js + Express REST API  
Database → MongoDB  

Users can create accounts, upload videos, interact with content, and manage their channels.

---

# Key Features

### User System
- Secure user authentication using JWT
- User registration and login
- Channel/profile management

### Video Platform
- Upload and manage videos
- Video playback interface
- Creator channel pages

### Interaction System
- Like / Dislike functionality
- Comment system
- Creator-specific video feeds

### Discovery Features
- Video search
- Category based browsing
- Creator video listing

---

# Tech Stack

### Frontend
- React
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication
- RESTful API architecture

### Database
- MongoDB
- Mongoose ODM

### Tools
- Git
- GitHub
- dotenv
- CORS

---

# Architecture
Client (React)
|
v
REST API (Express Server)
|
v
MongoDB Database


The backend exposes REST endpoints for videos, comments, and authentication while enforcing access control via JWT middleware.

---

# Core Backend Modules

### Authentication Service
- JWT token generation
- Protected API routes
- User identity verification

### Video Service
- Video metadata storage
- Category filtering
- Creator-specific queries

### Comment Service
- Comment creation
- Comment updates
- Like interactions

---

# API Overview

### Authentication

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me


### Videos

GET /api/videos
GET /api/videos/:id
POST /api/videos
DELETE /api/videos/:id
GET /api/videos/search/:query


### Comments

GET /api/comments/:videoId
POST /api/comments
PUT /api/comments/:commentId
DELETE /api/comments/:commentId


---

# Installation

### 1 Clone repository


git clone <repo-url>
cd streamsphere


### 2 Install dependencies

Backend


cd backend
npm install


Frontend


cd frontend
npm install


---

### 3 Configure Environment

Create `.env` in backend:


MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173

PORT=5000


---

### 4 Run Application

Backend


npm run dev


Frontend


npm run dev


Application will be available at:


http://localhost:5173


---

# Learning Outcomes

This project demonstrates:

- Full-stack application architecture
- JWT authentication and protected routes
- REST API design
- MongoDB schema modeling
- State management in React
- Scalable backend structure

---

# Future Improvements

- Video file storage (AWS S3 / Cloudinary)
- Recommendation system
- Video streaming optimization
- Real-time notifications
- CDN based video delivery

---

# Author

Keshav Meena  
B.Tech Information Technology  
National Institute of Technology Kurukshetra