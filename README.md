# Noir Studio — Creative Direction & Digital Experiences

> A cinematic digital atelier and animation engineering portfolio crafted with React 19, TypeScript, Tailwind CSS v4, Motion, and real-time Three.js WebGL spatial depth.

---

## ✨ Features

- **3D WebGL Spatial Reactor Canvas**: Interactive background particle field with geometric spatial nodes responding to real-time scroll progress, scroll velocity, and active section anchors.
- **Top-Up Slide Reveal Choreography**: Cascading smooth entrance animations with cubic bezier easing on headings, metadata, and cards.
- **3D Perspective Hover Tilt**: Interactive micro-perspective tilting on the hero banner and curated project showcase cards.
- **Infinite Kinetic Marquee Ribbon**: Seamless flowing typography tape showcasing core studio disciplines.
- **Curated Featured Works**: Dynamic category filters (`All`, `Interactive 3D`, `Creative Direction`, `Motion Identity`, `Editorial Commerce`) with deep-dive modal case studies.
- **Interactive Capabilities Grid**: Structured breakdown of creative direction, 3D web engineering, motion systems, and brand design.
- **Studio Inquiry Drawer**: Interactive commission request flow with live budget range selector, scope options, and submission feedback.
- **Cinematic Showreel Modal**: Master video reel player with sound toggle, time scrub, and full playback controls.
- **Global Studio Clocks**: Real-time synchronized time zones for Zurich (CET), Tokyo (JST), and New York (EST).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animations & Physics**: Motion (`motion/react`)
- **3D Graphics & Canvas**: Three.js WebGL spatial reactor
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/<your-username>/noir-studio.git
cd noir-studio
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the website.

### 3. Build for Production

```bash
npm run build
```

The production-optimized static bundle will be built in the `/dist` directory.

---

## 📦 Pushing to GitHub

To push this Studio website to a new GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files (categories/ is automatically excluded via .gitignore)
git add .

# 3. Create initial commit
git commit -m "feat: initial commit - Noir Studio creative direction website"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📁 Repository Structure

```
├── index.html                  # HTML entry point with metadata and fonts
├── metadata.json               # Studio project specifications
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration (strict, scoped to /src)
├── vite.config.ts              # Vite configuration with Tailwind CSS v4 plugin
├── public/                     # Static media and assets
├── src/                        # Noir Studio source code
│   ├── components/             # Reusable UI & 3D components
│   │   ├── Capabilities.tsx    # Studio disciplines and deliverables
│   │   ├── FeaturedWorks.tsx   # Project showcase with 3D tilt
│   │   ├── Footer.tsx          # Studio global offices and live clocks
│   │   ├── Hero.tsx            # Cinematic hero header
│   │   ├── HeroBanner.tsx      # Interactive 3D perspective hero banner
│   │   ├── ImpactMetrics.tsx   # Studio impact metrics and awards
│   │   ├── InquiryDrawer.tsx   # Project commission slide-over drawer
│   │   ├── MarqueeBanner.tsx   # Kinetic infinite scrolling ribbon
│   │   ├── Navbar.tsx          # Fixed minimalist navigation bar
│   │   ├── Philosophy.tsx      # Studio manifesto and design principles
│   │   ├── ProjectModal.tsx    # Case study deep-dive modal
│   │   ├── ScrollProgressIndicator.tsx # 3D chapter progress indicator
│   │   ├── ShowreelModal.tsx   # Master showreel video player modal
│   │   ├── SlideUpReveal.tsx   # Reusable top-up entrance animation wrapper
│   │   └── SpatialScrollScene.tsx # Realtime Three.js WebGL particle field
│   ├── data/
│   │   └── content.ts          # Studio projects and capabilities dataset
│   ├── hooks/
│   │   └── useScroll3D.ts      # Real-time scroll velocity and progress hook
│   ├── types/
│   │   └── index.ts            # Studio TypeScript definitions
│   ├── App.tsx                 # Root Noir Studio layout and scene assembler
│   ├── index.css               # Tailwind CSS v4 styling rules
│   └── main.tsx                # React DOM mount point
└── categories/                 # (Ignored in Git) Alternative domain demo archives
```

---

## 📄 License

Apache-2.0
