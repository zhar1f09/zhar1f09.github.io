'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */
for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */
for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

/**
 * sidebar toggle
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elemToggleFunc(sidebar);
});

/**
 * filter functionality
 */
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].classList.remove("active");
    filterItems[i].classList.add("hide");

    if (filterItems[i].dataset.filter === this.dataset.filterBtn || this.dataset.filterBtn === "all") {
      filterItems[i].classList.remove("hide");
      filterItems[i].classList.add("active");
    }
  }
}

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", filter);
}

/**
 * contact form
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// enable form button when all inputs are filled
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Show success message
  alert(`Thank you ${data.fullname}! Your message has been sent. I'll get back to you at ${data.email} soon.`);
  
  // Reset form
  this.reset();
  formBtn.setAttribute("disabled", "");
});

/**
 * page navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-link');
  const articles = document.querySelectorAll('article[data-page]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const page = this.getAttribute('data-nav-link').toLowerCase();
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding article
      articles.forEach(article => {
        article.classList.remove('active');
        if (article.getAttribute('data-page') === page) {
          article.classList.add('active');
        }
      });
    });
  });
});
