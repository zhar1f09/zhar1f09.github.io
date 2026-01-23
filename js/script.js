// Professional Portfolio - Modern Design with Portfolio Filtering

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all functionality
    initNavigation();
    initContactItems();
    initContactForm();
    initMobileMenu();
    initScrollSpy();
    initPortfolio();
});

// ===== PORTFOLIO DATA =====
const portfolioItems = [
    {
        id: 1,
        title: "Fantasy Character",
        description: "Complete character model with custom animations and rigging",
        category: "modeling",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Character+Model"
    },
    {
        id: 2,
        title: "Medieval Castle",
        description: "Large-scale castle environment with detailed interiors",
        category: "building",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Fantasy+Castle"
    },
    {
        id: 3,
        title: "Premium Clothing Set",
        description: "Custom Roblox avatar outfit with detailed textures",
        category: "clothing",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Clothing+Design"
    },
    {
        id: 4,
        title: "Game Thumbnail",
        description: "Promotional artwork for popular Roblox game",
        category: "graphics",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Game+Thumbnail"
    },
    {
        id: 5,
        title: "Discord Server Setup",
        description: "Complete Discord server with custom bots and channels",
        category: "discord",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Discord+Server"
    },
    {
        id: 6,
        title: "Magical Sword",
        description: "Weapon model with particle effects and animations",
        category: "modeling",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Weapon+Design"
    },
    {
        id: 7,
        title: "Cyberpunk City",
        description: "Futuristic city environment with neon lighting",
        category: "building",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Modern+City"
    },
    {
        id: 8,
        title: "Avatar Bundle",
        description: "Complete Roblox avatar with matching accessories",
        category: "clothing",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Avatar+Bundle"
    },
    {
        id: 9,
        title: "Logo Design",
        description: "Brand identity for Roblox development group",
        category: "graphics",
        image: "https://via.placeholder.com/400x300/1a1a1a/ff4444?text=Logo+Design"
    }
];

// ===== PORTFOLIO SYSTEM =====
function initPortfolio() {
    renderPortfolioGrid();
    initPortfolioFilter();
    initPortfolioGIF();
}

// Render the 2×2 portfolio grid
function renderPortfolioGrid() {
    const gridContainer = document.querySelector('.portfolio-grid');
    const gifContainer = document.querySelector('.gif-carousel');
    
    // Clear existing content
    gridContainer.innerHTML = '';
    gifContainer.innerHTML = '';
    
    // Get first 4 items for the main grid
    const gridItems = portfolioItems.slice(0, 4);
    
    // Render grid items (2×2)
    gridItems.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        gridContainer.appendChild(portfolioItem);
    });
    
    // If there are more than 4 items, create GIF carousel
    if (portfolioItems.length > 4) {
        const gifItems = portfolioItems.slice(4); // Get items after the first 4
        const gifContainerElement = document.querySelector('.portfolio-gif-container');
        
        // Show GIF container
        gifContainerElement.style.display = 'block';
        
        // Render GIF items
        gifItems.forEach(item => {
            const gifItem = createGIFItem(item);
            gifContainer.appendChild(gifItem);
        });
    }
}

// Create portfolio item element
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-id', item.id);
    
    div.innerHTML = `
        <div class="portfolio-image">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/666666?text=${item.category}'">
            <span class="portfolio-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
        </div>
        <div class="portfolio-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Create GIF item element
function createGIFItem(item) {
    const div = document.createElement('div');
    div.className = 'gif-item';
    div.setAttribute('data-category', item.category);
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x250/1a1a1a/666666?text=${item.category}'">
        <div class="gif-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Initialize portfolio filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const gifItems = document.querySelectorAll('.gif-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter main grid items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Filter GIF items
            gifItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'slideIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Restart GIF animation
            initPortfolioGIF();
        });
    });
}

// Initialize portfolio GIF/carousel
function initPortfolioGIF() {
    const gifItems = document.querySelectorAll('.gif-item');
    const gifTimer = document.querySelector('.gif-timer');
    
    if (gifItems.length === 0) return;
    
    let currentIndex = 0;
    const intervalTime = 3000; // 3 seconds
    
    // Show all items initially
    gifItems.forEach((item, index) => {
        item.style.opacity = index === 0 ? '1' : '0';
        item.style.transform = index === 0 ? 'translateY(0)' : 'translateY(20px)';
    });
    
    // Start auto-rotation
    const startRotation = () => {
        const interval = setInterval(() => {
            // Hide current item
            gifItems[currentIndex].style.opacity = '0';
            gifItems[currentIndex].style.transform = 'translateY(20px)';
            
            // Move to next item
            currentIndex = (currentIndex + 1) % gifItems.length;
            
            // Show next item
            setTimeout(() => {
                gifItems[currentIndex].style.opacity = '1';
                gifItems[currentIndex].style.transform = 'translateY(0)';
            }, 100);
            
            // Update timer display
            if (gifTimer) {
                gifTimer.textContent = '3s';
            }
            
        }, intervalTime);
        
        // Update timer every second
        const timerInterval = setInterval(() => {
            if (gifTimer) {
                const remaining = Math.ceil((intervalTime - (Date.now() % intervalTime)) / 1000);
                gifTimer.textContent = `${remaining}s`;
            }
        }, 1000);
        
        // Store interval IDs for cleanup
        window.portfolioInterval = interval;
        window.timerInterval = timerInterval;
    };
    
    // Start rotation
    startRotation();
    
    // Pause on hover
    const gifContainer = document.querySelector('.gif-carousel');
    if (gifContainer) {
        gifContainer.addEventListener('mouseenter', () => {
            if (window.portfolioInterval) clearInterval(window.portfolioInterval);
            if (window.timerInterval) clearInterval(window.timerInterval);
            if (gifTimer) gifTimer.textContent = 'Paused';
        });
        
        gifContainer.addEventListener('mouseleave', () => {
            startRotation();
        });
    }
}

// Clean up intervals when switching filters
function cleanupPortfolioIntervals() {
    if (window.portfolioInterval) clearInterval(window.portfolioInterval);
    if (window.timerInterval) clearInterval(window.timerInterval);
}

// ===== SCROLL SPY NAVIGATION =====
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLL =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-content');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const menuBtn = document.querySelector('.mobile-menu-btn');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    const sidebar = document.querySelector('.sidebar');
                    sidebar.classList.remove('active');
                }
            }
        });
    });
}

// ===== CONTACT ITEMS =====
function initContactItems() {
    const contactIcons = document.querySelectorAll('.contact-icon');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            
            if (action === 'copy') {
                e.preventDefault();
                const text = this.getAttribute('data-copy-text');
                copyToClipboard(text);
            }
            
            // Close sidebar on mobile after click
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.remove('active');
            }
        });
    });
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showNotification(`Copied to clipboard: ${text}`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        fallbackCopyToClipboard(text);
    }
}

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
        showNotification(`Copied to clipboard: ${text}`);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showNotification('Failed to copy to clipboard');
    }
    
    document.body.removeChild(textArea);
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
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.projectType || !formData.budget || !formData.message) {
                showNotification('Please fill in all required fields');
                return;
            }
            
            // Validate budget
            if (formData.budget < 0) {
                showNotification('Please enter a valid budget amount');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Success message
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 5000);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
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
    const navContent = document.querySelector('.nav-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Mobile navigation menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navContent.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update icon
            if (navContent.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContent.contains(e.target) && !mobileMenuBtn.contains(e.target) && navContent.classList.contains('active')) {
                navContent.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
                sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
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
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-left: 4px solid var(--primary-color);
        border-radius: 8px;
        padding: 15px 20px;
        max-width: 350px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateY(100px)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}
