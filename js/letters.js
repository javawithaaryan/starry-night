// Letters functionality - filters, display, audio

let letters = [];
let filteredLetters = [];

// Initialize letters
async function initLetters() {
  letters = await loadData('../data/letters.json');
  filteredLetters = [...letters];
  renderLetters(letters);
  setupLetterFilters();
}

// Render letters grid
function renderLetters(letterList) {
  const container = document.getElementById('letters-list');
  if (!container) return;
  
  if (letterList.length === 0) {
    container.innerHTML = '<div class="text-center" style="padding: 3rem;"><p>No letters found matching your criteria.</p></div>';
    return;
  }
  
  container.innerHTML = letterList.map(letter => createLetterCard(letter)).join('');
  
  // Attach click handlers
  document.querySelectorAll('.letter-card').forEach(card => {
    card.addEventListener('click', () => openLetterModal(card.dataset.id));
  });
}

// Create letter card HTML
function createLetterCard(letter) {
  return `
    <div class="letter-card" data-id="${letter.id}">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <h4>${letter.title}</h4>
        <span style="font-size: 0.85rem; color: var(--color-text-light);">${letter.year}</span>
      </div>
      <div class="letter-excerpt">"${letter.excerpt}"</div>
      <div class="letter-meta">
        <span style="background: var(--color-sunflower); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; margin-right: 0.5rem;">${letter.theme}</span>
        <span>${letter.location}</span>
      </div>
      <button class="btn btn-primary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;">Read Full Letter</button>
    </div>
  `;
}

// Setup letter filters
function setupLetterFilters() {
  const yearFilter = document.getElementById('filter-year');
  const themeFilter = document.getElementById('filter-theme');
  const recipientFilter = document.getElementById('filter-recipient');
  const searchInput = document.getElementById('search-letters');
  
  if (yearFilter) {
    yearFilter.addEventListener('change', applyLetterFilters);
  }
  
  if (themeFilter) {
    themeFilter.addEventListener('change', applyLetterFilters);
  }
  
  if (recipientFilter) {
    recipientFilter.addEventListener('change', applyLetterFilters);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyLetterFilters, 300));
  }
}

// Apply letter filters
function applyLetterFilters() {
  const year = document.getElementById('filter-year')?.value || 'all';
  const theme = document.getElementById('filter-theme')?.value || 'all';
  const recipient = document.getElementById('filter-recipient')?.value || 'all';
  const search = document.getElementById('search-letters')?.value.toLowerCase().trim() || '';
  
  filteredLetters = letters.filter(letter => {
    const matchesYear = year === 'all' || letter.year.toString() === year;
    const matchesTheme = theme === 'all' || letter.theme === theme;
    const matchesRecipient = recipient === 'all' || letter.recipient.toLowerCase() === recipient.toLowerCase();
    const matchesSearch = !search ||
      letter.title.toLowerCase().includes(search) ||
      letter.excerpt.toLowerCase().includes(search) ||
      letter.fullText.toLowerCase().includes(search);
    
    return matchesYear && matchesTheme && matchesRecipient && matchesSearch;
  });
  
  renderLetters(filteredLetters);
}

// Open letter modal
function openLetterModal(letterId) {
  const letter = letters.find(l => l.id === letterId);
  if (!letter) return;
  
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  
  if (!lightbox || !content) return;
  
  content.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
    <div>
      <h2 style="margin-bottom: 0.5rem;">${letter.title}</h2>
      <div style="color: var(--color-text-light); margin-bottom: 2rem;">
        <span>${letter.year}</span> • 
        <span>${letter.location}</span> • 
        <span style="background: var(--color-sunflower); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">${letter.theme}</span>
      </div>
      <div style="background: var(--color-canvas); padding: 2rem; border-radius: 8px; border-left: 4px solid var(--color-sunflower); margin-bottom: 2rem;">
        <p style="font-size: 1.1rem; line-height: 2; font-style: italic; color: var(--color-text);">${letter.fullText}</p>
      </div>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary" onclick="playLetterAudio('${letter.id}')">
          ${letter.audio ? '🔊 Play Audio' : '🎵 Audio Unavailable'}
        </button>
        <button class="btn btn-secondary" onclick="shareLetter('${letter.id}')">Share</button>
      </div>
    </div>
  `;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Play letter audio (placeholder - would need actual audio files)
function playLetterAudio(letterId) {
  const letter = letters.find(l => l.id === letterId);
  if (!letter || !letter.audio) {
    alert('Audio narration is not available for this letter yet.');
    return;
  }
  
  // This would use Web Speech API or play an audio file
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(letter.fullText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  } else {
    alert('Your browser does not support text-to-speech.');
  }
}

// Share letter
function shareLetter(letterId) {
  const letter = letters.find(l => l.id === letterId);
  if (!letter) return;
  
  if (navigator.share) {
    navigator.share({
      title: letter.title,
      text: letter.excerpt,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    const text = `${letter.title}\n\n"${letter.excerpt}"\n\n${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Letter excerpt copied to clipboard!');
    });
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

// Initialize letters when DOM is ready
if (document.getElementById('letters-list')) {
  document.addEventListener('DOMContentLoaded', initLetters);
}


