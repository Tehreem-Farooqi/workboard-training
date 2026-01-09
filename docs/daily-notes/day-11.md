# Day 11: Next.js App Router - Routing & Layouts

**Date:** January 10, 2026  
**Focus:** Next.js 16 with App Router, authentication flow, layouts with navigation

---

##  Objectives Completed

-  Set up Next.js 16 with App Router
-  Implemented authentication with Zustand
-  Created protected routes with client-side auth
-  Built reusable UI components (Button, Input, Card)
-  Configured Tailwind CSS with custom theme
-  Implemented login → dashboard → projects flow

##  React SPA vs Next.js Comparison

### Architecture
| Feature | React SPA | Next.js App Router |
|---------|-----------|-------------------|
| **Routing** | React Router (client-side) | File-based routing (server + client) |
| **Rendering** | CSR only | SSR, SSG, ISR, CSR |
| **Code Splitting** | Manual with lazy() | Automatic by route |
| **Data Fetching** | React Query | Server Components + fetch |
| **State Management** | Zustand (client) | Server Components + Zustand (client) |
| **Bundle Size** | Larger initial bundle | Smaller with route-based chunks |
| **SEO** | Poor (needs SSR workarounds) | Excellent (server-rendered) |
| **Build Output** | Static files | Hybrid (static + server) |


### Rendering Strategy
- **React SPA:** All rendering happens in browser (CSR)
- **Next.js:** Server-first, opt-in to client with `'use client'`

### Authentication
- **React SPA:** Protected routes with component wrappers
- **Next.js:** Middleware + layout guards (client-side in this project)

---

## Challenges & Solutions

### 1. **Missing Button on Login Page**
**Challenge:** Button rendered but invisible (white text on white background)  

### 2. **Hydration Mismatch Error**
**Challenge:** React hydration error - server/client HTML mismatch  
**Root Cause:** Zustand persist loads from localStorage (client-only)  



## Key Learnings

### Next.js App Router Concepts
1. **File-based Routing:** Folders = routes, `page.tsx` = UI
2. **Route Groups:** `(app)` folder for grouping without URL segment
3. **Layouts:** Shared UI that persists across route changes
4. **Client Components:** Need `'use client'` for hooks, events, browser APIs
5. **Middleware:** Can intercept requests, but limited to server context

### Best Practices Applied
-  Used route groups `(app)` for protected routes
-  Separated public (login) from protected (dashboard, projects)
-  Client-side auth guard in layout (not middleware)
-  Suppressed hydration warnings for client-only state
-  Used `suppressHydrationWarning` sparingly (only where needed)


## Next Steps (Day 12)
Port features to Next: data fetching patterns


## Commands Used

```bash
# Create Next.js app
npx create-next-app@latest next-web

# Install dependencies
npm install zustand clsx

# Run dev server
npm run dev

# Clear cache
Remove-Item -Recurse -Force .next
