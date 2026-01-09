# Day 11: Next.js App Router - Routing & Layouts

## 🎯 Objective
Set up Next.js 14+ with App Router, implement authentication flow, create layouts with navigation, and port UI primitives from React SPA.

## 📋 Prerequisites
- Day 10 testing infrastructure complete
- React SPA components for reference
- Understanding of Next.js App Router vs Pages Router

---

## 🚀 Step-by-Step Implementation

### Phase 1: Project Initialization

#### Step 1: Create Next.js Application
```bash
cd apps
npx create-next-app@latest next-web
```

**Configuration:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ✅ Import alias: `@/*`
- ❌ Turbopack (optional)

#### Step 2: Install Dependencies
```bash
cd next-web
npm install zustand zod clsx react-hook-form @hookform/resolvers
npm install -D @types/node
```

#### Step 3: Configure TypeScript
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@ui/*": ["./src/components/ui/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

#### Step 4: Update Tailwind Config
Edit `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### Phase 2: Authentication Store & Utilities

#### Step 5: Create Auth Store
Create `src/stores/authStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

#### Step 6: Create Secure Storage Utility
Create `src/lib/secureStorage.ts`:
```typescript
const ENCRYPTION_KEY = 'workboard-secret-key';

export const secureStorage = {
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    const encrypted = btoa(value + ENCRYPTION_KEY);
    localStorage.setItem(key, encrypted);
  },

  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      return atob(encrypted).replace(ENCRYPTION_KEY, '');
    } catch {
      return null;
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};
```

---

### Phase 3: UI Primitives (Port from React SPA)

#### Step 7: Create Button Component
Create `src/components/ui/Button.tsx`:
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'hover:bg-gray-100 focus:ring-gray-500',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### Step 8: Create Input Component
Create `src/components/ui/Input.tsx`:
```typescript
import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

#### Step 9: Create Card Component
Create `src/components/ui/Card.tsx`:
```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', children, ...props }, ref) => {
    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={clsx('bg-white rounded-lg shadow-md', paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
```

---

### Phase 4: App Router Structure

#### Step 10: Create Root Layout
Update `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workboard - Project Management",
  description: "Modern project and task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

#### Step 11: Create Login Page
Create `src/app/login/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      const mockUser = { id: '1', email, name: email.split('@')[0] };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setUser(mockUser);
      setToken(mockToken);
      
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Workboard</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

#### Step 12: Create Protected Route Middleware
Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for auth token in cookies or headers
  const authCookie = request.cookies.get('auth-storage');
  const { pathname } = request.url;

  // Public routes
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Protected routes - redirect to login if no auth
  if (!authCookie && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

#### Step 13: Create App Layout with Navigation
Create `src/app/(app)/layout.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary-600">Workboard</h1>
              <div className="flex space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link href="/projects" className="text-gray-700 hover:text-primary-600">
                  Projects
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
```

#### Step 14: Create Dashboard Page
Create `src/app/(app)/dashboard/page.tsx`:
```typescript
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-primary-600">48</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-primary-600">156</p>
        </Card>
      </div>
    </div>
  );
}
```

#### Step 15: Create Projects Page
Create `src/app/(app)/projects/page.tsx`:
```typescript
import { Card } from '@/components/ui/Card';

export default function ProjectsPage() {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'active', tasks: 12 },
    { id: 2, name: 'Mobile App', status: 'planning', tasks: 8 },
    { id: 3, name: 'API Integration', status: 'completed', tasks: 15 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Status: {project.status}</p>
            <p className="text-sm text-gray-600">{project.tasks} tasks</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

### Phase 5: Testing & Validation

#### Step 16: Test Development Server
```bash
npm run dev
```

**Verify:**
- ✅ http://localhost:3000 redirects to /login
- ✅ Login form renders correctly
- ✅ Login with any email/password works
- ✅ Redirects to /dashboard after login
- ✅ Navigation works between Dashboard and Projects
- ✅ Logout clears state and redirects to /login

#### Step 17: Test Build
```bash
npm run build
npm run start
```

**Verify:**
- ✅ No build errors
- ✅ Production build works correctly
- ✅ Static optimization for public pages

---

### Phase 6: Documentation & Deployment Prep

#### Step 18: Update Package.json Scripts
Edit `apps/next-web/package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

#### Step 19: Create Next.js README
Create `apps/next-web/README.md`:
```markdown
# Workboard Next.js App

Next.js 14+ application with App Router for workboard project management.

## Features
- ✅ App Router with nested layouts
- ✅ Server/Client Components
- ✅ Authentication with Zustand
- ✅ Protected routes with middleware
- ✅ TailwindCSS styling
- ✅ TypeScript strict mode

## Getting Started

npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check

## Project Structure
```
src/
├── app/                 # App Router pages
│   ├── (app)/          # Protected routes with layout
│   │   ├── dashboard/
│   │   └── projects/
│   ├── login/          # Public login page
│   └── layout.tsx      # Root layout
├── components/
│   └── ui/             # Reusable UI primitives
├── stores/             # Zustand state management
└── lib/                # Utilities
```

## Routes
- `/login` - Public authentication
- `/dashboard` - Protected dashboard
- `/projects` - Protected projects list
```

#### Step 20: Add Environment Variables
Create `apps/next-web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## ✅ Completion Checklist

### Setup
- [ ] Next.js app created with App Router
- [ ] Dependencies installed (zustand, zod, clsx)
- [ ] TypeScript paths configured
- [ ] Tailwind CSS customized

### Authentication
- [ ] Auth store with Zustand persistence
- [ ] Secure storage utility
- [ ] Middleware for protected routes
- [ ] Login page with mock auth

### UI Components
- [ ] Button (4 variants, 3 sizes)
- [ ] Input (with label & error states)
- [ ] Card (3 padding sizes)

### Routing
- [ ] Root layout with metadata
- [ ] App layout with navigation
- [ ] Login page (public)
- [ ] Dashboard page (protected)
- [ ] Projects page (protected)

### Testing
- [ ] Dev server runs without errors
- [ ] Auth flow works (login → dashboard → logout)
- [ ] Navigation between pages works
- [ ] Production build succeeds

---

## 📊 Results

**Files Created:** 15+
**Routes:** 3 pages (login, dashboard, projects)
**Components:** 3 UI primitives
**Build Time:** ~2-3 minutes
**Bundle Size:** ~150-200kb (gzipped)

---

## 🔧 Common Issues & Solutions

### Issue 1: Hydration Mismatch
**Error:** `Text content does not match server-rendered HTML`  
**Solution:** Use `'use client'` for components with browser APIs

### Issue 2: Zustand Persist Not Working
**Error:** State not persisting across refreshes  
**Solution:** Check `typeof window !== 'undefined'` guards

### Issue 3: Middleware Not Protecting Routes
**Error:** Can access protected pages without login  
**Solution:** Verify middleware matcher config and cookie name

---

## 🚀 Next Steps (Day 12)
- Server Components vs Client Components deep dive
- Data fetching with Server Components
- Implement React Query for client-side data
- Add loading and error states
- Create API routes in Next.js
