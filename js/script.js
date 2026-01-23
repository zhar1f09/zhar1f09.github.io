// Main JavaScript for Roblox Developer Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all functionality
    initPortfolioTabs();
    initClickableContacts();
    initContactForm();
    initPortfolioFiltering();
    initSmoothScrolling();
    initResponsiveMenu();
    initImageErrorHandling();
});

// ===== PORTFOLIO TABS FUNCTIONALITY =====
function initPortfolioTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
            
            // For "All Work" tab, show all portfolio items
            if (tabId === 'all') {
                const allItems = document.querySelectorAll('.portfolio-item');
                allItems.forEach(item => {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
            } else {
                // For category tabs, filter items
                filterPortfolioItems(tabId);
            }
        });
    });
}

// ===== PORTFOLIO FILTERING =====
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.tab-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-tab');
            filterPortfolioItems(filterValue);
        });
    });
}

function filterPortfolioItems(category) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if (category === 'all') {
            // Show all items with animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }, 300);
        } else if (item.getAttribute('data-category') === category) {
            // Show matching items
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }, 300);
        } else {
            // Hide non-matching items
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CLICKABLE CONTACT LINKS =====
function initClickableContacts() {
    // All clickable contact elements
    const clickableElements = document.querySelectorAll('.clickable');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'copy':
                    e.preventDefault();
                    copyToClipboard(this.getAttribute('data-copy-text'));
                    break;
                    
                case 'availability':
                    e.preventDefault();
                    showAvailabilityMessage();
                    break;
                    
                // For email and external links, let the default action handle it
                // (they already have href and target attributes)
                default:
                    // For buttons, prevent default
                    if (this.tagName.toLowerCase() === 'button') {
                        e.preventDefault();
                    }
                    break;
            }
        });
    });
}

// Copy text to clipboard
function copyToClipboard(text) {
    // Try using the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showNotification('Copied to clipboard: ' + text);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard: ' + text);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showNotification('Failed to copy to clipboard');
    }
    
    document.body.removeChild(textArea);
}

// Show availability message
function showAvailabilityMessage() {
    const message = "I'm currently available for new projects! I can typically respond within 24 hours. Please use the contact form or email me directly to discuss your project.";
    
    showNotification(message, 5000);
}

// Show notification
function showNotification(message, duration = 3000) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                projectType: document.getElementById('project-type').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
                showNotification('Please fill in all required fields', 3000);
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Simulate successful submission
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 5000);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log to console (for development)
                console.log('Form submitted:', formData);
                
            }, 1500);
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a hash link to same page
            if (href === '#') return;
            
            // Check if it's an internal link
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== IMAGE ERROR HANDLING =====
function initImageErrorHandling() {
    // Set up error handlers for images that fail to load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If there's already a placeholder text, don't change it
            if (!this.hasAttribute('data-error-handled')) {
                this.setAttribute('data-error-handled', 'true');
                
                // Try to extract category from src or parent
                let category = 'Portfolio Item';
                const src = this.getAttribute('src') || '';
                
                if (src.includes('modeling')) category = '3D Model';
                else if (src.includes('building')) category = 'Building';
                else if (src.includes('ui-ux')) category = 'UI/UX Design';
                else if (src.includes('scripting')) category = 'Scripting';
                else if (src.includes('clothing')) category = 'Clothing';
                
                // Create a fallback div with text
                const parent = this.parentElement;
                if (parent && parent.classList.contains('portfolio-image')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'image-fallback';
                    fallback.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #666;
                        font-weight: 600;
                        text-align: center;
                        padding: 20px;
                        font-size: 1.2rem;
                    `;
                    fallback.textContent = category;
                    
                    // Replace image with fallback
                    parent.appendChild(fallback);
                    this.style.display = 'none';
                }
            }
        });
    });
}

// ===== RESPONSIVE MENU FOR MOBILE =====
function initResponsiveMenu() {
    // Only create mobile menu if we're on a small screen
    if (window.innerWidth <= 1200) {
        // Create mobile menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.setAttribute('aria-label', 'Toggle menu');
        
        // Insert at the beginning of body
        document.body.insertBefore(menuButton, document.body.firstChild);
        
        // Add toggle functionality
        menuButton.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('mobile-open');
            menuButton.classList.toggle('active');
            
            // Update icon
            if (sidebar.classList.contains('mobile-open')) {
                menuButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(e) {
            const sidebar = document.querySelector('.sidebar');
            const menuButton = document.querySelector('.mobile-menu-button');
            
            if (window.innerWidth <= 1200) {
                if (sidebar && menuButton && 
                    !sidebar.contains(e.target) && 
                    !menuButton.contains(e.target) && 
                    sidebar.classList.contains('mobile-open')) {
                    sidebar.classList.remove('mobile-open');
                    menuButton.classList.remove('active');
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Close sidebar when clicking a link on mobile
        const sidebarLinks = document.querySelectorAll('.sidebar a, .sidebar button');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1200) {
                    const sidebar = document.querySelector('.sidebar');
                    const menuButton = document.querySelector('.mobile-menu-button');
                    
                    if (sidebar && menuButton && sidebar.classList.contains('mobile-open')) {
                        sidebar.classList.remove('mobile-open');
                        menuButton.classList.remove('active');
                        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    }
}

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize mobile menu if needed
        const existingButton = document.querySelector('.mobile-menu-button');
        if (window.innerWidth <= 1200 && !existingButton) {
            initResponsiveMenu();
        } else if (window.innerWidth > 1200 && existingButton) {
            existingButton.remove();
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
        }
    }, 250);
});
