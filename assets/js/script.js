// ===== DOM ELEMENTS =====
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const selectBox = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const copyButtons = document.querySelectorAll('.copy-btn');
const discordLinks = document.querySelectorAll('.copy-discord');

// ===== PAGE NAVIGATION =====
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
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ===== PORTFOLIO FILTERING =====
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
          if (item.getAttribute('data-category').toLowerCase() === filterValue) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    });
  });
}

// ===== MOBILE SELECT DROPDOWN =====
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
          if (filterItem.getAttribute('data-category').toLowerCase() === filterValue) {
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

// ===== TESTIMONIALS MODAL =====
if (testimonialsItems.length > 0) {
  testimonialsItems.forEach(item => {
    item.addEventListener('click', function() {
      const avatar = this.querySelector('[data-testimonials-avatar]').src;
      const title = this.querySelector('[data-testimonials-title]').textContent;
      const text = this.querySelector('[data-testimonials-text]').innerHTML;
      
      // Create modal
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modal-container';
      
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
      document.body.style.overflow = 'hidden';
      
      // Add close functionality
      const closeBtns = modal.querySelectorAll('[data-modal-close]');
      closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          modal.classList.remove('active');
          setTimeout(() => {
            modalContainer.remove();
            document.body.style.overflow = '';
          }, 300);
        });
      });
    });
  });
}

// ===== COPY TO CLIPBOARD =====
copyButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const textToCopy = this.getAttribute('data-copy') || 'zhar1f09';
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      showNotification('Copied to clipboard!');
      
      // Visual feedback
      const originalHTML = this.innerHTML;
      this.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Copied!</span>';
      this.style.background = 'linear-gradient(135deg, #00AA00, #008800)';
      
      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.background = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showNotification('Failed to copy. Please try again.');
    });
  });
});

// Discord links copy functionality
discordLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const username = this.textContent.trim();
    
    navigator.clipboard.writeText(username).then(() => {
      showNotification('Discord username copied!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showNotification('Failed to copy username');
    });
  });
});

// ===== NOTIFICATION SYSTEM =====
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
      notification.remove();
    }, 300);
  }, 3000);
}

// ===== SMOOTH SCROLLING =====
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

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #8B0000, #B22222);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 10000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    
    .modal {
      background: var(--secondary-dark);
      border-radius: 10px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      position: relative;
      border: 1px solid var(--accent-red);
    }
    
    .modal-close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: var(--text-primary);
      font-size: 2rem;
      cursor: pointer;
    }
    
    .modal-avatar-box {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 20px;
    }
    
    .modal-title {
      text-align: center;
      margin-bottom: 15px;
    }
    
    .modal-text {
      text-align: center;
      color: var(--text-secondary);
    }
  `;
  document.head.appendChild(style);
  
  // Initialize skill animations
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', function() {
  // Handle responsive behavior
  if (window.innerWidth <= 768) {
    const filterList = document.querySelector('.filter-list');
    const selectBox = document.querySelector('.filter-select-box');
    
    if (filterList && selectBox) {
      filterList.style.display = 'none';
      selectBox.style.display = 'block';
    }
  } else {
    const filterList = document.querySelector('.filter-list');
    const selectBox = document.querySelector('.filter-select-box');
    
    if (filterList && selectBox) {
      filterList.style.display = 'flex';
      selectBox.style.display = 'none';
    }
  }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  // Close modal with Escape key
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal.active');
    if (modal) {
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.click();
    }
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
