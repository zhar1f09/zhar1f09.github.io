// Professional Portfolio - Modern Design with Rotation System

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
    // Modeling Projects
    {
        id: 1,
        title: "Fantasy Character",
        description: "Complete character model with custom animations and rigging",
        category: "modeling",
        image: "images/modeling/model1.png"
    },
    {
        id: 2,
        title: "Magical Sword",
        description: "Weapon model with particle effects and animations",
        category: "modeling",
        image: "images/modeling/model2.png"
    },
    {
        id: 3,
        title: "Spaceship Model",
        description: "Sci-fi spaceship with detailed interior",
        category: "modeling",
        image: "images/modeling/model3.png"
    },
    {
        id: 4,
        title: "Monster Creature",
        description: "Fantasy creature with custom animations",
        category: "modeling",
        image: "images/modeling/model4.png"
    },
    {
        id: 5,
        title: "Robot Assistant",
        description: "Friendly robot companion with interactive features",
        category: "modeling",
        image: "images/modeling/model5.png"
    },
    
    // Building Projects
    {
        id: 6,
        title: "Medieval Castle",
        description: "Large-scale castle environment with detailed interiors",
        category: "building",
        image: "images/building/build1.png"
    },
    {
        id: 7,
        title: "Cyberpunk City",
        description: "Futuristic city environment with neon lighting",
        category: "building",
        image: "images/building/build2.png"
    },
    {
        id: 8,
        title: "Modern House",
        description: "Contemporary residential building with interior design",
        category: "building",
        image: "images/building/build3.png"
    },
    {
        id: 9,
        title: "Fantasy Village",
        description: "Magical village with custom terrain and structures",
        category: "building",
        image: "images/building/build4.png"
    },
    
    // Clothing Projects
    {
        id: 10,
        title: "Premium Clothing Set",
        description: "Custom Roblox avatar outfit with detailed textures",
        category: "clothing",
        image: "images/clothing/cloth1.png"
    },
    {
        id: 11,
        title: "Avatar Bundle",
        description: "Complete Roblox avatar with matching accessories",
        category: "clothing",
        image: "images/clothing/cloth2.png"
    },
    {
        id: 12,
        title: "Limited Edition Outfit",
        description: "Exclusive clothing design for special events",
        category: "clothing",
        image: "images/clothing/cloth3.png"
    },
    
    // Graphics Projects
    {
        id: 13,
        title: "Game Thumbnail",
        description: "Promotional artwork for popular Roblox game",
        category: "graphics",
        image: "images/graphics/graphic1.png"
    },
    {
        id: 14,
        title: "Logo Design",
        description: "Brand identity for Roblox development group",
        category: "graphics",
        image: "images/graphics/graphic2.png"
    },
    {
        id: 15,
        title: "UI Design",
        description: "Complete user interface for game menus",
        category: "graphics",
        image: "images/graphics/graphic3.png"
    },
    
    // Discord Projects
    {
        id: 16,
        title: "Discord Server Setup",
        description: "Complete Discord server with custom bots and channels",
        category: "discord",
        image: "images/discord/discord1.png"
    },
    {
        id: 17,
        title: "Custom Bot Development",
        description: "Discord bot with moderation and entertainment features",
        category: "discord",
        image: "images/discord/discord2.png"
    }
];

// ===== PORTFOLIO ROTATION SYSTEM =====
let currentRotationIndex = 0;
let currentFilter = 'all';
let rotationInterval;

function initPortfolio() {
    renderPortfolioGrid();
    initPortfolioFilter();
    startRotation();
}

// Render exactly 4 portfolio items at a time
function renderPortfolioGrid() {
    const gridContainer = document.querySelector('.portfolio-grid');
    gridContainer.innerHTML = '';
    
    // Get filtered items based on current filter
    let filteredItems = portfolioItems;
    if (currentFilter !== 'all') {
        filteredItems = portfolioItems.filter(item => item.category === currentFilter);
    }
    
    // If no items match the filter, show message
    if (filteredItems.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-projects-message';
        message.innerHTML = `
            <i class="fas fa-box-open"></i>
            <h3>No projects in this category yet</h3>
            <p>Check back soon for new additions!</p>
        `;
        gridContainer.appendChild(message);
        return;
    }
    
    // Calculate which 4 items to show (handle fewer than 4 items)
    const itemsToShow = [];
    const totalItems = filteredItems.length;
    
    // If we have 4 or fewer items, show them all
    if (totalItems <= 4) {
        itemsToShow.push(...filteredItems);
    } else {
        // Get 4 items starting from currentRotationIndex
        for (let i = 0; i < 4; i++) {
            const index = (currentRotationIndex + i) % totalItems;
            itemsToShow.push(filteredItems[index]);
        }
    }
    
    // Render the items
    itemsToShow.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        gridContainer.appendChild(portfolioItem);
    });
}

// Create portfolio item element
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.dataset.category = item.category;
    
    div.innerHTML = `
        <div class="portfolio-image">
            <span class="portfolio-category">${item.category.toUpperCase()}</span>
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/444444?text=Project+Image'">
        </div>
        <div class="portfolio-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Initialize portfolio filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Reset rotation index
            currentRotationIndex = 0;
            currentFilter = this.dataset.filter;
            
            // Re-render grid with new filter
            renderPortfolioGrid();
            
            // Restart rotation only if category has more than 4 items
            stopRotation();
            
            // Check if filtered category has more than 4 items
            let filteredItems = portfolioItems;
            if (currentFilter !== 'all') {
                filteredItems = portfolioItems.filter(item => item.category === currentFilter);
            }
            
            if (filteredItems.length > 4) {
                startRotation();
            }
        });
    });
}

// Start automatic rotation
function startRotation() {
    // Clear any existing interval
    stopRotation();
    
    // Auto rotate every 5 seconds
    rotationInterval = setInterval(() => {
        rotatePortfolio();
    }, 5000);
}

// Stop rotation
function stopRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
}

// Rotate to next set of projects
function rotatePortfolio() {
    // Get filtered items
    let filteredItems = portfolioItems;
    if (currentFilter !== 'all') {
        filteredItems = portfolioItems.filter(item => item.category === currentFilter);
    }
    
    // Only rotate if we have more than 4 items
    if (filteredItems.length > 4) {
        currentRotationIndex = (currentRotationIndex + 4) % filteredItems.length;
        renderPortfolioGrid();
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
                const offsetTop = targetSection.offsetTop - 70;
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

function showNotification(message) {
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
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            projectType: document.getElementById('project-type').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        showNotification('Message sent successfully! I\'ll get back to you soon.');
        form.reset();
        console.log('Contact form submitted:', formData);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navContent.classList.toggle('active');
        });
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
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
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Add CSS animations
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
