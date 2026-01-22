# Performance & SEO Documentation

## Metadata Strategy

### Route-Specific Metadata

All routes now have proper metadata for SEO and social sharing:

- **Root Layout** (`/`): Default metadata with OpenGraph and Twitter cards, template pattern
- **Login** (`/login`): No-index for SEO (via dedicated layout), focused title
- **Dashboard** (`/dashboard`): Static metadata with descriptive title/description
- **Projects List** (`/projects`): Dynamic metadata based on filters (search, status)
- **Project Detail** (`/projects/[id]`): Dynamic metadata from project data

### Metadata Template

Root layout uses template: `%s | Workboard` so child pages just export:
```tsx
export const metadata = { title: 'Dashboard' };
// Becomes: "Dashboard | Workboard"
```

### Dynamic Metadata Example

```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.id);
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
    },
  };
}
```

## Caching Strategy

### Page-Level ISR (Incremental Static Regeneration)

- **Dashboard**: `revalidate: 60` (stats can cache for 60 seconds)
- **Projects List**: `revalidate: 60` with `dynamicParams: true` (allows URL params)
- **Project Detail**: `revalidate: 60` per project (cached per unique ID)

### API Route Caching

All API routes include Cache-Control headers:
```tsx
headers: {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
}
```

- **s-maxage=60**: CDN caches for 60 seconds
- **stale-while-revalidate=120**: Can serve stale data for up to 120 seconds while revalidating

### When to Use Different Strategies

- `revalidate: 60` - Data changes occasionally, can cache briefly
- `revalidate: 0` - Real-time data required (avoid if possible)
- `dynamic = 'force-dynamic'` - For features requiring request-time data
- `dynamicParams: true` - Allow dynamic route generation with caching

## Image Optimization

### Next/Image Configuration

Configured in `next.config.ts`:
```tsx
images: {
  formats: ['image/avif', 'image/webp'],  // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Usage Guidelines

```tsx
import Image from 'next/image';

// Above-the-fold images (hero, logo)
<Image 
  src="/hero.jpg" 
  alt="..." 
  width={1200} 
  height={600} 
  priority 
/>

// Below-the-fold images (lazy load by default)
<Image 
  src={project.imageUrl} 
  alt={project.name} 
  width={400} 
  height={300} 
/>
```

### Benefits

- Automatic format optimization (AVIF, WebP)
- Lazy loading by default
- Prevents Cumulative Layout Shift (CLS)
- Responsive srcsets
- Automatic image sizing

## Component Architecture

### Server vs Client Components

**Default**: Server components (better performance, smaller bundle, SEO-friendly)

**Use client components** ('use client') only when needed for:
- State management (useState, useReducer, useContext)
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (localStorage, window, document)
- useEffect, useLayoutEffect
- Custom hooks that use the above

### Current Client Components (All Justified)

1. **Pages**: `/login` (form state, authentication)
2. **Layouts**: `(app)/layout` (auth state from Zustand)
3. **Forms**: ProjectFormModal, TaskFormModal (form state)
4. **Interactive UI**: Modal, TaskCard, ProjectActions (event handlers)
5. **Advanced UI**: TaskBoardClient (drag & drop), ProjectsFilters, PaginationControls
6. **Error boundaries**: `error.tsx` (required by Next.js)

All other components remain server components for optimal performance.

## Web Vitals Monitoring

### Metrics Tracked

- **LCP** (Largest Contentful Paint): Target < 2.5s
- **FID** (First Input Delay): Target < 100ms  
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **TTFB** (Time to First Byte): Target < 600ms
- **FCP** (First Contentful Paint): Target < 1.8s

### Implementation

Created `web-vitals.tsx` component imported in root layout:
```tsx
'use client';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log('[Web Vitals]', metric);
    // Send to analytics in production
  });
  return null;
}
```

### Viewing Results

- **Development**: Check browser console for logged metrics
- **Production**: Integrate with analytics (Vercel Analytics, Google Analytics, etc.)

## Bundle Size Analysis

### Running Analysis

```bash
npm run analyze
```

This builds the app with bundle visualization enabled. Opens interactive treemap showing:
- Size of each page bundle
- Shared chunks
- Third-party dependencies
- Opportunities for optimization

### Optimization Strategies

1. **Dynamic Imports**: Load heavy components on-demand
2. **Tree Shaking**: Remove unused exports
3. **Code Splitting**: Automatic per-route in Next.js
4. **React Compiler**: Already enabled for auto-optimization

### Current Optimizations

- ✅ React Compiler enabled
- ✅ Route-based code splitting (automatic)
- ✅ Server components reduce client bundle
- ✅ Minimal client-side JavaScript

## Performance Best Practices

### 1. Minimize Client Components

Only use 'use client' when necessary. Server components:
- Reduce bundle size
- Improve SEO (rendered on server)
- Faster initial page load
- Can fetch data directly

### 2. Optimize Data Fetching

```tsx
// Good: Server component with caching
export const revalidate = 60;
const data = await fetchData();

// Avoid: Client-side fetching when not needed
```

### 3. Use Proper Caching

- ISR for data that changes occasionally
- API route caching for shared data
- CDN caching with stale-while-revalidate

### 4. Optimize Images

- Always use Next/Image for optimization
- Provide width/height to prevent CLS
- Use `priority` for above-the-fold images
- Let lazy loading handle the rest

### 5. Monitor Performance

- Track Web Vitals in development
- Set up analytics in production
- Run Lighthouse audits regularly
- Use bundle analyzer to find bloat

## Performance Checklist

-  Metadata on all routes
-  OpenGraph tags for social sharing
-  ISR caching implemented
-  Cache headers on API routes
-  Image optimization configured
-  Web Vitals monitoring setup
-  Bundle analyzer installed
-  Client components minimized
-  Server components as default
-  Documentation complete

## Future Improvements

1. **Preload Critical Resources**: Add `<link rel="preload">` for fonts, critical CSS
2. **Streaming SSR**: Implement React Suspense boundaries for faster TTFB
3. **Service Worker**: Offline support with next-pwa
4. **Prefetching**: Configure `next/link` prefetch strategy
5. **Edge Functions**: Deploy API routes to edge for lower latency
6. **Static Generation**: Pre-render common project pages at build time
7. **Image CDN**: Configure external image domain for optimized delivery
8. **Font Optimization**: Use `next/font` for optimal font loading (already using Inter)

## Testing Performance

### Lighthouse Audit

1. Build for production: `npm run build`
2. Start production server: `npm start`
3. Open Chrome DevTools → Lighthouse
4. Run audit for Performance, SEO, Accessibility

### Network Analysis

1. Open DevTools → Network tab
2. Check cache headers on responses
3. Verify image optimization (format, size)
4. Monitor bundle sizes

### Real User Monitoring

Integrate with services like:
- Vercel Analytics (if deployed on Vercel)
- Google Analytics 4 with Web Vitals
- Sentry for performance monitoring
