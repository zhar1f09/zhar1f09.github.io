// Professional Portfolio - Modern Design with Simplified Rotation System

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
    
    // Calculate which 4 items to show
    const itemsToShow = [];
    for (let i = 0; i < 4; i++) {
        const index = (currentRotationIndex + i) % filteredItems.length;
        itemsToShow.push(filteredItems[index]);
    }
    
    // Render the 4 items
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
            
            // Restart rotation
            stopRotation();
            startRotation();
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

// Manual rotation controls
function initRotationControls() {
    const portfolioSection = document.querySelector('#portfolio .section-content');
    
    // Create rotation controls
    const controlsHTML = `
        <div class="rotation-controls">
            <div class="rotation-buttons">
                <button class="rotation-btn prev-btn">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <button class="rotation-btn next-btn">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
    
    // Insert after portfolio grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.insertAdjacentHTML('afterend', controlsHTML);
    
    // Add event listeners
    document.querySelector('.prev-btn').addEventListener('click', () => {
        let filteredItems = portfolioItems;
        if (currentFilter !== 'all') {
            filteredItems = portfolioItems.filter(item => item.category === currentFilter);
        }
        
        if (filteredItems.length > 4) {
            currentRotationIndex = (currentRotationIndex - 4 + filteredItems.length) % filteredItems.length;
            renderPortfolioGrid();
        }
    });
    
    document.querySelector('.next-btn').addEventListener('click', () => {
        rotatePortfolio();
    });
}

// ===== REST OF THE JAVASCRIPT (Keep all other functions from previous version) =====
// [Keep all other functions: initNavigation, initContactItems, initContactForm, 
//  initMobileMenu, initScrollSpy, and helper functions]

// Initialize rotation controls after portfolio is ready
setTimeout(() => {
    initRotationControls();
}, 100);
