# 🚀 WorkBoard Training Project

[![Next.js CI](https://github.com/YOUR_USERNAME/workboard-training/actions/workflows/next-ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/workboard-training/actions/workflows/next-ci.yml)
[![React SPA Tests](https://github.com/YOUR_USERNAME/workboard-training/actions/workflows/test.yml/badge.svg)](https://github.com/YOUR_USERNAME/workboard-training/actions/workflows/test.yml)

## 📋 Overview

A comprehensive 14-day training project to learn modern React and Next.js development, coming from a Blazor background. This repository contains two applications:
- **React SPA** (Days 1-10): A Vite-powered React application with React Router, Zustand, and MSW
- **Next.js App** (Days 11-14): A production-ready Next.js application with App Router, server components, and Vercel deployment

## 🌐 Live Deployments

- **Next.js Production:** [https://your-project.vercel.app](https://your-project.vercel.app) *(Update after deployment)*
- **Preview (Develop Branch):** [https://your-project-git-develop.vercel.app](https://your-project-git-develop.vercel.app) *(Update after deployment)*

## ✨ Features

### React SPA (`apps/react-spa`)
- ✅ Project and Task Management
- ✅ Client-side routing with React Router
- ✅ State management with Zustand
- ✅ API mocking with MSW (Mock Service Worker)
- ✅ Form validation with React Hook Form + Zod
- ✅ Comprehensive test coverage with Vitest
- ✅ Tailwind CSS styling

### Next.js App (`apps/next-web`)
- ✅ Server and Client Components
- ✅ App Router with layouts
- ✅ API Routes
- ✅ Middleware for authentication
- ✅ Server Actions
- ✅ Optimized performance (React Compiler, bundle analysis)
- ✅ Production-ready with Vercel deployment

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management

### Development & Testing
- **Vite** - Build tool (SPA)
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **MSW** - API mocking

### Deployment & CI/CD
- **Vercel** - Hosting platform
- **GitHub Actions** - CI/CD pipelines

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/workboard-training.git
cd workboard-training
```

### 2️⃣ Run the Next.js App (Recommended)
```bash
cd apps/next-web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Default Login:**
- Email: `admin@example.com`
- Password: `password123`

### 3️⃣ Run the React SPA (Optional)
```bash
cd apps/react-spa
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

## 📂 Project Structure

```
workboard-training/
├── apps/
│   ├── next-web/              # Next.js application (Days 11-14)
│   │   ├── src/
│   │   │   ├── app/           # App Router pages & layouts
│   │   │   ├── components/    # Reusable React components
│   │   │   ├── lib/           # API clients & utilities
│   │   │   ├── schemas/       # Zod validation schemas
│   │   │   ├── stores/        # Zustand stores
│   │   │   └── types/         # TypeScript types
│   │   └── package.json
│   │
│   └── react-spa/             # React SPA (Days 1-10)
│       ├── src/
│       │   ├── api/           # API layer & MSW
│       │   ├── components/    # React components
│       │   ├── hooks/         # Custom React hooks
│       │   ├── pages/         # Page components
│       │   └── stores/        # State management
│       └── package.json
│
├── docs/
│   ├── daily-notes/           # Daily learning journal
│   └── architecture/          # Architecture documentation
│
├── .github/
│   └── workflows/             # CI/CD workflows
│       ├── next-ci.yml        # Next.js CI pipeline
│       └── test.yml           # React SPA tests
│
└── README.md                  # This file
```

## 🏗️ Architecture

### Next.js App Architecture
```
┌─────────────────────────────────────────────┐
│           Browser (Client)                  │
│  ┌──────────────────────────────────────┐  │
│  │  React Components (Client/Server)    │  │
│  │  - Forms, UI, Interactive Elements   │  │
│  └──────────────────────────────────────┘  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Next.js Server                      │
│  ┌──────────────────────────────────────┐  │
│  │  App Router                          │  │
│  │  - Pages, Layouts, Loading States    │  │
│  ├──────────────────────────────────────┤  │
│  │  API Routes                          │  │
│  │  - /api/projects, /api/tasks         │  │
│  ├──────────────────────────────────────┤  │
│  │  Middleware                          │  │
│  │  - Authentication, Redirects         │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### State Management
- **Zustand** - Global state (auth, UI preferences)
- **Server State** - Fetched via API routes, managed in components
- **Form State** - React Hook Form with Zod validation

### Data Flow
1. User interacts with UI component
2. Form validation via Zod schema
3. API call to Next.js route handler
4. Mock data returned (in-memory store)
5. UI updates with new data

See [docs/architecture/](docs/architecture/) for detailed architecture notes.

## 🧪 Testing

### Run React SPA Tests
```bash
cd apps/react-spa
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Generate coverage report
```

### Run Next.js Build Test
```bash
cd apps/next-web
npm run build         # Verify production build
npm run lint          # Run ESLint
npx tsc --noEmit      # Type check
```

## 📦 Building for Production

### Next.js Production Build
```bash
cd apps/next-web
npm run build
npm run start         # Start production server
```

### Analyze Bundle Size
```bash
cd apps/next-web
npm run analyze       # Opens bundle analyzer
```

## 🚢 Deployment

### Deploy to Vercel

#### Using Vercel Dashboard (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Configure:
   - **Root Directory:** `apps/next-web`
   - **Framework Preset:** Next.js (auto-detected)
5. Deploy!

#### Using Vercel CLI
```bash
npm install -g vercel
cd apps/next-web
vercel --prod
```

### Environment Variables
Add these in Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
```

For local development, copy `.env.example` to `.env.local`:
```bash
cd apps/next-web
cp .env.example .env.local
```

## 🔄 CI/CD Pipelines

### Next.js CI (`.github/workflows/next-ci.yml`)
Runs on every push/PR to `main` or `develop`:
- Install dependencies
- Run ESLint
- Type check with TypeScript
- Build production bundle
- Upload build artifacts

### React SPA Tests (`.github/workflows/test.yml`)
Runs on every push/PR:
- Install dependencies
- Run Vitest tests
- Generate coverage report
- Upload to Codecov

## 📈 Performance

### Optimization Features
- ✅ React Compiler for automatic memoization
- ✅ Next.js Image optimization
- ✅ Bundle analysis with `@next/bundle-analyzer`
- ✅ Code splitting via dynamic imports
- ✅ Server components for reduced client JS

### Performance Targets
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.0s
- **CLS** (Cumulative Layout Shift): < 0.1

## 📚 Learning Journey

This project follows a structured 14-day curriculum:

- **Days 1-3:** React fundamentals, components, hooks
- **Days 4-6:** Routing, forms, state management
- **Days 7-10:** Testing, API integration, performance
- **Days 11-12:** Next.js basics, App Router, server components
- **Day 13:** Advanced Next.js features, optimization
- **Day 14:** Deployment, CI/CD, documentation

See [docs/daily-notes/](docs/daily-notes/) for detailed daily reflections.

## 🎯 Key Learnings

### Coming from Blazor
- **Component Model:** Similar to Blazor components, but with more explicit state management
- **Routing:** Client-side vs server-side rendering paradigms
- **State Management:** Zustand is simpler than Blazor's cascading parameters
- **Forms:** React Hook Form + Zod is more flexible than Blazor's built-in validation

### React vs Next.js
- **React SPA:** Great for learning fundamentals, full client-side control
- **Next.js:** Production-ready, better SEO, server components, built-in optimization

## 🤝 Contributing

This is a training project, but feedback is welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Feel free to use it as a learning reference.

## 🙏 Acknowledgments

- Next.js documentation and examples
- React documentation
- Vercel for hosting
- The open-source community

## 📞 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

**Project Link:** [https://github.com/YOUR_USERNAME/workboard-training](https://github.com/YOUR_USERNAME/workboard-training)

---

**Built with ❤️ during a 14-day learning journey from Blazor to React/Next.js**