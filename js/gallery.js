// Gallery functionality - filters, search, lightbox

let artworks = [];
let filteredArtworks = [];

// Initialize gallery
async function initGallery() {
  artworks = await loadData('../data/artworks.json');
  filteredArtworks = [...artworks];
  renderGallery(artworks);
  setupFilters();
  setupSearch();
}

// Render gallery grid
function renderGallery(artworkList) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  if (artworkList.length === 0) {
    grid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 3rem;"><p>No artworks found matching your criteria.</p></div>';
    return;
  }
  
  grid.innerHTML = artworkList.map(artwork => createArtworkCard(artwork)).join('');
  
  // Attach click handlers
  document.querySelectorAll('.artwork-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.id));
  });
}

// Create artwork card HTML
function createArtworkCard(artwork) {
  return `
    <div class="card artwork-card" data-id="${artwork.id}">
      <img src="${artwork.image}" alt="${artwork.title}" class="card-image" loading="lazy" />
      <h4>${artwork.title} <span style="color: var(--color-text-light); font-weight: 400;">(${artwork.year})</span></h4>
      <p style="font-size: 0.9rem; color: var(--color-text-light); margin: 0.5rem 0;">${artwork.medium}</p>
      <p style="font-size: 0.9rem; margin: 1rem 0; line-height: 1.6;">${artwork.description.substring(0, 100)}...</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">View Details</button>
        <span style="font-size: 0.8rem; color: var(--color-text-light);">${artwork.museum.split(',')[0]}</span>
      </div>
    </div>
  `;
}

// Setup filter dropdowns
function setupFilters() {
  const periodFilter = document.getElementById('filter-period');
  const typeFilter = document.getElementById('filter-type');
  
  if (periodFilter) {
    periodFilter.addEventListener('change', applyFilters);
  }
  
  if (typeFilter) {
    typeFilter.addEventListener('change', applyFilters);
  }
}

// Setup search input
function setupSearch() {
  const searchInput = document.getElementById('search-art');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 300));
  }
}

// Apply all filters and search
function applyFilters() {
  const period = document.getElementById('filter-period')?.value || 'all';
  const type = document.getElementById('filter-type')?.value || 'all';
  const search = document.getElementById('search-art')?.value.toLowerCase().trim() || '';
  
  filteredArtworks = artworks.filter(artwork => {
    const matchesPeriod = period === 'all' || artwork.period === period;
    const matchesType = type === 'all' || artwork.type === type;
    const matchesSearch = !search || 
      artwork.title.toLowerCase().includes(search) ||
      artwork.description.toLowerCase().includes(search) ||
      artwork.year.toString().includes(search) ||
      artwork.museum.toLowerCase().includes(search);
    
    return matchesPeriod && matchesType && matchesSearch;
  });
  
  renderGallery(filteredArtworks);
}

// Open lightbox with artwork details
function openLightbox(artworkId) {
  const artwork = artworks.find(a => a.id === artworkId);
  if (!artwork) return;
  
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  
  if (!lightbox || !content) return;
  
  content.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
      <div>
        <img src="${artwork.image}" alt="${artwork.title}" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow-card);" />
      </div>
      <div>
        <h2 style="margin-bottom: 1rem;">${artwork.title}</h2>
        <p style="color: var(--color-text-light); margin-bottom: 1.5rem;">${artwork.year} • ${artwork.period.charAt(0).toUpperCase() + artwork.period.slice(1)} Period</p>
        <p style="line-height: 1.8; margin-bottom: 1.5rem;">${artwork.description}</p>
        <div style="background: var(--color-canvas); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;"><strong>Medium:</strong> ${artwork.medium}</p>
          <p style="margin: 0.5rem 0;"><strong>Museum:</strong> ${artwork.museum}</p>
          <p style="margin: 0.5rem 0;"><strong>Location:</strong> ${artwork.location}</p>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" onclick="downloadArtwork('${artwork.id}')">Download</button>
          <button class="btn btn-secondary" onclick="shareArtwork('${artwork.id}')">Share</button>
        </div>
      </div>
    </div>
  `;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Download artwork (client-side)
function downloadArtwork(artworkId) {
  const artwork = artworks.find(a => a.id === artworkId);
  if (!artwork) return;
  
  const link = document.createElement('a');
  link.href = artwork.image;
  link.download = `${artwork.id}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Share artwork
function shareArtwork(artworkId) {
  const artwork = artworks.find(a => a.id === artworkId);
  if (!artwork) return;
  
  if (navigator.share) {
    navigator.share({
      title: artwork.title,
      text: artwork.description,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    const text = `${artwork.title} (${artwork.year}) - ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

// Debounce function for search
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

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close lightbox on background click
document.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && e.target === lightbox) {
    closeLightbox();
  }
});

// Initialize gallery when DOM is ready
if (document.getElementById('gallery-grid')) {
  document.addEventListener('DOMContentLoaded', initGallery);
}


