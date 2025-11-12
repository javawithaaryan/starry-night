// Story Showcase - Display images with Van Gogh's story

let storyData = null;

// Load story data (using fetch directly since loadData might not be available)
async function loadStoryData() {
  try {
    const response = await fetch('data/image-stories.json');
    if (!response.ok) throw new Error('Failed to load stories');
    storyData = await response.json();
    return storyData;
  } catch (error) {
    console.error('Error loading story data:', error);
    // Try alternative path
    try {
      const response = await fetch('../data/image-stories.json');
      if (!response.ok) throw new Error('Failed to load stories');
      storyData = await response.json();
      return storyData;
    } catch (err) {
      console.error('Could not load stories from either path');
      return null;
    }
  }
}

// Create story section HTML
function createStorySection(story, index) {
  const isEven = index % 2 === 0;
  const imageSide = isEven ? 'left' : 'right';
  
  return `
    <section class="story-section ${isEven ? 'story-even' : 'story-odd'}" data-index="${index}">
      <div class="story-container">
        <div class="story-image-wrapper ${imageSide}">
          <img src="${story.filename}" alt="${story.title}" class="story-image" loading="lazy">
          <div class="story-image-overlay"></div>
        </div>
        <div class="story-content ${imageSide === 'left' ? 'right' : 'left'}">
          <div class="story-period-badge">${story.period}</div>
          <h2 class="story-title">${story.title}</h2>
          <div class="story-quote-large">"${story.quote}"</div>
          <p class="story-description">${story.story}</p>
          ${story.significance ? `
            <div class="story-significance-box">
              <strong>Significance:</strong> ${story.significance}
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
}

// Render story showcase
async function renderStoryShowcase() {
  const container = document.getElementById('story-showcase');
  if (!container) return;
  
  const data = await loadStoryData();
  if (!data || !data.stories) {
    container.innerHTML = '<p>Loading stories...</p>';
    return;
  }
  
  container.innerHTML = data.stories.map((story, index) => 
    createStorySection(story, index)
  ).join('');
  
  // Add scroll animations
  setupStoryAnimations();
}

// Setup scroll animations for story sections
function setupStoryAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('story-visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.story-section').forEach(section => {
    observer.observe(section);
  });
}

// Initialize story showcase
if (document.getElementById('story-showcase')) {
  document.addEventListener('DOMContentLoaded', renderStoryShowcase);
}

