# ✅ TESTING CHECKLIST

Use this checklist to verify all features are working correctly.

---

## 🚀 Initial Setup Tests

- [ ] Backend dependencies installed successfully
- [ ] Frontend dependencies installed successfully
- [ ] MongoDB connected successfully
- [ ] Backend `.env` file configured
- [ ] Frontend `.env` file created
- [ ] Seed script executed: `npm run seed:about`
- [ ] Admin account created via API
- [ ] Backend server starts: `npm run dev`
- [ ] Frontend server starts: `npm run dev`

---

## 🌐 Public Features (No Login Required)

### Home Page
- [ ] Home page loads at http://localhost:5173
- [ ] Hero section displays with title
- [ ] "View Projects" button is visible
- [ ] "Contact Me" button is visible
- [ ] "Download Resume" button shows (if resume uploaded)
- [ ] Feature cards display correctly
- [ ] Animation effects work on title

### Navigation Tests
- [ ] Click "View Projects" → navigates to `/projects` page
- [ ] Click "Contact Me" → navigates to `/contact` page
- [ ] Navbar links work (Home, Projects, About, Contact)
- [ ] Footer displays correctly

### Projects Page
- [ ] Projects page loads at `/projects`
- [ ] Projects fetch from database
- [ ] Project cards display correctly
- [ ] Technologies badges show
- [ ] "View Details" button works
- [ ] GitHub icon shows (if link exists)
- [ ] Live Demo icon shows (if link exists)
- [ ] Empty state shows if no projects: "No projects available yet"

### Project Detail Page
- [ ] Individual project page loads: `/projects/:id`
- [ ] Full project description shows
- [ ] All technologies listed
- [ ] GitHub button works (opens in new tab)
- [ ] Live Demo button works (opens in new tab)
- [ ] Back button returns to projects

### About Page
- [ ] About page loads at `/about`
- [ ] Name displays (if set in database)
- [ ] Role displays (if set in database)
- [ ] Bio displays (from database or default)
- [ ] Skills display dynamically from database
- [ ] Skills show as colored badges
- [ ] Empty state shows if no skills (fallback categories)

### Contact Page
- [ ] Contact page loads at `/contact`
- [ ] Contact form displays
- [ ] Email displays: rjayprakash303@gmail.com
- [ ] Phone displays: 9389203228
- [ ] Location displays: Jaipur, India
- [ ] LinkedIn icon shows (if link in database)
- [ ] GitHub icon shows (if link in database)
- [ ] Form submission shows success message
- [ ] Form clears after submission

### Resume Features
- [ ] Resume available indicator shows on home page
- [ ] "Download Resume" button works
- [ ] PDF downloads correctly
- [ ] Downloaded file opens as PDF

---

## 🔐 Authentication Tests

### Signup (Not in UI - API Only)
- [ ] Can create regular user via API
- [ ] Can create admin user via API
- [ ] Duplicate email rejected
- [ ] Weak passwords rejected

### Login
- [ ] Login page loads at `/login`
- [ ] Can login with admin credentials
- [ ] Can login with regular user credentials
- [ ] JWT token stored in Redux
- [ ] Wrong credentials show error
- [ ] Redirects to home after successful login
- [ ] "Logout" appears in navbar when logged in

### Authorization
- [ ] Regular user cannot access `/dashboard`
- [ ] Admin can access `/dashboard`
- [ ] Login required indicator shows for protected routes
- [ ] Logout clears token and redirects

---

## 👨‍💼 Admin Dashboard Tests

### Dashboard Access
- [ ] Login as admin
- [ ] Navigate to `/dashboard`
- [ ] Dashboard loads successfully
- [ ] Welcome message shows admin name
- [ ] Admin badge visible

### Statistics Cards
- [ ] Total Projects count displays correctly
- [ ] Skills count displays correctly
- [ ] Resume status shows (✓ or ✗)

### Resume Management
- [ ] File input accepts PDF only
- [ ] Can select PDF file
- [ ] Upload button enabled after selecting file
- [ ] Upload progress/loading indicator shows
- [ ] Success message after upload
- [ ] File input clears after upload
- [ ] Uploaded resume shows on home page download button

### Skills Management
- [ ] Skills section displays current skills
- [ ] "Add Skill" button opens modal
- [ ] Can type skill name in modal
- [ ] "Add Skill" saves to database
- [ ] New skill appears immediately
- [ ] Success toast notification shows
- [ ] Modal closes after adding
- [ ] Delete button (×) on each skill
- [ ] Confirm dialog shows before delete
- [ ] Skill removes from list after delete
- [ ] Changes reflect on About page immediately
- [ ] Cannot add duplicate skills
- [ ] Empty state shows: "No skills yet"

### Projects Management
- [ ] Projects table displays all projects
- [ ] "Add Project" button opens modal
- [ ] Modal has all required fields:
  - [ ] Title (required)
  - [ ] Description (required)
  - [ ] Technologies (comma separated)
  - [ ] GitHub Link
  - [ ] Live Link
  - [ ] Image (emoji or URL)
- [ ] Can create new project
- [ ] New project appears in table
- [ ] Success notification shows
- [ ] "Edit" button opens modal with data
- [ ] Can update project details
- [ ] Changes save correctly
- [ ] "Delete" button shows confirm dialog
- [ ] Can delete project
- [ ] Project removed from list
- [ ] Changes reflect on public Projects page
- [ ] Empty state shows: "No projects yet"

### Admin Profile Section
- [ ] Admin name displays
- [ ] Admin email displays
- [ ] Role shows as "admin"
- [ ] Member since date shows
- [ ] Green "Admin" badge visible

---

## 🔄 Integration Tests

### Backend → Frontend Flow
- [ ] Create project in dashboard → appears on Projects page
- [ ] Delete project in dashboard → removes from Projects page
- [ ] Add skill in dashboard → shows on About page
- [ ] Delete skill in dashboard → removes from About page
- [ ] Upload resume → download button appears on home
- [ ] Update About info → reflects on About page

### State Management
- [ ] Redux stores auth state correctly
- [ ] Token persists on page refresh
- [ ] Logout clears Redux state
- [ ] Protected routes check Redux auth state

### Error Handling
- [ ] API errors show toast notifications
- [ ] Network errors handled gracefully
- [ ] Invalid data shows validation messages
- [ ] 404 pages handled properly
- [ ] Loading states show during data fetch

---

## 🎨 UI/UX Tests

### Responsive Design
- [ ] Works on desktop (1920px+)
- [ ] Works on laptop (1024px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Navbar collapses on mobile (if implemented)
- [ ] Buttons are touch-friendly
- [ ] Forms are mobile-optimized

### Visual Elements
- [ ] Colors match theme (blue/indigo)
- [ ] Shadows and hover effects work
- [ ] Icons display correctly
- [ ] Loading spinners show during operations
- [ ] Success/error toast notifications appear
- [ ] Animations are smooth
- [ ] No layout shifts

### Accessibility
- [ ] Forms have proper labels
- [ ] Buttons have descriptive text
- [ ] Links open in new tabs (external)
- [ ] Focus states visible on keyboard navigation
- [ ] Color contrast meets standards

---

## 🛡️ Security Tests

### Authorization Checks
- [ ] Non-admin cannot access admin endpoints
- [ ] Protected routes require authentication
- [ ] JWT expires after set time
- [ ] Invalid tokens rejected

### Input Validation
- [ ] SQL injection prevented (using Mongoose)
- [ ] XSS attacks prevented (React escaping)
- [ ] File upload validates PDF only
- [ ] File size limits enforced (5MB)

### Data Security
- [ ] Passwords hashed with bcrypt
- [ ] JWT secrets not exposed
- [ ] No sensitive data in frontend code
- [ ] CORS properly configured

---

## 🚀 Performance Tests

### Load Times
- [ ] Home page loads < 2 seconds
- [ ] Projects page loads < 3 seconds
- [ ] Dashboard loads < 3 seconds
- [ ] API responses < 1 second

### Database Queries
- [ ] No N+1 query problems
- [ ] Indexes exist on queried fields
- [ ] Large datasets paginated (if needed)

---

## 📊 Data Validation Tests

### Projects
- [ ] Title required
- [ ] Description required
- [ ] Technologies parsed correctly
- [ ] URLs validated (GitHub, Live links)
- [ ] Empty technologies handled

### Skills
- [ ] Skill name required
- [ ] Whitespace trimmed
- [ ] Duplicates rejected
- [ ] Case sensitivity handled

### About Section
- [ ] Email format validated
- [ ] Phone number format flexible
- [ ] URLs valid for social links
- [ ] Empty fields handled gracefully

---

## 🐛 Edge Cases

- [ ] Empty database works (shows empty states)
- [ ] Very long project descriptions display correctly
- [ ] Special characters in titles handled
- [ ] 20+ skills display properly
- [ ] Multiple rapid clicks don't cause issues
- [ ] Concurrent admin actions handled
- [ ] Browser back button works correctly
- [ ] Page refresh maintains state (where applicable)

---

## 📝 Final Checklist

- [ ] All public pages accessible without login
- [ ] Admin can manage all content
- [ ] "View Projects" button works correctly ✅
- [ ] Skills are fully dynamic ✅
- [ ] Contact information from backend ✅
- [ ] No hardcoded data in frontend
- [ ] Security properly implemented
- [ ] Error handling throughout
- [ ] Loading states everywhere
- [ ] Toast notifications for all actions
- [ ] README.md complete with instructions
- [ ] Code follows best practices
- [ ] No console errors in browser
- [ ] No console warnings in terminal

---

## 🎉 Success Criteria

**All objectives completed when:**
- ✅ View Projects button navigates to projects page
- ✅ Projects load dynamically from MongoDB
- ✅ Skills managed dynamically (admin add/delete)
- ✅ Contact page shows backend-driven data
- ✅ All security measures in place
- ✅ Production-ready code quality

---

**Test Date**: _______________

**Tested By**: _______________

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

**Overall Status**: [ ] PASS  [ ] FAIL

If any items fail, document issues and retest after fixes.
