# Portfolio Platform - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on: http://localhost:5000

### Step 2: Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLIENT_URL=http://localhost:5173
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will run on: http://localhost:5173

## 📝 Initial Setup

### First Time Admin Setup

1. Visit: http://localhost:5173
2. Click "Initial Setup" button (only visible if no admin exists)
3. Create your admin account with:
   - Name
   - Email
   - Password (minimum 6 characters)
4. You'll be automatically logged in and redirected to the dashboard

### Dashboard Access

After admin setup:
1. Click "Admin Login" 
2. Enter your credentials
3. Access the Dashboard to manage:
   - Resume uploads
   - Skills
   - Projects
   - Profile information

## ✅ Testing the Features

### 1. Test Resume Upload
1. Login to admin dashboard
2. Go to "Resume Management" section
3. Select a PDF file (max 5MB)
4. Click "Upload"
5. Visit the home page - you should see "Download Resume" button

### 2. Test Skill Management
1. In dashboard, go to "Skills Management"
2. Click "+ Add Skill"
3. Enter a skill name (e.g., "React.js")
4. Click "Add Skill"
5. To delete: Click the "×" button on any skill tag
6. Visit the About page to see skills displayed

### 3. Test Project Management
1. In dashboard, go to "Projects Management"
2. Click "+ Add Project"
3. Fill in project details:
   - Title (required)
   - Description (required)
   - Technologies (comma-separated)
   - GitHub Link
   - Live Link
   - Image (emoji or URL)
4. Click "Create Project"
5. Visit Projects page to see all projects
6. Test Edit and Delete functionality

### 4. Test Admin Login/Logout
1. Click "Logout" to logout
2. Click "Admin Login"
3. Enter credentials
4. Verify successful login and dashboard access

## 🔧 API Endpoints

### Authentication
- POST `/api/auth/signup` - Create admin account
- POST `/api/auth/login` - Admin login
- POST `/api/auth/refresh` - Refresh access token
- POST `/api/auth/logout` - Logout
- GET `/api/auth/profile` - Get admin profile
- GET `/api/auth/check-admin` - Check if admin exists

### Projects
- POST `/api/projects` - Create project (Admin)
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get single project
- PUT `/api/projects/:id` - Update project (Admin)
- DELETE `/api/projects/:id` - Delete project (Admin)

### About/Skills
- GET `/api/about` - Get about information
- PUT `/api/about` - Update about information (Admin)
- POST `/api/about/skills` - Add skill (Admin)
- DELETE `/api/about/skills` - Delete skill (Admin)
- PUT `/api/about/resume` - Upload resume (Admin)
- GET `/api/about/resume` - Get resume info
- GET `/api/about/resume/download` - Download resume

## 🛠️ Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
Solution: Check MONGODB_URI in .env file
Make sure MongoDB is running (local) or connection string is correct (Atlas)
```

**Port Already in Use:**
```
Solution: Change PORT in .env or kill the process using port 5000
```

**JWT Errors:**
```
Solution: Verify JWT_SECRET and JWT_REFRESH_SECRET are set in .env
```

### Frontend Issues

**API Connection Error:**
```
Solution: Ensure VITE_API_BASE_URL in .env points to correct backend URL
Verify backend is running
```

**Login Not Working:**
```
Solution: Check browser console for errors
Clear localStorage and try again
Verify backend is running and database is connected
```

**Resume Upload Failing:**
```
Solution: Ensure file is PDF and under 5MB
Check backend uploads directory exists
Verify admin is logged in
```

## 📱 Production Deployment

### Backend (Example: Render, Railway, Heroku)
1. Set environment variables in hosting platform
2. Use MongoDB Atlas for production database
3. Update CLIENT_URL to frontend production URL

### Frontend (Example: Vercel, Netlify)
1. Set VITE_API_BASE_URL to backend production URL
2. Build: `npm run build`
3. Deploy the `dist` folder

## ⚠️ Important Notes

1. **Security**: Change JWT secrets in production
2. **CORS**: Update CLIENT_URL in backend for production frontend URL
3. **File Storage**: For production, consider using cloud storage (S3, Cloudinary) instead of local uploads
4. **Database**: Use MongoDB Atlas for production
5. **Admin Account**: Only ONE admin account can exist

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Review the FIXES_COMPLETED.md file
3. Check browser console and terminal for error messages
4. Verify all environment variables are set correctly

---

**🎉 Enjoy your fully functional portfolio platform!**
