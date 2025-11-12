// Dynamic Gallery - Loads all images from folder with stories

let allImages = [];
let filteredImages = [];
let imageStories = {};
let currentView = 'masonry';
let currentSort = 'name';
let currentImageIndex = 0;

// Image file list - all JPG files in the root directory
const imageFiles = [
  '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
  '10.jpg', '11.jpg', '12.jpg', '12 (1).jpg', '13.jpg', '14.jpg', '15.jpg',
  '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg',
  '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg',
  '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg',
  'L1.jpg', 'L2.jpg', 'L3.jpg', 'L4.jpg', 'L5.jpg', 'L6.jpg', 'L7.jpg',
  'L8.jpg', 'L9.jpg', 'L10.jpg', 'L11.jpg', 'L12.jpg', 'L13.jpg', 'L14.jpg', 'L15.jpg',
  'van1.jpg', 'van2.jpg', 'van3.jpg', 'van4.jpg', 'van5.jpg',
  'night.jpg', 'wave2.jpg', '64_374504_lowres.jpg'
];

// Initialize gallery
async function initDynamicGallery() {
  // Load stories data
  try {
    const storiesData = await loadData('../data/image-stories.json');
    if (storiesData && storiesData.stories) {
      storiesData.stories.forEach(story => {
        imageStories[story.filename] = story;
      });
    }
  } catch (error) {
    console.log('Could not load stories data, continuing without stories');
  }
  
  // Create image objects from file list
  allImages = imageFiles.map((filename, index) => {
    // Check if we have story data for this image
    const story = imageStories[filename];
    const name = story ? story.title : extractImageName(filename);
    const period = story ? story.period : getPeriodFromFilename(filename);
    
    return {
      id: `img-${index}`,
      filename: filename,
      name: name,
      path: filename,
      index: index,
      story: story || null,
      period: period
    };
  });

  filteredImages = [...allImages];
  updateImageCount();
  renderGallery();
  setupEventListeners();
}

// Get period from filename
function getPeriodFromFilename(filename) {
  if (filename.startsWith('L')) return 'Letters & Sketches';
  if (filename.startsWith('van')) return 'Various Periods';
  if (filename === 'night.jpg') return 'Saint-Rémy (1889)';
  if (filename === 'wave2.jpg') return 'Saint-Rémy (1889)';
  
  const num = parseInt(filename.replace(/[^0-9]/g, ''));
  if (num >= 2 && num <= 6) return 'Early Period';
  if (num >= 7 && num <= 11) return 'Paris Period';
  if (num >= 12 && num <= 16) return 'Arles Period';
  if (num >= 17 && num <= 21) return 'Saint-Rémy Period';
  if (num >= 22 && num <= 35) return 'Auvers Period';
  
  return 'Various Periods';
}

// Extract readable name from filename
function extractImageName(filename) {
  // Remove extension
  let name = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '');
  
  // Handle numbered files
  if (/^\d+$/.test(name)) {
    return `Artwork ${name}`;
  }
  
  // Handle L-prefixed files
  if (/^L\d+$/i.test(name)) {
    const num = name.replace(/^L/i, '');
    return `Letter ${num}`;
  }
  
  // Handle van-prefixed files
  if (/^van\d+$/i.test(name)) {
    const num = name.replace(/^van/i, '');
    return `Van Gogh ${num}`;
  }
  
  // Handle special names
  const specialNames = {
    'night': 'Starry Night',
    'wave2': 'Wave Study',
    '64_374504_lowres': 'Artwork Study'
  };
  
  if (specialNames[name.toLowerCase()]) {
    return specialNames[name.toLowerCase()];
  }
  
  // Capitalize and format
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim() || 'Untitled Artwork';
}

// Render gallery
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  // Update grid class based on view mode
  grid.className = `gallery-grid gallery-grid-${currentView}`;
  
  if (filteredImages.length === 0) {
    grid.innerHTML = `
      <div class="text-center" style="grid-column: 1/-1; padding: 4rem;">
        <p style="font-size: 1.2rem; color: var(--color-text-light);">
          No images found matching your search.
        </p>
      </div>
    `;
    return;
  }
  
  // Create image cards
  grid.innerHTML = filteredImages.map((img, index) => createImageCard(img, index)).join('');
  
  // Attach click handlers
  document.querySelectorAll('.artwork-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      const imageIndex = filteredImages.findIndex(img => img.id === card.dataset.id);
      openLightbox(imageIndex);
    });
  });
  
  // Lazy load images
  lazyLoadImages();
}

// Create image card HTML
function createImageCard(img, index) {
  const hasStory = img.story !== null;
  const storyBadge = hasStory ? '<span class="story-badge">📖 Story</span>' : '';
  
  return `
    <div class="artwork-card ${hasStory ? 'has-story' : ''}" data-id="${img.id}" data-index="${index}">
      <div class="artwork-card-image-wrapper">
        <img 
          src="${img.path}" 
          alt="${img.name}" 
          class="artwork-card-image" 
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23F9E79F%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%231E3A8A%22 font-size=%2224%22%3EImage Not Found%3C/text%3E%3C/svg%3E'"
        >
        ${storyBadge}
      </div>
      <div class="artwork-card-info">
        <div class="artwork-card-title">${img.name}</div>
        <div class="artwork-card-period">${img.period}</div>
        ${hasStory && img.story.excerpt ? `
          <div class="artwork-card-excerpt">"${img.story.excerpt}"</div>
        ` : ''}
        <div class="artwork-card-filename">${img.filename}</div>
      </div>
    </div>
  `;
}

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('.artwork-card-image[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Setup event listeners
function setupEventListeners() {
  // View filter
  const viewFilter = document.getElementById('filter-view');
  if (viewFilter) {
    viewFilter.addEventListener('change', (e) => {
      currentView = e.target.value;
      renderGallery();
    });
  }
  
  // Sort filter
  const sortFilter = document.getElementById('filter-sort');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applySort();
      renderGallery();
    });
  }
  
  // Search
  const searchInput = document.getElementById('search-gallery');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      applyFilters();
    }, 300));
  }
  
  // Fullscreen toggle
  const fullscreenBtn = document.getElementById('toggle-fullscreen');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }
  
  // Lightbox navigation
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'Escape') closeLightbox();
    }
  });
}

// Apply filters
function applyFilters() {
  const search = document.getElementById('search-gallery')?.value.toLowerCase().trim() || '';
  
  if (!search) {
    filteredImages = [...allImages];
  } else {
    filteredImages = allImages.filter(img => 
      img.name.toLowerCase().includes(search) ||
      img.filename.toLowerCase().includes(search)
    );
  }
  
  applySort();
  updateImageCount();
  renderGallery();
}

// Apply sorting
function applySort() {
  if (currentSort === 'name') {
    filteredImages.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'random') {
    filteredImages = [...filteredImages].sort(() => Math.random() - 0.5);
  }
}

// Update image count
function updateImageCount() {
  const countEl = document.getElementById('image-count');
  if (countEl) {
    const total = allImages.length;
    const filtered = filteredImages.length;
    countEl.textContent = filtered === total 
      ? `${total} Artworks` 
      : `Showing ${filtered} of ${total} Artworks`;
  }
}

// Open lightbox
function openLightbox(index) {
  if (index < 0 || index >= filteredImages.length) return;
  
  currentImageIndex = index;
  const img = filteredImages[index];
  const lightbox = document.getElementById('lightbox');
  const body = document.getElementById('lightbox-body');
  
  if (!lightbox || !body) return;
  
  // Build story content if available
  let storyContent = '';
  if (img.story) {
    storyContent = `
      <div class="lightbox-story">
        <div class="story-period">${img.story.period}</div>
        <div class="story-quote">"${img.story.quote}"</div>
        <div class="story-text">${img.story.story}</div>
        ${img.story.significance ? `
          <div class="story-significance">
            <strong>Significance:</strong> ${img.story.significance}
          </div>
        ` : ''}
      </div>
    `;
  } else {
    storyContent = `
      <div class="lightbox-story">
        <div class="story-period">${img.period}</div>
        <p style="line-height: 1.8; color: var(--color-text-light);">
          This artwork is part of Van Gogh's extensive collection. Each piece tells a story of his artistic journey, 
          from the dark, somber works of his early period to the vibrant, expressive masterpieces of his later years.
        </p>
      </div>
    `;
  }
  
  body.innerHTML = `
    <div class="lightbox-image-container">
      <img src="${img.path}" alt="${img.name}" class="lightbox-image">
    </div>
    <div class="lightbox-info">
      <h2 class="lightbox-title">${img.name}</h2>
      <p style="color: var(--color-text-light); margin-top: 0.5rem; font-size: 0.9rem;">${img.filename}</p>
      ${storyContent}
      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid var(--color-border); text-align: center; color: var(--color-text-light); font-size: 0.9rem;">
        Image ${index + 1} of ${filteredImages.length}
      </div>
    </div>
  `;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update navigation buttons
  updateLightboxNav();
}

// Navigate lightbox
function navigateLightbox(direction) {
  const newIndex = currentImageIndex + direction;
  
  if (newIndex < 0) {
    openLightbox(filteredImages.length - 1);
  } else if (newIndex >= filteredImages.length) {
    openLightbox(0);
  } else {
    openLightbox(newIndex);
  }
}

// Update lightbox navigation buttons
function updateLightboxNav() {
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (prevBtn) {
    prevBtn.style.opacity = filteredImages.length > 1 ? '1' : '0.5';
  }
  if (nextBtn) {
    nextBtn.style.opacity = filteredImages.length > 1 ? '1' : '0.5';
  }
}

// Close lightbox (global function)
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Make function globally accessible
window.closeLightbox = closeLightbox;

// Toggle fullscreen
function toggleFullscreen() {
  const section = document.querySelector('.gallery-section');
  if (!section) return;
  
  if (section.classList.contains('gallery-fullscreen')) {
    section.classList.remove('gallery-fullscreen');
    document.getElementById('toggle-fullscreen').textContent = 'Fullscreen';
  } else {
    section.classList.add('gallery-fullscreen');
    document.getElementById('toggle-fullscreen').textContent = 'Exit Fullscreen';
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && e.target === lightbox) {
    closeLightbox();
  }
});

// Initialize when DOM is ready
if (document.getElementById('gallery-grid')) {
  document.addEventListener('DOMContentLoaded', initDynamicGallery);
}

