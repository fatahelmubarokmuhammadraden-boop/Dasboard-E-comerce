# 📊 Data Analytics Portfolio Website

Modern, fully-featured portfolio website for showcasing data analytics projects with dynamic project management capabilities.

## ✨ Features

### Frontend (HTML/CSS/JavaScript)
- ✅ **Modern, Responsive Design** - Beautiful UI with custom animations
- ✅ **Dynamic Project Management** - Add, edit, and delete projects without coding
- ✅ **Interactive Modals** - Detailed project views and edit forms
- ✅ **LocalStorage Integration** - Projects persist in browser
- ✅ **Smooth Animations** - Engaging user experience
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Contact Form** - Built-in contact functionality

### Backend (Python API)
- ✅ **RESTful API** - Full CRUD operations for projects
- ✅ **JSON Data Storage** - Simple file-based database
- ✅ **Statistics Endpoint** - Analytics about your portfolio
- ✅ **Export Functionality** - Backup your projects
- ✅ **CORS Enabled** - Works with any frontend

## 🚀 Quick Start

### Option 1: Frontend Only (Browser)

Simply open `index.html` in your web browser:

```bash
# Navigate to the portfolio directory
cd portfolio

# Open in default browser
open index.html
# or
xdg-open index.html
# or simply double-click index.html
```

Projects will be stored in your browser's localStorage.

### Option 2: With Python Backend

1. **Start the Python API server:**

```bash
python3 server.py
```

The server will start at `http://localhost:8000`

2. **Open the website in your browser:**

```bash
open index.html
```

Projects will be stored in `projects_data.json` file.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
├── server.py           # Python REST API server
├── projects_data.json  # Data storage (auto-generated)
└── README.md          # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2D5F5D;      /* Main brand color */
    --secondary-color: #C07F48;    /* Accent color */
    --accent-color: #E8B86D;       /* Highlight color */
    /* ... more colors */
}
```

### Changing Fonts

Replace the Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Update CSS variables:

```css
:root {
    --font-display: 'Your Display Font', serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

### Adding Your Information

Update contact information in `index.html`:

```html
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a>
<a href="https://github.com/yourusername">github.com/yourusername</a>
```

## 📝 Adding New Projects

### Via Web Interface

1. Click the **"+ Add Project"** button in the navigation
2. Fill in the project details:
   - Project Title
   - Category
   - Description
   - Key Achievements (up to 3)
   - Tools Used
   - Project Link (optional)
   - GitHub Link (optional)
3. Click **"Add Project"**

### Via API (Python Backend)

```bash
# Create a new project
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "category": "Data Analysis",
    "description": "Project description here",
    "achievements": ["Achievement 1", "Achievement 2"],
    "tools": ["Python", "Pandas", "Matplotlib"],
    "projectLink": "https://example.com",
    "githubLink": "https://github.com/user/repo"
  }'
```

### Programmatically (JavaScript)

Edit `script.js` and add to the `projects` array:

```javascript
projects.push({
    id: 2,
    title: "Your Project Title",
    category: "Data Visualization",
    description: "Brief description",
    achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3"
    ],
    tools: ["Tool1", "Tool2", "Tool3"],
    projectLink: "#",
    githubLink: "#",
    emoji: "📊"
});
```

## 🔌 API Endpoints

When running the Python backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get specific project |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/stats` | Get statistics |
| POST | `/api/export` | Export projects to JSON |

### Example API Calls

**Get all projects:**
```bash
curl http://localhost:8000/api/projects
```

**Get statistics:**
```bash
curl http://localhost:8000/api/stats
```

**Update a project:**
```bash
curl -X PUT http://localhost:8000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

**Delete a project:**
```bash
curl -X DELETE http://localhost:8000/api/projects/1
```

**Export projects:**
```bash
curl -X POST http://localhost:8000/api/export
```

## 🎯 Features in Detail

### Project Card Features
- Click any project card to view full details
- Hover effects for better UX
- Tool tags for quick technology identification
- Achievement highlights
- Direct links to live projects and GitHub repos
- Delete button for project removal

### Modal System
- **Add Project Modal**: Complete form for adding new projects
- **Project Detail Modal**: Expanded view with full project information
- Click outside or press ESC to close modals

### Responsive Design
- Desktop: Full-width layout with grid
- Tablet: Adjusted grid and spacing
- Mobile: Single column, optimized navigation

### Animation & Effects
- Smooth scroll navigation
- Fade-in animations on scroll
- Hover effects on interactive elements
- Gradient orbs in hero section
- Notification system for user feedback

## 🔧 Technical Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Google Fonts**: Crimson Pro, DM Sans

### Backend
- **Python 3**: Standard library only
- **HTTP Server**: Built-in http.server module
- **JSON**: File-based data storage
- **RESTful API**: Standard CRUD operations

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Options

### Option 1: GitHub Pages
```bash
# Push to GitHub
git add .
git commit -m "Initial portfolio"
git push origin main

# Enable GitHub Pages in repository settings
# Point to main branch
```

### Option 2: Netlify
```bash
# Drag and drop the portfolio folder to Netlify
# Or connect your GitHub repository
```

### Option 3: Vercel
```bash
npm i -g vercel
vercel --prod
```

### Option 4: Traditional Web Hosting
Upload the files via FTP/SFTP to your web host.

## 🔐 Data Storage

### Frontend Only Mode
- Data stored in browser's localStorage
- Persists until browser cache is cleared
- Limited to ~5-10MB
- Client-side only

### Backend Mode
- Data stored in `projects_data.json`
- No size limitations
- Server-side persistence
- Can be backed up easily

## 💡 Tips & Best Practices

1. **Regular Backups**: Use the export API endpoint to backup your projects
2. **Image Optimization**: Use optimized images for faster loading
3. **Content**: Keep descriptions concise and achievements specific
4. **Links**: Always test your project and GitHub links
5. **Updates**: Regularly update your portfolio with new projects

## 🐛 Troubleshooting

### Projects not saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing cache and reload

### Python server won't start
- Check if port 8000 is available
- Try a different port: `python3 server.py --port 8080`
- Ensure Python 3.6+ is installed

### Styles not loading
- Check file paths are correct
- Ensure all files are in the same directory
- Clear browser cache

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and use this template for your own portfolio!

## 📧 Contact

For questions or support, reach out via the contact form on the website.

---

**Made with ❤️ for Data Analysts and Developers**

Happy Portfolio Building! 🎉
