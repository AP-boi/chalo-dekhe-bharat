# 🇮🇳 Chalo Dekhe Bharat! (চলো দেখি ভারত)

> An immersive web application showcasing India's rich cultural heritage, 3D museum artifacts, interactive travel planning, photorealistic gallery, and gamified quiz experiences.

---

## 🌟 Overview

**Chalo Dekhe Bharat** (Explore India) is an interactive, modern web experience designed to showcase the vibrant diversity, art, heritage, and geography of India. Built with Next.js 15, React 19, Three.js, and Tailwind CSS v4, the project delivers a high-performance interactive journey with support for full 3D rendering as well as smooth 2D fallback modes.

---

## ✨ Core Features & Key Routes

* **🏛️ Digital Museum (`/museum`)**:
  * Interactive virtual 3D artifacts exhibition powered by React Three Fiber (`@react-three/fiber` & `@react-three/drei`).
  * Video backdrop integration, lighting controls, and interactive modal overlays for deep dive history.

* **✈️ Smart AI Travel Planner (`/planner`)**:
  * Custom trip itinerary builder powered by Gemini LLM (`@ai-sdk/google`).
  * Generates personalized day-by-day travel plans, budget estimates, cultural etiquette guides, and local cuisine recommendations across Indian states and cities.

* **🖼️ 3D Photography & Cultural Gallery (`/gallery`)**:
  * Dynamic, responsive 3D card carousel and high-resolution photo gallery highlighting heritage sites, festivals, landscapes, and wildlife.
  * Mechanical text-flipping display board effect for instant region and state highlights.

* **🎮 Heritage Discovery Game (`/game`)**:
  * Gamified interactive quiz and exploration challenges to test knowledge on Indian monuments, history, geography, and traditions.

* **⚡ Performance & Accessibility-First Design**:
  * **Low-Graphics Engine**: Auto-detects device hardware capability to switch between full 3D and lightweight 2D rendering seamlessly.
  * **Smooth Scrolling**: Powered by Lenis for fluid navigation across all interactive sections.

---

## 🛠️ Tech Stack & Libraries

### **Frontend & Framework**
* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **UI Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Custom HSL Theme Design System
* **Icons**: [Lucide React](https://lucide.dev/)
* **Component Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`

### **3D Graphics & Animations**
* **3D Engine**: [Three.js](https://threejs.org/)
* **React 3D Binding**: `@react-three/fiber` & `@react-three/drei`
* **Animations**: [Framer Motion v12](https://motion.dev/)
* **Smooth Scroll**: `@studio-freight/lenis` / `lenis`

### **State Management & AI**
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **AI & LLM Integration**: Vercel AI SDK (`ai`), `@ai-sdk/google` (Google Gemini)

---

## 📁 Project Structure

```text
CHALO DEKHE BHARAT/
├── public/                 # Static assets (images, video backgrounds, models)
├── src/
│   ├── app/                # Next.js App Router pages & API routes
│   │   ├── api/            # API endpoints (e.g. Gemini LLM itinerary generator)
│   │   ├── gallery/        # Cultural 3D Photography Gallery page
│   │   ├── game/           # Interactive Heritage Game page
│   │   ├── museum/         # Virtual 3D Museum page
│   │   ├── planner/        # AI Travel Planner page
│   │   ├── globals.css     # Global styles & Tailwind CSS theme configuration
│   │   ├── layout.tsx      # Root layout & providers
│   │   └── page.tsx        # Hero Landing Page
│   ├── components/         # Reusable UI & 3D Components
│   │   ├── museum/         # 3D canvas, lighting, & video background components
│   │   └── ui/             # 3D cards, text flipping boards, & buttons
│   └── lib/                # Utilities, hooks, and schemas
│       └── schemas/        # Zod & TypeScript type schemas
├── .env.local              # Local environment configuration
├── next.config.ts          # Next.js build setup
├── package.json            # Project dependencies & scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

Follow these steps to set up and run **Chalo Dekhe Bharat** locally on your machine.

### **Prerequisites**
* [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
* `npm` or `yarn` or `pnpm`

### **1. Clone the Repository & Install Dependencies**
```bash
# Clone the repository
git clone https://github.com/your-username/chalo-dekhe-bharat.git

# Navigate into the project folder
cd "chalo-dekhe-bharat"

# Install package dependencies
npm install
```

### **2. Set Up Environment Variables**
Create a `.env.local` file in the root directory and add your Google Gemini API Key for the AI Travel Planner:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

### **3. Run the Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on `localhost:3000`. |
| `npm run build` | Builds the optimized production build of the application. |
| `npm run start` | Runs the built application in production mode. |
| `npm run lint` | Runs ESLint to check for code quality and formatting issues. |

---

## 🎨 Design System & Theme

The project utilizes a custom, cultural color palette configured in `src/app/globals.css`:
* **Indigo Dusk**: `#1a1040` (Primary Dark Background)
* **Marble Ivory**: `#f5f0e8` (Neutral Accent & Text)
* **Marigold**: `#f5a623` (Vibrant Highlights)
* **Peacock Teal**: `#00796b` (Secondary Accent)
* **Sindoor Maroon**: `#8b1a1a` (Cultural Contrast Accent)
* **Gold Leaf**: `#c8a951` (Decorative Trim & Borders)

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p align="center">
  Crafted with ❤️ to celebrate the rich culture and diversity of India 🇮🇳
</p>
