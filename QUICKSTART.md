# 🚀 QUICK START GUIDE

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MongoDB running (local or Atlas)
- [ ] Git installed

---

## 🎯 1-Minute Setup

### Step 1: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure Backend Environment
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Step 3: Seed Contact Data
```bash
cd backend
npm run seed:about
```

### Step 4: Create Admin Account
Use Postman/Thunder Client:
```
POST http://localhost:5000/api/auth/signup

{
  "name": "Admin",
  "email": "admin@portfolio.com",
  "password": "Admin@123",
  "role": "admin"
}
```

### Step 5: Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 6: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🔐 Default Credentials
After signup, use your created credentials:
- Email: admin@portfolio.com
- Password: Admin@123

---

## ✅ Verify Everything Works

### Public Pages (No Login)
1. Go to http://localhost:5173
2. Click "View Projects" → Should navigate to `/projects`
3. Click "Contact Me" → Should show contact info
4. Visit About page → Should display skills

### Admin Dashboard (Login Required)
1. Click Login
2. Enter admin credentials
3. Go to Dashboard
4. Try:
   - Add a skill
   - Delete a skill
   - Create a project
   - Upload resume

---

## 📁 Project URLs
- **Home**: http://localhost:5173/
- **Projects**: http://localhost:5173/projects
- **About**: http://localhost:5173/about
- **Contact**: http://localhost:5173/contact
- **Login**: http://localhost:5173/login
- **Dashboard**: http://localhost:5173/dashboard (admin only)

---

## 🆘 Quick Troubleshooting

### Backend not starting?
- Check MongoDB is running: `mongosh` or check MongoDB Compass
- Verify `.env` file exists in backend folder
- Check port 5000 is not in use

### Frontend not loading?
- Check backend is running first
- Verify VITE_API_URL in frontend `.env`
- Clear browser cache

### Can't login?
- Check you created admin account via API
- Verify MongoDB has user collection
- Check console for errors

### Skills/Contact not showing?
- Run: `npm run seed:about` in backend folder
- Check MongoDB `abouts` collection has data

---

## 🎨 Next Steps

### Add Your Information
1. Login as admin
2. Update About section with your info
3. Add your actual LinkedIn/GitHub links
4. Upload your resume
5. Create your projects

### Customize Design
- Edit Tailwind classes in components
- Change color scheme in `tailwind.config.js`
- Add your own images in `frontend/src/assets`

### Deploy
- Backend: Railway, Render, Heroku
- Frontend: Vercel, Netlify
- Database: MongoDB Atlas

---

## 📞 Need Help?

Check the main README.md for:
- Detailed setup instructions
- Full feature documentation
- Security guidelines
- Deployment guide

---

**That's it! You're ready to go! 🎉**

Your portfolio platform is fully functional with:
✅ Dynamic projects
✅ Skills management
✅ Contact information
✅ Admin dashboard
✅ Secure authentication

Start customizing and make it yours! 💪
