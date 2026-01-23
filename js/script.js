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
            const gifItem = createGIFItem
