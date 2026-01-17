// DOM Elements
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const selectBox = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');

// Sidebar toggle functionality
if (sidebarBtn) {
  sidebarBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
}

// Page navigation
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove active class from all links
    navLinks.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Get page name
    const pageName = this.textContent.toLowerCase().trim();
    
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (targetPage) {
      targetPage.classList.add('active');
    }
    
    // Close sidebar on mobile after clicking
    if (window.innerWidth <= 1200) {
      sidebar.classList.remove('active');
    }
  });
});

// Portfolio filtering
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.textContent.toLowerCase().trim();
      
      // Filter items
      filterItems.forEach(item => {
        if (filterValue === 'all') {
          item.classList.add('active');
        } else {
          if (item.getAttribute('data-category') === filterValue) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    });
  });
}

// Mobile select dropdown
if (selectBox) {
  selectBox.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
  
  selectItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedValue = this.textContent.trim();
      selectValue.textContent = selectedValue;
      
      // Filter items based on selection
      const filterValue = selectedValue.toLowerCase();
      
      filterItems.forEach(filterItem => {
        if (filterValue === 'all') {
          filterItem.classList.add('active');
        } else {
          if (filterItem.getAttribute('data-category') === filterValue) {
            filterItem.classList.add('active');
          } else {
            filterItem.classList.remove('active');
          }
        }
      });
      
      // Close dropdown
      selectBox.parentElement.classList.remove('active');
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
  
  const sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';
  
  document.body.appendChild(mobileMenuBtn);
  document.body.appendChild(sidebarOverlay);
  
  mobileMenuBtn.addEventListener('click', function() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  });
  
  sidebarOverlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    this.classList.remove('active');
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 1200 && 
        !sidebar.contains(event.target) && 
        !mobileMenuBtn.contains(event.target) &&
        sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    }
  });
}

// Testimonials functionality
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';

if (testimonialsItems.length > 0) {
  testimonialsItems.forEach(item => {
    item.addEventListener('click', function() {
      const avatar = this.querySelector('[data-testimonials-avatar]').src;
      const title = this.querySelector('[data-testimonials-title]').textContent;
      const text = this.querySelector('[data-testimonials-text]').innerHTML;
      
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `
        <div class="modal-close-overlay" data-modal-close></div>
        <div class="modal-content">
          <button class="modal-close-btn" data-modal-close>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <div class="modal-img-wrapper">
            <figure class="modal-avatar-box">
              <img src="${avatar}" alt="${title}" width="80">
            </figure>
          </div>
          <div class="modal-content-box">
            <h4 class="h3 modal-title">${title}</h4>
            <div class="modal-text">${text}</div>
          </div>
        </div>
      `;
      
      modalContainer.appendChild(modal);
      document.body.appendChild(modalContainer);
      document.body.classList.add('modal-active');
      
      // Add close functionality
      const closeBtns = modal.querySelectorAll('[data-modal-close]');
      closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          modal.classList.remove('active');
          setTimeout(() => {
            modal.remove();
            document.body.classList.remove('modal-active');
          }, 300);
        });
      });
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu if needed
  if (window.innerWidth <= 1200) {
    initMobileMenu();
  }
  
  // Set current year in footer if exists
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Add skill animation on page load
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
});

// Window resize handler
window.addEventListener('resize', function() {
  if (window.innerWidth > 1200) {
    sidebar.classList.remove('active');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('active');
  } else {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileBtn) {
      initMobileMenu();
    }
  }
});

// Discord/Roblox status checker (optional)
function checkPlatformStatus() {
  // This is a placeholder for actual API calls
  console.log('Platform status checker initialized');
  
  // You can add actual API calls here to check:
  // - Discord user status
  // - Roblox user online status
  // - Server member counts, etc.
}

// Copy Discord username to clipboard
document.addEventListener('click', function(e) {
  if (e.target.closest('.contact-link') && e.target.closest('.contact-link').textContent.includes('#')) {
    const discordUsername = e.target.closest('.contact-link').textContent;
    navigator.clipboard.writeText(discordUsername).then(() => {
      // Show copied notification
      const notification = document.createElement('div');
      notification.className = 'copy-notification';
      notification.textContent = 'Discord username copied to clipboard!';
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius-sm);
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    });
    e.preventDefault();
  }
});

// Add animation styles
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
  
  .copy-notification {
    font-size: 1.4rem;
    box-shadow: var(--shadow-md);
  }
`;
document.head.appendChild(style);
