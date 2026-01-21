// DOM Elements
const contactForm = document.getElementById('contactForm');
const currentYearElement = document.getElementById('currentYear');
const sections = document.querySelectorAll('.section');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    updateCurrentYear();
    
    // Initialize counters
    initCounters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize portfolio tabs
    initPortfolioTabs();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize image error handlers
    initImageHandlers();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => {
            if (isElementInViewport(section)) {
                section.style.animationPlayState = 'running';
            }
        });
    }, 300);
});

// Update current year in footer
function updateCurrentYear() {
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize counter animations
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        stat.textContent = '0+';
        
        let current = 0;
        const increment = target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 30);
    });
}

// Initialize portfolio tabs
function initPortfolioTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show selected tab content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Special handling for "All" tab
            if (tabId === 'all') {
                showAllPortfolioItems();
            }
        });
    });
}

// Show all portfolio items
function showAllPortfolioItems() {
    portfolioItems.forEach(item => {
        item.style.display = 'block';
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            scrollToSection(targetId);
        });
    });
    
    // Portfolio item click events
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // You can add modal functionality here
            console.log('Portfolio item clicked');
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !projectType || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success message
        showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log to console (for testing)
        console.log('Form submitted:', { 
            name, 
            email, 
            projectType, 
            message 
        });
    }, 2000);
}

// Scroll to section smoothly
function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Allow click to dismiss
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize image error handlers
function initImageHandlers() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Extract category from src
            const src = this.src;
            if (src.includes('modeling')) {
                this.src = 'https://via.placeholder.com/400x300/2a2a2a/666666?text=3D+Model';
            } else if (src.includes('building')) {
                this.src = 'https://via.placeholder.com/400x300/2a2a2a/666666?text=Environment+Build';
            } else if (src.includes('ui-ux')) {
                this.src = 'https://via.placeholder.com/400x300/2a2a2a/666666?text=UI+Design';
            } else if (src.includes('scripting')) {
                this.src = 'https://via.placeholder.com/400x300/2a2a2a/666666?text=Scripting+System';
            } else {
                this.src = 'https://via.placeholder.com/400x300/2a2a2a/666666?text=Portfolio+Image';
            }
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Tab navigation for portfolio
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        const currentIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % tabButtons.length;
        tabButtons[nextIndex].click();
    }
});
