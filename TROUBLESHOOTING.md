# 🔧 TROUBLESHOOTING GUIDE

Common issues and their solutions for the MERN Portfolio Platform.

---

## 🚨 CRITICAL ISSUES

### Issue: "View Projects" Button Not Working

**Symptom**: Clicking "View Projects" doesn't navigate to projects page

**Solution**: ✅ **ALREADY FIXED!**
- Changed from `<a href="#projects">` to `<Link to="/projects">`
- If still not working:
  1. Clear browser cache
  2. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
  3. Check browser console for errors
  4. Verify React Router is installed: `npm list react-router-dom`

**Verification**:
```bash
# Check Home.jsx has the fix
grep -n "Link to=\"/projects\"" frontend/src/pages/Home.jsx
```

---

## 🗄️ DATABASE ISSUES

### Issue: MongoDB Connection Failed

**Symptoms**:
```
MongooseError: Connection failed
Could not connect to any servers
```

**Solutions**:

1. **Check MongoDB is running**:
```bash
# For local MongoDB
mongosh

# For MongoDB Compass
# Open MongoDB Compass and try to connect
```

2. **Verify connection string**:
```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

3. **Check firewall/network**:
- Ensure port 27017 is not blocked
- Check MongoDB Atlas IP whitelist (if using Atlas)
- Try: `telnet localhost 27017`

### Issue: Contact Information Not Showing

**Symptom**: Contact page shows default/placeholder data

**Solution**:
```bash
# Run seed script
cd backend
npm run seed:about

# Or manually insert via MongoDB
mongosh
use portfolio
db.abouts.insertOne({
  email: "rjayprakash303@gmail.com",
  phone: "9389203228",
  location: "Jaipur, India",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername"
})
```

**Verification**:
```bash
# Check data exists
mongosh
use portfolio
db.abouts.findOne()
```

### Issue: Skills Not Displaying

**Symptom**: About page shows hardcoded skills or no skills

**Solutions**:

1. **Run seed script**:
```bash
cd backend
npm run seed:about
```

2. **Add skills via Dashboard**:
- Login as admin
- Go to Dashboard
- Click "Add Skill"
- Enter skill name
- Save

3. **Check database**:
```bash
mongosh
use portfolio
db.abouts.findOne().skills
```

### Issue: Projects Not Loading

**Symptom**: Projects page shows "No projects available"

**Solution**:
1. Login as admin
2. Go to Dashboard
3. Click "Add Project"
4. Fill in details
5. Create

**Or via API**:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "githubLink": "https://github.com/...",
    "liveLink": "https://..."
  }'
```

---

## 🔐 AUTHENTICATION ISSUES

### Issue: Cannot Create Admin Account

**Symptom**: Signup returns error or creates regular user

**Solution**:
```bash
# Use API directly (not via UI)
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "SecurePass123!",
  "role": "admin"  // ← This is key!
}
```

**Using cURL**:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@portfolio.com",
    "password": "Admin@123",
    "role": "admin"
  }'
```

### Issue: Login Not Working

**Symptoms**:
- "Invalid credentials" error
- Token not stored
- Redirects to login repeatedly

**Solutions**:

1. **Verify credentials**:
```bash
# Check user exists
mongosh
use portfolio
db.users.findOne({ email: "admin@portfolio.com" })
```

2. **Check JWT secret**:
```env
# backend/.env must have:
JWT_SECRET=your_secret_key_here_make_it_long_and_random
```

3. **Clear browser storage**:
- Open DevTools → Application → Storage
- Clear Local Storage
- Clear Cookies
- Try login again

4. **Check token in Redux**:
- Install Redux DevTools extension
- Check `auth.token` in state

### Issue: Dashboard Access Denied

**Symptom**: "Access Denied" even after login

**Solutions**:

1. **Verify admin role**:
```bash
mongosh
use portfolio
db.users.findOne({ email: "your@email.com" })
# Check: { role: "admin" }
```

2. **Update role if needed**:
```bash
mongosh
use portfolio
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

3. **Check JWT token**:
- Open DevTools → Application → Redux
- Verify `auth.user.role === "admin"`

---

## 🌐 NETWORK & API ISSUES

### Issue: Frontend Can't Connect to Backend

**Symptoms**:
```
Network Error
Failed to fetch
CORS error
```

**Solutions**:

1. **Verify backend is running**:
```bash
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"Server is running"}
```

2. **Check CORS configuration**:
```javascript
// backend/src/server.js
cors({
  origin: process.env.CLIENT_URL, // Must match frontend URL
  credentials: true,
})
```

3. **Verify frontend API URL**:
```env
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

4. **Check services/api.js**:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Issue: 404 Not Found on API Calls

**Solution**:
```bash
# Check API routes
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/about
curl http://localhost:5000/api/auth/profile

# Verify routes in backend
grep -r "router" backend/src/routes/
```

### Issue: CORS Errors

**Symptom**:
```
Access-Control-Allow-Origin header not present
CORS policy blocked
```

**Solution**:
```javascript
// backend/src/server.js
app.use(cors({
  origin: 'http://localhost:5173', // Exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 📁 FILE UPLOAD ISSUES

### Issue: Resume Upload Fails

**Symptoms**:
- "Please upload a file" error
- Upload button doesn't work
- File too large error

**Solutions**:

1. **Check file requirements**:
- Must be PDF format
- Max size: 5MB
- File input accepts: `.pdf`

2. **Verify uploads folder exists**:
```bash
cd backend
mkdir -p uploads
chmod 755 uploads
```

3. **Check multer configuration**:
```javascript
// backend/src/middlewares/upload.js
// Verify destination and limits
```

4. **Test upload via Postman**:
```
PUT http://localhost:5000/api/about/resume
Authorization: Bearer YOUR_JWT_TOKEN
Body: form-data
  - Key: resume
  - Type: File
  - Value: [Select PDF file]
```

### Issue: Downloaded Resume Corrupted

**Solution**:
1. Check file exists: `ls -la backend/uploads/`
2. Verify file permissions: `chmod 644 backend/uploads/*.pdf`
3. Check file MIME type in response

---

## 🎨 FRONTEND ISSUES

### Issue: Styles Not Loading

**Symptoms**:
- No styling/plain HTML
- Tailwind classes not working

**Solutions**:

1. **Rebuild Tailwind**:
```bash
cd frontend
npm run build
npm run dev
```

2. **Check tailwind.config.js**:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

3. **Verify imports**:
```javascript
// main.jsx or App.jsx
import './index.css'
```

### Issue: Page Not Found (React Router)

**Symptom**: Refreshing page shows 404

**Solution**:
```javascript
// vite.config.js
export default defineConfig({
  // ... other config
  server: {
    historyApiFallback: true
  }
})
```

For production, configure hosting platform (Vercel/Netlify) for SPA routing.

### Issue: Components Not Rendering

**Solutions**:
1. Check browser console for errors
2. Verify imports are correct
3. Check component names match exports
4. Ensure all dependencies installed

---

## ⚡ PERFORMANCE ISSUES

### Issue: Slow Page Load

**Solutions**:

1. **Enable compression**:
```bash
cd backend
npm install compression
```
```javascript
// server.js
import compression from 'compression';
app.use(compression());
```

2. **Optimize images**:
- Use WebP format
- Lazy load images
- Add image dimensions

3. **Check database queries**:
```javascript
// Add indexes
db.projects.createIndex({ createdAt: -1 })
db.users.createIndex({ email: 1 })
```

### Issue: Memory Leaks

**Solutions**:
1. Clean up useEffect dependencies
2. Cancel pending API calls on unmount
3. Remove event listeners

---

## 🔍 DEBUGGING TIPS

### Enable Debug Logging

**Backend**:
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**Frontend**:
```javascript
// Add to api.js
api.interceptors.request.use(config => {
  console.log('API Request:', config.method, config.url);
  return config;
});
```

### Check Environment Variables

```bash
# Backend
cd backend
node -e "console.log(process.env)"

# Frontend
cd frontend
npm run dev -- --debug
```

### Verify Package Versions

```bash
# Check installed versions
npm list react react-dom react-router-dom
npm list express mongoose jsonwebtoken
```

---

## 🆘 GETTING HELP

### Collect Debug Information

Before asking for help, gather:

1. **Error messages** (full stack trace)
2. **Console logs** (browser + terminal)
3. **Environment details**:
```bash
node --version
npm --version
mongod --version
```
4. **Package versions**: `npm list`
5. **Steps to reproduce** the issue

### Common Commands for Debugging

```bash
# Check logs
npm run dev 2>&1 | tee debug.log

# Test API endpoints
curl -v http://localhost:5000/api/health

# Check database
mongosh
show dbs
use portfolio
db.stats()
db.users.find()
db.projects.find()
db.abouts.find()

# Check file permissions
ls -la backend/uploads/
ls -la frontend/dist/

# Test frontend build
cd frontend
npm run build
npm run preview
```

---

## 📚 USEFUL RESOURCES

- MongoDB Docs: https://docs.mongodb.com/
- Express.js: https://expressjs.com/
- React Router: https://reactrouter.com/
- Redux Toolkit: https://redux-toolkit.js.org/
- Tailwind CSS: https://tailwindcss.com/

---

## ✅ PREVENTIVE MEASURES

### Before Starting Development
- [ ] Verify all dependencies installed
- [ ] Check environment variables set
- [ ] Test database connection
- [ ] Run seed scripts
- [ ] Create test admin account

### During Development
- [ ] Check console regularly
- [ ] Test after each feature
- [ ] Commit working code frequently
- [ ] Keep dependencies updated

### Before Deployment
- [ ] Run full test checklist
- [ ] Check production environment variables
- [ ] Test with production database
- [ ] Verify all routes work
- [ ] Check error handling

---

**Still having issues? Check the main README.md or create an issue with full debug info!**
