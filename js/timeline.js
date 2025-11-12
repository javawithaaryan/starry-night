// Timeline functionality - interactive scroll timeline

let timelineEvents = [];

// Initialize timeline
async function initTimeline() {
  timelineEvents = await loadData('../data/timeline.json');
  renderTimeline(timelineEvents);
  setupTimelineFilters();
}

// Render timeline
function renderTimeline(events) {
  const container = document.getElementById('timeline-scroll');
  if (!container) return;
  
  // Sort events by year, month, day
  const sortedEvents = [...events].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month && b.month && a.month !== b.month) return a.month - b.month;
    if (a.day && b.day && a.day !== b.day) return a.day - b.day;
    return 0;
  });
  
  if (sortedEvents.length === 0) {
    container.innerHTML = '<div class="text-center" style="padding: 3rem;"><p>No timeline events found.</p></div>';
    return;
  }
  
  container.innerHTML = sortedEvents.map(event => createTimelineItem(event)).join('');
  
  // Attach click handlers
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
      const eventId = item.dataset.id;
      showEventDetails(eventId);
    });
  });
}

// Create timeline item HTML
function createTimelineItem(event) {
  const dateStr = formatDate(event);
  const typeIcon = getTypeIcon(event.type);
  
  return `
    <div class="timeline-item" data-id="${event.id || event.year}">
      <div class="timeline-year">${event.year}</div>
      <div style="font-size: 2rem; margin: 0.5rem 0;">${typeIcon}</div>
      <div class="timeline-title">${event.title}</div>
      <div class="timeline-description">${event.description || ''}</div>
      <div style="font-size: 0.85rem; color: var(--color-text-light); margin-top: 0.5rem;">${dateStr}</div>
      ${event.location ? `<div style="font-size: 0.85rem; color: var(--color-text-light); margin-top: 0.25rem;">📍 ${event.location}</div>` : ''}
    </div>
  `;
}

// Format date string
function formatDate(event) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let dateStr = '';
  
  if (event.month) {
    dateStr += months[event.month - 1] + ' ';
  }
  if (event.day) {
    dateStr += event.day + ', ';
  }
  dateStr += event.year;
  
  return dateStr;
}

// Get icon for event type
function getTypeIcon(type) {
  const icons = {
    'life-event': '👤',
    'artwork': '🎨',
    'letter': '💌',
    'exhibition': '🖼️'
  };
  return icons[type] || '📅';
}

// Setup timeline filters
function setupTimelineFilters() {
  const typeFilter = document.getElementById('filter-timeline-type');
  const yearFilter = document.getElementById('filter-timeline-year');
  
  if (typeFilter) {
    typeFilter.addEventListener('change', applyTimelineFilters);
  }
  
  if (yearFilter) {
    yearFilter.addEventListener('change', applyTimelineFilters);
  }
}

// Apply timeline filters
function applyTimelineFilters() {
  const type = document.getElementById('filter-timeline-type')?.value || 'all';
  const year = document.getElementById('filter-timeline-year')?.value || 'all';
  
  let filtered = timelineEvents;
  
  if (type !== 'all') {
    filtered = filtered.filter(event => event.type === type);
  }
  
  if (year !== 'all') {
    filtered = filtered.filter(event => event.year.toString() === year);
  }
  
  renderTimeline(filtered);
}

// Show event details in modal
function showEventDetails(eventId) {
  const event = timelineEvents.find(e => (e.id || e.year.toString()) === eventId);
  if (!event) return;
  
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  
  if (!lightbox || !content) return;
  
  const dateStr = formatDate(event);
  const typeIcon = getTypeIcon(event.type);
  
  content.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
    <div>
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <span style="font-size: 3rem;">${typeIcon}</span>
        <div>
          <h2 style="margin: 0;">${event.title}</h2>
          <div style="color: var(--color-text-light); margin-top: 0.5rem;">${dateStr}</div>
        </div>
      </div>
      ${event.location ? `<p style="color: var(--color-text-light); margin-bottom: 1rem;">📍 ${event.location}</p>` : ''}
      <p style="line-height: 1.8; margin-bottom: 2rem; font-size: 1.1rem;">${event.description || 'No description available.'}</p>
      ${event.artworks && event.artworks.length > 0 ? `
        <div style="background: var(--color-canvas); padding: 1.5rem; border-radius: 8px;">
          <h4 style="margin-bottom: 1rem;">Related Artworks</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${event.artworks.map(artId => `<span style="background: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">${artId}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Scroll to specific year in timeline
function scrollToYear(year) {
  const container = document.getElementById('timeline-scroll');
  if (!container) return;
  
  const item = container.querySelector(`[data-id="${year}"]`);
  if (item) {
    item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// Initialize timeline when DOM is ready
if (document.getElementById('timeline-scroll')) {
  document.addEventListener('DOMContentLoaded', initTimeline);
}


