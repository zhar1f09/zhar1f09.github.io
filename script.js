// DOM Elements
const contactForm = document.getElementById('contactForm');
const currentYearElement = document.getElementById('currentYear');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    updateCurrentYear();
    
    // Initialize counters
    initCounters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add event listeners
    setupEventListeners();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
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
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
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
                entry.target.classList.add('visible');
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

// Update active navigation link
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
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
            
            // Update active nav link on click
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes any open modals (future feature)
        if (e.key === 'Escape') {
            // Add functionality for closing modals if added later
        }
        
        // Tab navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Mouse click removes keyboard navigation class
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real implementation, you would send this data to a server
    // For GitHub Pages static hosting, we'll simulate submission
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success message
        showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log to console (for testing)
        console.log('Form submitted:', { name, email, subject, message });
    }, 1500);
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

// Initialize tooltips (if needed in future)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '10000';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement && this.tooltipElement.parentNode) {
                this.tooltipElement.parentNode.removeChild(this.tooltipElement);
            }
        });
    });
}
