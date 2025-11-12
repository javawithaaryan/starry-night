// Main JavaScript - Navigation and shared functionality

// Load data from JSON files
async function loadData(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
    return [];
  }
}

// Initialize navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.navbar-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.fontWeight = '700';
      link.style.color = 'var(--color-passion)';
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  
  // Add fade-in animation to sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.section, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadData, initNavigation };
}


