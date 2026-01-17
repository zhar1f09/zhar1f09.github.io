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
const loadMoreBtn = document.getElementById('loadMoreBtn');
const copyDiscordBtns = document.querySelectorAll('.copy-discord, .copy-discord-btn');

// Initialize mobile menu
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
  
  // Close sidebar when clicking a nav link on mobile
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 1200) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    });
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
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Sidebar toggle
if (sidebarBtn) {
  sidebarBtn.addEventListener('click', function() {
    const isExpanded = sidebar.classList.contains('active');
    
    if (isExpanded) {
      sidebar.classList.remove('active');
      this.querySelector('span').textContent = 'Show Contacts';
      this.querySelector('ion-icon').name = 'chevron-down';
    } else {
      sidebar.classList.add('active');
      this.querySelector('span').textContent = 'Hide Contacts';
      this.querySelector('ion-icon').name = 'chevron-up';
    }
  });
}

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
      let visibleCount = 0;
      filterItems.forEach(item => {
        if (filterValue === 'all') {
          item.classList.add('active');
          visibleCount++;
        } else {
          if (item.getAttribute('data-category') === filterValue) {
            item.classList.add('active');
            visibleCount++;
          } else {
            item.classList.remove('active');
          }
        }
      });
      
      // Show/hide load more button based on visible items
      if (visibleCount > 6) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
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
      
      let visibleCount = 0;
      filterItems.forEach(filterItem => {
        if (filterValue === 'all') {
          filterItem.classList.add('active');
          visibleCount++;
        } else {
          if (filterItem.getAttribute('data-category') === filterValue) {
            filterItem.classList.add('active');
            visibleCount++;
          } else {
            filterItem.classList.remove('active');
          }
        }
      });
      
      // Close dropdown
      selectBox.parentElement.classList.remove('active');
      
      // Show/hide load more button
      if (visibleCount > 6) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    });
  });
}

// Load more projects functionality
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function() {
    // Get currently visible category
    const activeFilter = document.querySelector('[data-filter-btn].active');
    const category = activeFilter ? activeFilter.textContent.toLowerCase().trim() : 'all';
    
    // Show all projects in current category
    filterItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      }
    });
    
    // Hide the load more button
    this.style.display = 'none';
  });
}

// Copy Discord username functionality
copyDiscordBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const username = this.getAttribute('data-username') || this.textContent.trim();
    
    navigator.clipboard.writeText(username).then(() => {
      // Show notification
      showNotification('Discord username copied to clipboard!');
      
      // Visual feedback
      this.style.color = 'var(--primary-red)';
      setTimeout(() => {
        this.style.color = '';
      }, 1000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showNotification('Failed to copy. Please try again.');
    });
  });
});

// Show notification function
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector('.copy-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize skill animations
function initSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    // Animate on scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(bar.parentElement);
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu if needed
  if (window.innerWidth <= 1200) {
    initMobileMenu();
  }
  
  // Initialize skill animations
  initSkillAnimations();
  
  // Show only first 6 projects initially
  let visibleCount = 0;
  filterItems.forEach((item, index) => {
    if (index < 6) {
      item.style.display = 'block';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });
  
  // Show load more button if there are more than 6 projects
  if (filterItems.length > 6) {
    loadMoreBtn.style.display = 'block';
  }
  
  // Add hover effect to service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Window resize handler
window.addEventListener('resize', function() {
  if (window.innerWidth <= 1200) {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileBtn) {
      initMobileMenu();
    }
  } else {
    // Remove mobile menu if exists
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (mobileBtn) mobileBtn.remove();
    if (overlay) overlay.remove();
    
    // Ensure sidebar is visible on desktop
    sidebar.classList.remove('active');
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // Close sidebar with Escape key
  if (e.key === 'Escape') {
    sidebar.classList.remove('active');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('active');
  }
  
  // Navigate pages with arrow keys
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const activeNav = document.querySelector('.navbar-link.active');
    const navItems = Array.from(navLinks);
    const currentIndex = navItems.indexOf(activeNav);
    
    let nextIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % navItems.length;
    } else {
      nextIndex = (currentIndex - 1 + navItems.length) % navItems.length;
    }
    
    navItems[nextIndex].click();
  }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .project-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-item {
    transition: all 0.3s ease;
  }
  
  .skill-progress-fill {
    transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .platform-card:hover {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
