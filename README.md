# 🌻 Vincent van Gogh: A Comprehensive Chronicle

A digital museum and educational platform dedicated to **Vincent van Gogh's life, artworks, and letters**, designed for both art enthusiasts and researchers. This interactive website provides an immersive experience that bridges biography, gallery, and storytelling.

![Van Gogh](night.jpg)

## ✨ Features

### 🖼️ **Interactive Art Gallery**
- **Complete Image Collection**: Displays all artworks from the collection
- **Story Integration**: Each artwork includes historical context, quotes, and significance
- **Multiple View Modes**: Grid, Masonry, and List layouts
- **Advanced Filtering**: Filter by period, type, and search functionality
- **Lightbox Viewer**: Full-screen image viewing with detailed stories
- **Keyboard Navigation**: Arrow keys and ESC for easy navigation

### 📖 **Story Showcase**
- **Narrative-Driven Display**: Images presented with Van Gogh's story
- **Period Organization**: Artworks organized by life periods
- **Quote Integration**: Van Gogh's own words accompany each artwork
- **Scroll Animations**: Smooth, engaging scroll-triggered animations

### 📅 **Interactive Timeline**
- Chronological journey through Van Gogh's life (1853-1890)
- Key events, artworks, and letters mapped to dates
- Clickable timeline markers for detailed information

### 💌 **Letters & Writings**
- Personal correspondence with Theo and others
- Filterable by year, theme, and recipient
- Full transcriptions with historical context

### 🎨 **Van Gogh-Inspired Design**
- **Color Palette**: 
  - Sunflower Yellow (#F9E79F)
  - Night Sky Blue (#1E3A8A)
  - Passion Red (#C0392B)
  - Canvas Beige (#FDF6E3)
- **Typography**: Merriweather (headings) + Inter (body)
- **Artistic Effects**: Brushstroke animations, hover effects, and smooth transitions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd "starry night"
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Navigate to `http://localhost:8000`

## 📁 Project Structure

```
starry night/
├── index.html              # Main homepage with story showcase
├── gallery.html            # Art gallery page
├── timeline.html           # Interactive timeline (to be created)
├── letters.html            # Letters section (to be created)
├── legacy.html             # Legacy page (to be created)
│
├── css/
│   ├── styles.css          # Main stylesheet with design system
│   ├── gallery.css         # Gallery-specific styles
│   └── story-showcase.css  # Story showcase styles
│
├── js/
│   ├── main.js            # Core navigation and utilities
│   ├── gallery-dynamic.js # Dynamic gallery functionality
│   ├── story-showcase.js  # Story showcase functionality
│   ├── gallery.js         # Gallery filters and lightbox
│   ├── letters.js         # Letters functionality
│   └── timeline.js        # Timeline functionality
│
├── data/
│   ├── artworks.json      # Artwork database
│   ├── image-stories.json # Story data for images
│   ├── letters.json       # Letters database
│   └── timeline.json      # Timeline events
│
└── [images]/              # All JPG artwork images
    ├── 2.jpg - 35.jpg     # Numbered artworks
    ├── L1.jpg - L15.jpg   # Letter illustrations
    ├── van1.jpg - van5.jpg # Van Gogh studies
    ├── night.jpg          # Starry Night
    └── wave2.jpg          # Wave study
```

## 🎯 Key Features Explained

### Gallery Page
- **Automatic Image Detection**: Loads all JPG files from the directory
- **Story Badges**: Images with stories are marked with a 📖 badge
- **Period Labels**: Each artwork shows its historical period
- **Quote Excerpts**: Preview quotes on gallery cards
- **Full Story View**: Click any image to see complete story, quote, and significance

### Story Showcase
- **Alternating Layout**: Images and stories alternate left/right
- **Full Narratives**: Complete historical context for featured artworks
- **Van Gogh Quotes**: Highlighted quotes from his letters
- **Significance Notes**: Historical importance of each work

### Responsive Design
- Mobile-friendly layouts
- Touch-optimized interactions
- Adaptive grid systems
- Smooth animations across devices

## 🎨 Design System

### Colors
- **Sunflower**: `#F9E79F` - Primary accent, warmth
- **Night Sky**: `#1E3A8A` - Headings, depth
- **Passion Red**: `#C0392B` - Highlights, emphasis
- **Canvas**: `#FDF6E3` - Background, subtlety

### Typography
- **Headings**: Merriweather (serif) - Elegant, readable
- **Body**: Inter (sans-serif) - Modern, clean

### Components
- Cards with shadow effects
- Smooth hover transitions
- Brushstroke-inspired animations
- Gradient backgrounds

## 📝 Adding New Content

### Adding New Artwork Stories

Edit `data/image-stories.json`:

```json
{
  "filename": "your-image.jpg",
  "title": "Artwork Title",
  "period": "Period Name",
  "story": "Full narrative description...",
  "excerpt": "Short quote excerpt",
  "quote": "Full Van Gogh quote",
  "significance": "Historical significance"
}
```

### Adding New Artworks

Edit `data/artworks.json`:

```json
{
  "id": "unique-id",
  "title": "Artwork Title",
  "year": 1889,
  "period": "saint-remy",
  "type": "landscape",
  "medium": "Oil on canvas",
  "museum": "Museum Name",
  "description": "Description...",
  "image": "path/to/image.jpg",
  "colorPalette": ["#color1", "#color2"],
  "location": "City, Country"
}
```

## 🔧 Customization

### Changing Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
  --color-sunflower: #F9E79F;
  --color-night-sky: #1E3A8A;
  --color-passion: #C0392B;
  /* ... */
}
```

### Modifying Layouts
- Gallery grid: Edit `gallery-grid` classes in `css/gallery.css`
- Story sections: Modify `story-section` styles in `css/story-showcase.css`

## 📚 Resources & Credits

### Data Sources
- [Van Gogh Museum Official Archive](https://www.vangoghmuseum.nl/en)
- [The Letters of Vincent van Gogh](https://vangoghletters.org)
- [Google Arts & Culture](https://artsandculture.google.com/)
- [MoMA: Starry Night](https://www.moma.org/)

### Image Credits
- Images should be rights-cleared or used with proper attribution
- Replace placeholder images with high-resolution museum images for production

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **JSON** - Data storage
- **Git** - Version control

## 📄 License

This project is created for educational purposes. All artwork images should be properly attributed and used in accordance with copyright laws.

## 🚧 Future Enhancements

- [ ] Timeline page implementation
- [ ] Letters page with full transcriptions
- [ ] Legacy page with modern influence
- [ ] Audio narration for letters
- [ ] Dark mode toggle
- [ ] User favorites (localStorage)
- [ ] Compare mode (side-by-side artworks)
- [ ] Art quiz feature
- [ ] Mobile app version (PWA)
- [ ] AR/VR museum tour

## 🤝 Contributing

This is an educational project. Feel free to:
- Report issues
- Suggest improvements
- Add more artwork stories
- Enhance the design

## 📧 Contact

For questions or feedback about this project, please refer to the repository issues.

---

**Made with ❤️ for art lovers and researchers**

*"I dream my painting and I paint my dream."* — Vincent van Gogh

