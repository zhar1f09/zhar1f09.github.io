'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * sidebar toggle
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elemToggleFunc(sidebar);
  });
}

/**
 * page navigation
 */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    // Remove active class from all links
    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove("active");
    }
    
    // Add active class to clicked link
    this.classList.add("active");
    
    // Get page name from data attribute
    const pageName = this.textContent.toLowerCase();
    
    // Hide all pages
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    
    // Show selected page
    document.querySelector(`[data-page="${pageName}"]`).classList.add("active");
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      sidebar.classList.remove("active");
    }
  });
}

/**
 * portfolio filtering
 */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (filterBtns.length > 0 && filterItems.length > 0) {
  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
      // Remove active class from all filter buttons
      for (let j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove("active");
      }
      
      // Add active class to clicked button
      this.classList.add("active");
      
      // Get filter value
      const filterValue = this.textContent.toLowerCase();
      
      // Show/hide portfolio items
      for (let j = 0; j < filterItems.length; j++) {
        if (filterValue === "all" || filterItems[j].dataset.category === filterValue) {
          filterItems[j].classList.add("active");
        } else {
          filterItems[j].classList.remove("active");
        }
      }
    });
  }
}

/**
 * mobile filter select
 */
const selectBox = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");

if (selectBox) {
  selectBox.addEventListener("click", function () {
    this.parentElement.classList.toggle("active");
  });
  
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      // Update select value
      const selectValue = this.textContent;
      document.querySelector("[data-select-value]").textContent = selectValue;
      
      // Close select box
      selectBox.parentElement.classList.remove("active");
      
      // Trigger filter
      const filterValue = selectValue.toLowerCase();
      
      for (let j = 0; j < filterItems.length; j++) {
        if (filterValue === "all" || filterItems[j].dataset.category === filterValue) {
          filterItems[j].classList.add("active");
        } else {
          filterItems[j].classList.remove("active");
        }
      }
    });
  }
}

/**
 * testimonials modal
 */
const testimonialItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (testimonialItems.length > 0) {
  for (let i = 0; i < testimonialItems.length; i++) {
    testimonialItems[i].addEventListener("click", function () {
      // Get testimonial data
      const avatar = this.querySelector("[data-testimonials-avatar]").src;
      const name = this.querySelector("[data-testimonials-title]").textContent;
      const text = this.querySelector("[data-testimonials-text]").innerHTML;
      
      // Set modal content
      document.querySelector("[data-modal-img]").src = avatar;
      document.querySelector("[data-modal-title]").textContent = name;
      document.querySelector("[data-modal-text]").innerHTML = text;
      
      // Show modal
      modalContainer.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
}

/**
 * close modal
 */
function closeModal() {
  modalContainer.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (overlay) {
  overlay.addEventListener("click", closeModal);
}

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    closeModal();
  }
});

/**
 * contact form
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const originalText = formBtn.querySelector("span").textContent;
    formBtn.querySelector("span").textContent = "Sending...";
    formBtn.disabled = true;
    
    // Simulate API call (replace with actual form submission)
    setTimeout(() => {
      // Show success message
      alert(`Thank you ${data.fullname}! Your message has been sent. I'll get back to you soon at ${data.email}.`);
      
      // Reset form
      this.reset();
      
      // Reset button
      formBtn.querySelector("span").textContent = originalText;
      formBtn.disabled = false;
    }, 1500);
  });
}

/**
 * copy buttons for contact info
 */
const copyBtns = document.querySelectorAll(".copy-btn");

for (let i = 0; i < copyBtns.length; i++) {
  copyBtns[i].addEventListener("click", function () {
    const textToCopy = this.getAttribute("data-copy");
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show feedback
      const originalText = this.textContent;
      this.textContent = "Copied!";
      this.style.backgroundColor = "#00d68f";
      this.style.color = "#fff";
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 2000);
    });
  });
}

/**
 * initialize when page loads
 */
window.addEventListener("DOMContentLoaded", () => {
  // Initialize skill bars animation
  const skillBars = document.querySelectorAll(".skill-progress-fill");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = "0";
        
        setTimeout(() => {
          entry.target.style.width = width;
        }, 300);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
  
  // Open sidebar by default on desktop
  if (window.innerWidth >= 992) {
    sidebar.classList.add("active");
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnSidebarBtn = sidebarBtn && sidebarBtn.contains(e.target);
    
    if (!isClickInsideSidebar && !isClickOnSidebarBtn && window.innerWidth < 768) {
      sidebar.classList.remove("active");
    }
  });
});

/**
 * responsive adjustments
 */
window.addEventListener("resize", () => {
  // Keep sidebar open on desktop, close on mobile when resizing
  if (window.innerWidth >= 992) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }
});
