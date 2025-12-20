// Portfolio JavaScript - Complete Implementation
// Handles project management, modals, animations, and API integration

// Global variables
let projects = [];
let currentProjectId = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize portfolio functionality
function initializePortfolio() {
    loadProjects();
    setupEventListeners();
    setupAnimations();
    setupSmoothScrolling();
}

// Setup event listeners
function setupEventListeners() {
    // Add project button
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', openAddProjectModal);
    }

    // Modal close buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
            closeAddProjectModal();
            closeProjectDetailModal();
        }
    });

    // Form submissions
    const addProjectForm = document.getElementById('addProjectForm');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', handleAddProject);
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

// Load projects from API or localStorage
async function loadProjects() {
    try {
        const response = await fetch('http://localhost:8000/api/projects');
        if (response.ok) {
            projects = await response.json();
        } else {
            loadProjectsFromStorage();
        }
    } catch (error) {
        console.log('API not available, loading from localStorage');
        loadProjectsFromStorage();
    }

    renderProjects();
}

// Load projects from localStorage
function loadProjectsFromStorage() {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
        projects = JSON.parse(stored);
    } else {
        // Initialize with sample project
        projects = [{
            id: 1,
            title: "Coffee Shop Sales Analytics Dashboard",
            category: "Data Analysis & Business Intelligence",
            description: "Comprehensive analysis of 65,000+ transactions to uncover actionable business insights for coffee shop optimization.",
            achievements: [
                "Identified $50,000+ revenue opportunity through evening hour analysis",
                "Discovered 45% revenue concentration in 3-hour morning window",
                "Mapped product portfolio showing 65% sales from Coffee+Tea categories"
            ],
            tools: ["Tableau", "Excel", "Statistical Analysis", "Business Intelligence"],
            projectLink: "#",
            githubLink: "#",
            emoji: "☕",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }];
        saveProjectsToStorage();
    }
}

// Save projects to localStorage
function saveProjectsToStorage() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

// Render projects to grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-projects">No projects yet. Add your first project!</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    const achievements = project.achievements || [];
    const tools = project.tools || [];

    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">${project.emoji || '📊'}</div>
            <div class="project-category">${project.category || 'Data Analysis'}</div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-achievements">
            ${achievements.slice(0, 2).map(achievement =>
                `<div class="achievement-item">✓ ${achievement}</div>`
            ).join('')}
            ${achievements.length > 2 ? `<div class="achievement-item">+${achievements.length - 2} more achievements</div>` : ''}
        </div>
        <div class="project-tools">
            ${tools.slice(0, 3).map(tool =>
                `<span class="tool-tag">${tool}</span>`
            ).join('')}
            ${tools.length > 3 ? `<span class="tool-tag">+${tools.length - 3}</span>` : ''}
        </div>
        <div class="project-actions">
            <button class="btn btn-secondary" onclick="viewProjectDetail(${project.id})">View Details</button>
            <button class="btn btn-outline" onclick="deleteProject(${project.id})">Delete</button>
        </div>
    `;

    return card;
}

// View project detail
function viewProjectDetail(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectDetailModal');
    const content = document.getElementById('projectDetailContent');

    if (!modal || !content) return;

    const achievements = project.achievements || [];
    const tools = project.tools || [];

    content.innerHTML = `
        <div class="project-detail-header">
            <div class="project-detail-icon">${project.emoji || '📊'}</div>
            <div class="project-detail-meta">
                <h2>${project.title}</h2>
                <span class="project-detail-category">${project.category || 'Data Analysis'}</span>
            </div>
        </div>

        <div class="project-detail-content">
            <div class="project-detail-section">
                <h3>Project Overview</h3>
                <p>${project.description}</p>
            </div>

            ${achievements.length > 0 ? `
            <div class="project-detail-section">
                <h3>Key Achievements</h3>
                <ul class="achievements-list">
                    ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${tools.length > 0 ? `
            <div class="project-detail-section">
                <h3>Tools & Technologies</h3>
                <div class="tools-grid">
                    ${tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <div class="project-detail-links">
                ${project.projectLink && project.projectLink !== '#' ?
                    `<a href="${project.projectLink}" target="_blank" class="btn btn-primary">View Project</a>` : ''}
                ${project.githubLink && project.githubLink !== '#' ?
                    `<a href="${project.githubLink}" target="_blank" class="btn btn-secondary">View on GitHub</a>` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Delete project
function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
        // Try API first
        fetch(`http://localhost:8000/api/projects/${projectId}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                projects = projects.filter(p => p.id !== projectId);
                renderProjects();
                showNotification('Project deleted successfully!', 'success');
            } else {
                throw new Error('API delete failed');
            }
        }).catch(error => {
            // Fallback to localStorage
            projects = projects.filter(p => p.id !== projectId);
            saveProjectsToStorage();
            renderProjects();
            showNotification('Project deleted successfully!', 'success');
        });
    } catch (error) {
        // Fallback to localStorage
        projects = projects.filter(p => p.id !== projectId);
        saveProjectsToStorage();
        renderProjects();
        showNotification('Project deleted successfully!', 'success');
    }
}

// Modal functions
function openAddProjectModal() {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeAddProjectModal() {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const form = document.getElementById('addProjectForm');
        if (form) form.reset();
    }
}

function closeProjectDetailModal() {
    const modal = document.getElementById('projectDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle add project form submission
async function handleAddProject(event) {
    event.preventDefault();

    const formData = {
        title: document.getElementById('projectTitle').value.trim(),
        category: document.getElementById('projectCategory').value.trim(),
        description: document.getElementById('projectDescription').value.trim(),
        achievements: [
            document.getElementById('achievement1').value.trim(),
            document.getElementById('achievement2').value.trim(),
            document.getElementById('achievement3').value.trim()
        ].filter(a => a.length > 0),
        tools: document.getElementById('projectTools').value.split(',').map(t => t.trim()).filter(t => t.length > 0),
        projectLink: document.getElementById('projectLink').value.trim() || '#',
        githubLink: document.getElementById('githubLink').value.trim() || '#',
        emoji: '📊',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    // Validation
    if (!formData.title || !formData.description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    try {
        // Try API first
        const response = await fetch('http://localhost:8000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const newProject = await response.json();
            projects.push(newProject.data);
            renderProjects();
            closeAddProjectModal();
            showNotification('Project added successfully!', 'success');
        } else {
            throw new Error('API create failed');
        }
    } catch (error) {
        // Fallback to localStorage
        const newId = Math.max(...projects.map(p => p.id), 0) + 1;
        formData.id = newId;
        projects.push(formData);
        saveProjectsToStorage();
        renderProjects();
        closeAddProjectModal();
        showNotification('Project added successfully!', 'success');
    }
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();

    const formData = {
        name: event.target.querySelector('input[type="text"]').value,
        email: event.target.querySelector('input[type="email"]').value,
        message: event.target.querySelector('textarea').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Here you would typically send the data to a server
    // For now, just show a success message
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    event.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: #4CAF50;
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-error {
        background: #f44336;
    }

    .notification-info {
        background: #2196F3;
    }

    .notification-success {
        background: #4CAF50;
    }

    /* Animation Styles */
    .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .project-card.animate {
        opacity: 1;
        transform: translateY(0);
    }

    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }

    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background-color: #fff;
        margin: 5% auto;
        padding: 0;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .modal-large .modal-content {
        max-width: 800px;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 15px;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        color: #666;
        z-index: 1;
    }

    .close:hover {
        color: #000;
    }

    /* Form Styles */
    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #333;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
    }

    .form-group textarea {
        resize: vertical;
        min-height: 80px;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 30px;
    }

    /* Project Detail Styles */
    .project-detail-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px 8px 0 0;
    }

    .project-detail-icon {
        font-size: 48px;
    }

    .project-detail-meta h2 {
        margin: 0 0 5px 0;
        font-size: 24px;
    }

    .project-detail-category {
        font-size: 14px;
        opacity: 0.9;
    }

    .project-detail-content {
        padding: 20px;
    }

    .project-detail-section {
        margin-bottom: 30px;
    }

    .project-detail-section h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 18px;
    }

    .achievements-list {
        list-style: none;
        padding: 0;
    }

    .achievements-list li {
        padding: 8px 0;
        border-bottom: 1px solid #eee;
    }

    .achievements-list li:before {
        content: "✓";
        color: #4CAF50;
        margin-right: 10px;
    }

    .tools-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tool-badge {
        background: #f0f0f0;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        color: #666;
    }

    .project-detail-links {
        display: flex;
        gap: 10px;
        margin-top: 30px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }

        .form-actions {
            flex-direction: column;
        }

        .form-actions .btn {
            width: 100%;
        }

        .project-detail-links {
            flex-direction: column;
        }

        .project-detail-links .btn {
            width: 100%;
        }
    }
`;

document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}
