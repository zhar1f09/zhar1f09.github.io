// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const backToTopBtn = document.querySelector('.back-to-top');
const copyButtons = document.querySelectorAll('.copy-btn');
const discordSocial = document.getElementById('discordSocial');
const currentYearSpan = document.getElementById('currentYear');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Portfolio Filtering
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
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
        });
    });
}

// Copy to Clipboard Functionality
copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const textToCopy = btn.getAttribute('data-text') || 
                          btn.parentElement.querySelector('.method-value')?.textContent ||
                          'zhar1f09';
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Copied to clipboard!');
            btn.innerHTML = '<i class="fas fa-check"></i> Copied';
            btn.style.background = 'rgba(0, 255, 0, 0.1)';
            btn.style.borderColor = '#00FF00';
            btn.style.color = '#00FF00';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy. Please try again.');
        });
    });
});

// Discord Social Link
if (discordSocial) {
    discordSocial.addEventListener('click', (e) => {
        e.preventDefault();
        const discordUsername = 'zhar1f09';
        navigator.clipboard.writeText(discordUsername).then(() => {
            showNotification('Discord username copied!');
        });
    });
}

// Back to Top Button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated Counter for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '100' ? '%' : '+');
    }, 30);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Observe stats section for animation
    const statsSection = document.querySelector('.contact-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add scroll event listener for active nav links
    window.addEventListener('scroll', updateActiveNavLink);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Portfolio filtering with number keys (1-7)
    if (e.key >= '1' && e.key <= '7') {
        const index = parseInt(e.key) - 1;
        if (filterBtns[index]) {
            filterBtns[index].click();
        }
    }
});

// Performance Optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update anything that needs to run on scroll
            ticking = false;
        });
        ticking = true;
    }
});

// Image Lazy Loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .portfolio-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-method {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-content,
    .service-card,
    .portfolio-item,
    .contact-method {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .service-card:nth-child(2) { animation-delay: 0.1s; }
    .service-card:nth-child(3) { animation-delay: 0.2s; }
    .service-card:nth-child(4) { animation-delay: 0.3s; }
    .service-card:nth-child(5) { animation-delay: 0.4s; }
    .service-card:nth-child(6) { animation-delay: 0.5s; }
`;
document.head.appendChild(style);
