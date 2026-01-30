// Custom JavaScript for Zhar1f09 Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPortfolio();
    initCopyButtons();
});

// ===== PORTFOLIO DATA =====
const portfolioItems = [
    // Modeling Projects
    {
        id: 1,
        title: "Fantasy Character",
        description: "Complete character model with custom animations",
        category: "modeling",
        image: "./assets/images/project-1.jpg"
    },
    {
        id: 2,
        title: "Magical Sword",
        description: "Weapon model with particle effects",
        category: "modeling",
        image: "./assets/images/project-2.png"
    },
    {
        id: 3,
        title: "Spaceship Model",
        description: "Sci-fi spaceship with detailed interior",
        category: "modeling",
        image: "./assets/images/project-3.jpg"
    },
    {
        id: 4,
        title: "Medieval Castle",
        description: "Large-scale castle environment",
        category: "building",
        image: "./assets/images/project-4.png"
    },
    {
        id: 5,
        title: "Cyberpunk City",
        description: "Futuristic city with neon lighting",
        category: "building",
        image: "./assets/images/project-5.png"
    },
    {
        id: 6,
        title: "Premium Clothing Set",
        description: "Custom Roblox avatar outfit",
        category: "clothing",
        image: "./assets/images/project-6.png"
    },
    {
        id: 7,
        title: "Game Thumbnail",
        description: "Promotional artwork for Roblox game",
        category: "graphics",
        image: "./assets/images/project-7.png"
    },
    {
        id: 8,
        title: "Discord Server",
        description: "Complete Discord server setup",
        category: "discord",
        image: "./assets/images/project-8.jpg"
    }
];

// ===== NAVIGATION =====
function initNavigation() {
    const navbarLinks = document.querySelectorAll('.navbar-link');
    const articles = document.querySelectorAll('article[data-page]');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navbarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target page
            const targetPage = this.getAttribute('data-nav-link');
            
            // Hide all articles
            articles.forEach(article => article.classList.remove('active'));
            
            // Show target article
            const targetArticle = document.querySelector(`article[data-page="${targetPage}"]`);
            if (targetArticle) {
                targetArticle.classList.add('active');
            }
        });
    });
}

// ===== PORTFOLIO SYSTEM =====
function initPortfolio() {
    renderPortfolioGrid();
    initPortfolioFilter();
}

function renderPortfolioGrid() {
    const gridContainer = document.querySelector('.portfolio-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        gridContainer.appendChild(portfolioItem);
    });
}

function createPortfolioItem(item) {
    const li = document.createElement('li');
    li.className = 'project-item active';
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', item.category);
    
    li.innerHTML = `
        <a href="#" class="portfolio-link">
            <figure class="project-img">
                <div class="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="portfolio-category">${item.category}</span>
            </figure>
            <div class="portfolio-info">
                <h4 class="project-title">${item.title}</h4>
                <p class="project-category">${item.description}</p>
            </div>
        </a>
    `;
    
    return li;
}

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-list button');
    const portfolioItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('active'), 10);
                } else {
                    item.classList.remove('active');
                    setTimeout(() => item.style.display = 'none', 250);
                }
            });
        });
    });
}

// ===== COPY BUTTONS =====
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showNotification('Discord username copied!');
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
        showNotification('Discord username copied!');
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showNotification('Failed to copy text');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--orange-yellow-crayola);
        color: var(--smoky-black);
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: var(--shadow-2);
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
