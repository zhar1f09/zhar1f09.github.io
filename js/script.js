// Main JavaScript for Roblox Developer Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all functionality
    initNavigation();
    initContactTabs();
    initPortfolioTabs();
    initPortfolioCarousel();
    initContactForm();
    initMobileMenu();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Set first section as active
    if (sections.length > 0) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked link and target section
                this.classList.add('active');
                targetSection.classList.add('active');
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-menu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// ===== CONTACT TABS =====
function initContactTabs() {
    const contactTabs = document.querySelectorAll('.contact-tab, .social-icon, .social-btn');
    
    contactTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'copy':
                    e.preventDefault();
                    const text = this.getAttribute('data-copy-text');
                    copyToClipboard(text);
                    break;
                    
                case 'availability':
                    e.preventDefault();
                    showAvailabilityMessage();
                    break;
                    
                // For email and external links, let default behavior handle it
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

// Copy to clipboard function
function copyToClipboard(text) {
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
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy method
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
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

// ===== PORTFOLIO TABS =====
function initPortfolioTabs() {
    const portfolioTabs = document.querySelectorAll('.port-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .carousel-item');
    
    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            portfolioTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide portfolio items based on category
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update carousel if needed
            if (window.swiperInstance) {
                setTimeout(() => {
                    window.swiperInstance.update();
                }, 350);
            }
        });
    });
}

// ===== PORTFOLIO CAROUSEL =====
function initPortfolioCarousel() {
    // Initialize Swiper carousel
    window.swiperInstance = new Swiper('.portfolio-carousel', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });
}

// ===== CONTACT FORM =====
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
            
            // Simulate API call
            setTimeout(() => {
                // Success message
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 5000);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log for development
                console.log('Form submitted:', formData);
                
            }, 1500);
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update icon
            if (navMenu.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // Toggle sidebar on mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1001;
        background: var(--accent);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(sidebarToggle);
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Show/hide sidebar toggle based on screen size
    function updateSidebarToggle() {
        if (window.innerWidth <= 768) {
            sidebarToggle.style.display = 'flex';
        } else {
            sidebarToggle.style.display = 'none';
            sidebar.classList.remove('active');
        }
    }
    
    updateSidebarToggle();
    window.addEventListener('resize', updateSidebarToggle);
}

// ===== IMAGE ERROR HANDLING =====
window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.hasAttribute('data-error-handled')) {
                this.setAttribute('data-error-handled', 'true');
                
                // Get category from data attribute or parent
                let category = 'Project Image';
                const src = this.getAttribute('src') || '';
                
                if (src.includes('modeling')) category = '3D Model';
                else if (src.includes('building')) category = 'Building';
                else if (src.includes('ui')) category = 'UI Design';
                else if (src.includes('scripting')) category = 'Scripting';
                else if (src.includes('clothing')) category = 'Clothing';
                
                // Create fallback
                const parent = this.parentElement;
                if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'image-fallback';
                    fallback.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #666;
                        font-weight: 600;
                        text-align: center;
                        padding: 20px;
                        font-size: 1.2rem;
                    `;
                    fallback.innerHTML = `<i class="fas fa-image"></i><span>${category}</span>`;
                    
                    parent.appendChild(fallback);
                    this.style.display = 'none';
                }
            }
        });
    });
});
