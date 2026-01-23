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
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Character+Model"
    },
    {
        id: 2,
        title: "Medieval Castle",
        description: "Large-scale castle environment with detailed interiors",
        category: "building",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Fantasy+Castle"
    },
    {
        id: 3,
        title: "Premium Clothing Set",
        description: "Custom Roblox avatar outfit with detailed textures",
        category: "clothing",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Clothing+Design"
    },
    {
        id: 4,
        title: "Game Thumbnail",
        description: "Promotional artwork for popular Roblox game",
        category: "graphics",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Game+Thumbnail"
    },
    {
        id: 5,
        title: "Discord Server Setup",
        description: "Complete Discord server with custom bots and channels",
        category: "discord",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Discord+Server"
    },
    {
        id: 6,
        title: "Magical Sword",
        description: "Weapon model with particle effects and animations",
        category: "modeling",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Weapon+Design"
    },
    {
        id: 7,
        title: "Cyberpunk City",
        description: "Futuristic city environment with neon lighting",
        category: "building",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Modern+City"
    },
    {
        id: 8,
        title: "Avatar Bundle",
        description: "Complete Roblox avatar with matching accessories",
        category: "clothing",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Avatar+Bundle"
    },
    {
        id: 9,
        title: "Logo Design",
        description: "Brand identity for Roblox development group",
        category: "graphics",
        image: "https://via.placeholder.com/400x300/1a1a1a/444444?text=Logo+Design"
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

// Create portfolio grid item
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.dataset.category = item.category;
    
    div.innerHTML = `
        <div class="portfolio-image">
            <span class="portfolio-category">${item.category.toUpperCase()}</span>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="portfolio-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Create GIF carousel item
function createGIFItem(item) {
    const div = document.createElement('div');
    div.className = 'gif-item';
    div.dataset.category = item.category;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gif-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Initialize portfolio filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const gifItems = document.querySelectorAll('.gif-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter grid items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Filter GIF items
            gifItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize portfolio GIF carousel rotation
function initPortfolioGIF() {
    const gifContainer = document.querySelector('.portfolio-gif-container');
    if (!gifContainer || gifContainer.style.display === 'none') return;
    
    const gifItems = document.querySelectorAll('.gif-item');
    if (gifItems.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = gifItems.length;
    const timerElement = document.querySelector('.gif-timer');
    let timer = 5; // seconds
    
    // Start auto rotation
    const interval = setInterval(() => {
        timer--;
        timerElement.textContent = `${timer}s`;
        
        if (timer <= 0) {
            rotateCarousel();
            timer = 5; // Reset timer
        }
    }, 1000);
    
    function rotateCarousel() {
        // Hide all items
        gifItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        
        // Show next item
        currentIndex = (currentIndex + 1) % totalItems;
        const nextItem = gifItems[currentIndex];
        
        setTimeout(() => {
            nextItem.style.opacity = '1';
            nextItem.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT ITEMS =====
function initContactItems() {
    const contactIcons = document.querySelectorAll('.contact-icon[data-action="copy"]');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const textToCopy = this.dataset.copyText;
            
            // Use Clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showNotification('Copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        fallbackCopy(textToCopy);
                    });
            } else {
                fallbackCopy(textToCopy);
            }
        });
    });
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showNotification('Failed to copy text');
    }
    
    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #00ff00;
        color: #000;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            projectType: document.getElementById('project-type').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showNotification('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset form
        form.reset();
        
        // Log to console (for testing)
        console.log('Contact form submitted:', formData);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navContent.classList.toggle('active');
        });
    }
    
    // Sidebar toggle for mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navContent && navContent.classList.contains('active')) {
            if (!e.target.closest('.nav-content') && !e.target.closest('.mobile-menu-btn')) {
                navContent.classList.remove('active');
            }
        }
        
        if (sidebar && sidebar.classList.contains('active')) {
            if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to update active nav link
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call
    updateActiveLink();
}

// ===== CSS ANIMATIONS =====
// Add to style.css or inline
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
