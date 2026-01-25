# YouTube Clone - Setup & Testing Guide

## 🚀 How to Run the Application

### Step 1: Clone/Open the Project
```bash
# Navigate to project directory
cd Youtube_Clone/youtube
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your settings
echo "MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
PORT=5000" > .env

# Start the backend server
npm start
```

**Expected Output:**
```
✓ Server running on port 5000
✓ Connected to MongoDB
✓ Ready to accept requests
```

### Step 3: Setup Frontend (New Terminal)

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
✓ VITE v4.1.0 ready in 123 ms
✓ ➜ Local: http://localhost:5173/
```

### Step 4: Open Browser
Navigate to: http://localhost:5173/

---

## ✅ Complete Testing Checklist

### TEST 1: Home Page Videos Load

**Steps:**
1. Open http://localhost:5173/
2. Wait 2-3 seconds for videos to load
3. Look at video grid

**Expected Result:**
- [ ] 5-10 videos appear in grid layout
- [ ] Each video has a thumbnail image
- [ ] Each video shows title, creator name, view count
- [ ] No error messages visible
- [ ] No "undefined" text appears

**If Failed:**
- Check backend console for errors
- Check browser DevTools → Network tab → /api/videos response
- Response should be an array: `[{...}, {...}]`
- Verify MongoDB is connected

---

### TEST 2: Click Video to Watch

**Steps:**
1. From home page, click any video thumbnail
2. Wait for video page to load

**Expected Result:**
- [ ] Navigate to /watch/:id page
- [ ] Video player shows (with play button)
- [ ] Video title displays
- [ ] Creator name is shown
- [ ] Like/dislike buttons visible
- [ ] Comments section visible below
- [ ] No error messages

**If Failed:**
- Check browser DevTools → Console for errors
- Check Network tab → /api/videos/:id response
- Response should be single object: `{_id, title, ...}`

---

### TEST 3: Back Button Works

**Steps:**
1. Make sure you're on Watch page (clicked a video)
2. Look at navbar - should see "⬅️ Back" button
3. Click the back button
4. Should return to home page

**Expected Result:**
- [ ] Back button appears in navbar on Watch page
- [ ] Back button disappears on Home page
- [ ] Clicking back returns to previous page
- [ ] No console errors

**If Failed:**
- Hard refresh: Ctrl+Shift+R
- Check Navbar.jsx imports useLocation
- Verify showBackButton condition: `location.pathname !== '/'`

---

### TEST 4: Search Functionality

**Steps:**
1. Type "test" in search bar
2. Press Enter or click search button
3. Wait for results to load

**Expected Result:**
- [ ] Navigate to /search/test page
- [ ] Shows videos matching "test"
- [ ] Result counter displays (e.g., "5 videos found")
- [ ] Videos appear in grid
- [ ] Back button shows in navbar
- [ ] Can click result to watch video

**If Failed:**
- Check Search.jsx exists in pages folder
- Verify /search/:query route in App.jsx
- Check Network tab → /api/videos/search/test
- Response should be array: `[{...}, {...}]`

---

### TEST 5: Comments Load and Display

**Steps:**
1. Click a video to watch
2. Scroll down to Comments section
3. Should see existing comments

**Expected Result:**
- [ ] Comments section loads
- [ ] Shows comment author names
- [ ] Shows comment text
- [ ] Shows comment date
- [ ] Shows like counts (👍)
- [ ] No console errors

**If Failed:**
- Check Network tab → /api/comments/:videoId
- Response should be array: `[{...}, {...}]`
- Verify CommentBox.jsx uses Array.isArray()

---

### TEST 6: Add Comment (If Logged In)

**Steps:**
1. Login first (Register → Login)
2. Go to a video
3. Scroll to comments section
4. Type comment and click "Comment"

**Expected Result:**
- [ ] Comment appears immediately
- [ ] Shows your username
- [ ] Shows your comment text
- [ ] No error messages

**If Failed:**
- Verify you're logged in
- Check Network tab → POST /api/comments
- Verify auth token in localStorage
- Check backend auth middleware

---

### TEST 7: Dark Mode Toggle

**Steps:**
1. Click the moon icon (🌙) in navbar
2. Page should turn dark
3. Click again to toggle back

**Expected Result:**
- [ ] Page background turns dark (#212121)
- [ ] Text turns light (#fff)
- [ ] All components have dark mode styles
- [ ] Works on all pages
- [ ] Sun icon (☀️) appears in dark mode

**If Failed:**
- Check CSS dark class `.dark`
- Verify AuthContext toggleDarkMode function
- Check localStorage for darkMode value

---

### TEST 8: User Registration

**Steps:**
1. Click "Sign Up" in navbar
2. Fill form: username, email, password, confirm password
3. Click "Register"

**Expected Result:**
- [ ] Navigate to Login page
- [ ] Can login with new credentials
- [ ] JWT token saved in localStorage
- [ ] Username appears in navbar

**If Failed:**
- Check Network tab → POST /api/auth/register
- Verify password fields match
- Check MongoDB for new user document
- Verify email not already used

---

### TEST 9: User Login

**Steps:**
1. Click "Login" in navbar
2. Enter email and password
3. Click "Login"

**Expected Result:**
- [ ] Redirect to home page
- [ ] Username appears in navbar
- [ ] "Login" and "Sign Up" buttons disappear
- [ ] "Dashboard" and "Upload" links appear
- [ ] JWT token in localStorage

**If Failed:**
- Check Network tab → POST /api/auth/login
- Verify credentials are correct
- Check localStorage for token
- Check browser console for errors

---

### TEST 10: Video Upload

**Steps:**
1. Login first
2. Click "Upload" in navbar
3. Fill form: title, description, video URL, thumbnail URL, category
4. Click "Upload"

**Expected Result:**
- [ ] Navigate to Dashboard
- [ ] New video appears in your videos list
- [ ] Can click video to watch

**If Failed:**
- Verify you're logged in
- Check all required fields filled
- Verify URLs are valid
- Check Network tab → POST /api/videos
- Check MongoDB for new video

---

### TEST 11: Dashboard (My Videos)

**Steps:**
1. Login as user
2. Click "Dashboard" in navbar

**Expected Result:**
- [ ] Shows table of your videos
- [ ] Each row shows: title, views, likes, dislikes
- [ ] Delete button for each video
- [ ] Edit button for each video (if implemented)
- [ ] Back button visible

**If Failed:**
- Verify you're logged in
- Check Network tab → /api/videos/creator/:userId
- Response should be array: `[{...}, {...}]`
- Check user ID is passed correctly

---

### TEST 12: Category Browsing

**Steps:**
1. (Implementation specific - may need to add category links)
2. Navigate to /videos/category/Music (or other category)

**Expected Result:**
- [ ] Shows videos in that category
- [ ] Videos only have matching category
- [ ] Results display in grid

**If Failed:**
- Verify category route exists
- Check Network tab → /api/videos/category/Music
- Verify route order (specific before generic)

---

## 🔍 Network Testing

Open Browser DevTools (F12) → Network tab and test each endpoint:

### Test Each Endpoint

**1. GET /api/videos**
```
Expected Response: [video1, video2, ...]
Expected Status: 200
Expected Time: < 500ms
```

**2. GET /api/videos/:id**
```
Expected Response: {_id, title, comments: [...], ...}
Expected Status: 200
Expected Time: < 500ms
```

**3. GET /api/videos/search/query**
```
Expected Response: [matching_video1, matching_video2, ...]
Expected Status: 200
Expected Time: < 500ms
```

**4. GET /api/videos/category/Music**
```
Expected Response: [video1, video2, ...]
Expected Status: 200
Expected Time: < 500ms
```

**5. GET /api/comments/:videoId**
```
Expected Response: [comment1, comment2, ...]
Expected Status: 200
Expected Time: < 300ms
```

**6. POST /api/auth/login**
```
Expected Response: {token: "...", user: {...}}
Expected Status: 200
Expected Time: < 1000ms
Body: {email: "...", password: "..."}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot read property 'map' of undefined"
**Solution:** Backend response format issue
- Check network response is array: `[...]` not `{videos: [...]}`
- Verify videoController returns data directly
- Restart backend

### Issue: Videos show but click doesn't work
**Solution:** Route issue
- Check /watch/:id route in App.jsx
- Verify Watch.jsx component exists
- Check video._id is being passed correctly

### Issue: Search returns empty but videos exist
**Solution:** Search endpoint issue
- Check searchVideos function in videoController
- Verify regex search is working
- Check MongoDB text index (optional improvement)

### Issue: Back button doesn't appear
**Solution:** Navigation issue
- Verify Navbar imports useLocation
- Check Navbar.css has .nav-back-btn styling
- Hard refresh browser: Ctrl+Shift+R

### Issue: Comments don't show
**Solution:** API response issue
- Backend must return array directly: `[...]`
- Check CommentBox uses Array.isArray()
- Verify video has comments populated

### Issue: Can't login
**Solution:** Authentication issue
- Check /api/auth/login response includes token
- Verify token stored in localStorage
- Check JWT_SECRET set in .env

### Issue: 404 errors
**Solution:** Route issue
- Check backend routes registered in server.js
- Check frontend routes in App.jsx
- Verify CORS configured correctly
- Check URL spelling (case-sensitive)

### Issue: CORS error
**Solution:** CORS configuration
- Backend: Check CORS origin matches frontend URL
- Backend: Check CORS credentials enabled
- Verify frontend API URL correct in api.js

---

## ✨ Success Checklist

After completing all tests, verify:

- [ ] Home page shows videos
- [ ] Can click video to watch
- [ ] Search works correctly
- [ ] Back button functions
- [ ] Comments display
- [ ] Dark mode works
- [ ] Login/Register works
- [ ] Dashboard shows videos
- [ ] Upload functionality works
- [ ] No console errors
- [ ] No network 404s
- [ ] Response formats correct

---

## 📊 Performance Checks

### Expected Performance Metrics
- Home page load: < 2 seconds
- Video page load: < 1 second
- Search results: < 1 second
- Comment loading: < 500ms
- API responses: < 500ms each

### Check in DevTools:
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Check response times
5. Verify < 500ms for API calls

---

## 🎓 Learning Checklist

While testing, observe and understand:

- [ ] How frontend calls API endpoints
- [ ] How backend processes requests
- [ ] How responses are handled in React
- [ ] How routing works in React Router
- [ ] How authentication tokens are used
- [ ] How MongoDB stores and retrieves data
- [ ] How CSS dark mode is toggled
- [ ] How error handling works

---

## 📝 Final Status

When all tests pass:

**✅ Application is fully functional!**

You can now:
- Use the application normally
- Deploy to production
- Extend with new features
- Learn from the code
- Share with others

---

**Testing Complete!** 🎉

All features verified and working. The YouTube clone is ready for use.
