// DOM Elements
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const selectBox = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const testimonialItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const copyBtns = document.querySelectorAll(".copy-btn");

// Sidebar Toggle
sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Page Navigation
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    navLinks.forEach(item => item.classList.remove("active"));
    // Add active class to clicked link
    this.classList.add("active");
    
    // Get page name from data attribute
    const pageName = this.textContent.toLowerCase();
    
    // Hide all pages
    pages.forEach(page => page.classList.remove("active"));
    
    // Show selected page
    document.querySelector(`[data-page="${pageName}"]`).classList.add("active");
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      sidebar.classList.remove("active");
    }
  });
});

// Portfolio Filtering
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    // Remove active class from all filter buttons
    filterBtns.forEach(item => item.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");
    
    // Get filter value
    const filterValue = this.textContent.toLowerCase();
    
    // Show/hide portfolio items
    filterItems.forEach(item => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
});

// Mobile Filter Select
selectBox.addEventListener("click", function () {
  this.parentElement.classList.toggle("active");
});

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    // Update select value
    const selectValue = this.textContent;
    document.querySelector("[data-selecct-value]").textContent = selectValue;
    
    // Close select box
    selectBox.parentElement.classList.remove("active");
    
    // Trigger filter
    const filterValue = selectValue.toLowerCase();
    
    filterItems.forEach(item => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
});

// Testimonials Modal
testimonialItems.forEach(item => {
  item.addEventListener("click", function () {
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
});

// Close Modal
function closeModal() {
  modalContainer.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    closeModal();
  }
});

// Contact Form
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
    alert(`Thank you ${data.fullname}! Your message has been sent successfully. I'll get back to you soon at ${data.email}.`);
    
    // Reset form
    this.reset();
    
    // Reset button
    formBtn.querySelector("span").textContent = originalText;
    formBtn.disabled = false;
  }, 1500);
});

// Form validation on blur
formInputs.forEach(input => {
  input.addEventListener("blur", function () {
    if (!this.value.trim()) {
      this.style.borderColor = "#ff4757";
    } else {
      this.style.borderColor = "";
    }
  });
});

// Copy buttons for contact info
copyBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const textToCopy = this.dataset.copy;
    
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
});

// Initialize skill bars animation
function animateSkillBars() {
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
}

// Initialize when page loads
window.addEventListener("DOMContentLoaded", () => {
  animateSkillBars();
  
  // Set current year in copyright (if needed)
  const yearElement = document.querySelector(".copyright");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2023", currentYear);
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    if (href === "#" || href === "") {
      e.preventDefault();
      return;
    }
    
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      e.preventDefault();
      
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth"
      });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnSidebarBtn = sidebarBtn.contains(e.target);
  
  if (!isClickInsideSidebar && !isClickOnSidebarBtn && window.innerWidth < 768) {
    sidebar.classList.remove("active");
  }
});

// Add Roblox icon to FontAwesome
const robloxIconScript = document.createElement("script");
robloxIconScript.src = "https://kit.fontawesome.com/7b5d9be8c7.js";
robloxIconScript.crossOrigin = "anonymous";
document.head.appendChild(robloxIconScript);
