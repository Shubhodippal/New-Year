# 🎆 Elegant New Year's Wish 2026

A sophisticated, beautifully animated New Year's wish website built with React and Vite. This is an elegant, multi-scene experience designed to express your feelings to someone special through stunning visuals and romantic messaging.

## ✨ Features

### Visual Effects
- **Animated Starfield** - 200 twinkling stars with shooting star effects
- **Sophisticated Fireworks** - Realistic physics-based fireworks with multiple particle systems
- **Particle Effects** - Golden sparkles and floating particles
- **Elegant Typography** - Premium serif fonts (Playfair Display, Cinzel, Cormorant Garamond)
- **Gradient Animations** - Flowing color gradients throughout
- **Smooth Scene Transitions** - Professional easing and timing

### Multi-Scene Experience
1. **Intro & Countdown** - "Get Ready..." with pulsing animation
2. **Year Reveal** - Stunning 2026 reveal with 3D floating digits
3. **Fireworks Celebration** - Explosive fireworks display
4. **Main Greeting** - Elegant "Happy New Year" with golden shimmer
5. **First Message** - Romantic intro message with smooth reveals
6. **Second Message** - Deeper emotional connection
7. **Final Scene** - Heartfelt romantic conclusion with ornamental touches

### Design Highlights
- Dark space-themed background with radial gradients
- Premium serif typography for elegance
- Sophisticated color palette (purples, golds, pinks)
- Responsive design for all screen sizes
- Hardware-accelerated CSS animations
- Professional timing and choreography (~20 second experience)

## 🚀 Getting Started

### View the Website

Open your browser and visit: **http://localhost:5173/**

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Personalize the Messages

Edit [src/components/NewYearMessage.jsx](src/components/NewYearMessage.jsx) to customize the romantic messages:

**Scene 4-5 (First Message):**
```jsx
<p className="elegant-line">As the stars align for a new year,</p>
<p className="elegant-line">I find myself hoping</p>
<p className="elegant-line">that our story is just beginning...</p>
```

**Scene 6 (Final Romantic Scene):**
```jsx
<p className="romantic-line">Perhaps this year,</p>
<p className="romantic-line highlight">friendship blossoms</p>
<p className="romantic-line highlight">into something more...</p>
<p className="romantic-line">something beautiful,</p>
<p className="romantic-line final-wish">something us.</p>
```

### Adjust Timing

Control scene transitions in [src/App.jsx](src/App.jsx):

```jsx
const timings = [
  { delay: 500, action: () => setScene(1) },    // Start countdown
  { delay: 3500, action: () => setScene(2) },   // Year reveal
  { delay: 6500, action: () => setScene(3) },   // Fireworks start
  { delay: 9000, action: () => setScene(4) },   // First message
  { delay: 13000, action: () => setScene(5) },  // Second message
  { delay: 18000, action: () => setScene(6) }   // Final romantic scene
]
```

### Change Colors

Modify color schemes in the CSS files:
- Fireworks colors in [src/components/Fireworks.jsx](src/components/Fireworks.jsx) (lines 14-19)
- Typography gradients in [src/components/NewYearMessage.css](src/components/NewYearMessage.css)
- Background in [src/App.css](src/App.css)

### Customize Star Count

Adjust the starfield density in [src/components/Starfield.jsx](src/components/Starfield.jsx):

```jsx
for (let i = 0; i < 200; i++) {  // Change 200 to your desired number
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Starfield.jsx           # Animated starfield background with shooting stars
│   ├── Starfield.css           # Star twinkling and shooting star animations
│   ├── Fireworks.jsx           # Realistic fireworks with multiple particles
│   ├── Fireworks.css           # Firework physics and explosion effects
│   ├── ParticleSystem.jsx      # Floating particle effects (sparkles/dots)
│   ├── ParticleSystem.css      # Particle floating animations
│   ├── NewYearMessage.jsx      # Multi-scene message progression
│   └── NewYearMessage.css      # Elegant typography and scene transitions
├── App.jsx                     # Main app with scene orchestration
├── App.css                     # Dark gradient background and overlays
├── index.css                   # Global styles and font imports
└── main.jsx                    # Entry point
```

## 🎯 Technologies Used

- **React 18** - Modern React with hooks for state management
- **Vite** - Lightning-fast build tool and HMR
- **CSS3 Animations** - Hardware-accelerated animations for smooth performance
- **Google Fonts** - Premium serif fonts (Playfair Display, Cinzel, Cormorant Garamond)
- **Modern JavaScript** - ES6+ features and clean code practices

## 💝 Perfect For

- Expressing romantic interest to someone special
- Moving from friendship to a potential relationship
- New Year's wishes with emotional depth
- Creating a memorable, cinematic moment
- Sharing a sophisticated digital experience

## 🎬 Animation Timeline

```
0.5s   → Scene 1: "Get Ready..." countdown
3.5s   → Scene 2: 2026 year reveal with floating digits
6.5s   → Scene 3: Fireworks begin
9.0s   → Scene 4: "Happy New Year" + First message
13.0s  → Scene 5: Second emotional message
18.0s  → Scene 6: Final romantic conclusion
```

Total experience: ~20-25 seconds of beautifully choreographed animation.

## 📱 Responsive Design

The website automatically adjusts for:
- **Desktop** (1920x1080+) - Full cinematic experience
- **Laptop** (1024-1920px) - Optimized typography
- **Tablet** (768-1024px) - Adjusted font sizes
- **Mobile** (320-768px) - Touch-friendly with scaled elements

All animations maintain their elegance across devices!

## 🎉 Deployment

To deploy your website:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder to:**
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static hosting service

---

Made with ❤️ for someone special. Happy New Year 2026! 🎊
