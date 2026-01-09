# Day 12 & 13: Next.js Projects & Tasks Implementation

**Date:** January 10, 2026  
**Focus:** Server/client components, data fetching, API routes, loading/error states, task board, modals

---

##  What We Actually Built

### Projects Feature
-  Projects list page with server-side data fetching
-  Project detail page with full information display
-  Search and status filters with URL sync
-  Pagination controls
-  API routes for CRUD operations
-  Loading skeletons and error boundaries
-  Delete project functionality
-  Edit project with modal form

###  Task Board & Forms
-  Kanban task board (To Do, In Progress, Done)
-  Task CRUD operations with API routes
-  Task form modal with validation
-  Project edit modal with status dropdown
-  Colored column containers for better UX
-  Form validation with React Hook Form + Zod

---

##  Major Issues Encountered & Fixed


### Issue #1: Search Filter Not Updating Cards
**Problem:** URL changed but project cards didn't refresh.

**Root Cause:** Next.js aggressively caches server components.

**Solution:**
1. Added `router.refresh()` after `router.push()` in client components
2. Added `export const dynamic = 'force-dynamic'` and `export const revalidate = 0` to server pages

### Issue #2: Login Button Invisible
**Problem:** Login button had no background color.

**Root Cause:** Used `bg-primary-600` which wasn't configured in Tailwind.

**Solution:** Changed to standard Tailwind color `bg-blue-600`.

---

### Issue #3: Edit Project Not Loading Data
**Problem:** Edit modal opened but fields were empty.

**Root Cause:** 
- Used `projectCreateSchema` for both create and edit modes
- Passed partial data instead of full Project object


### Issue #4: Edit Task Not Loading Data
**Problem:** Task edit modal didn't populate with task data.

**Root Cause:** `defaultValues` in useForm doesn't update when props change.

##  Key Learnings & Patterns

### Next.js 16 Breaking Changes
**Must await params and searchParams:**
### Server Component Caching Control
### Client-Side Mutations with Server Refresh
### Form State Management with React Hook Form

## Architecture Decisions

### Why Mock Server Instead of Real API?
- Fast prototyping without backend setup
- Realistic delays simulate real network
- Easy to add more data for testing
- Can be replaced with real API later

### Why React Hook Form + Zod?
- Type-safe validation with TypeScript
- Better performance than uncontrolled forms
- Easy error handling and display
- Integrates well with Zod schemas

### Why Separate Schemas for Create/Update?
- Create: All fields required
- Update: All fields optional + status field
- Better TypeScript inference
- Clearer API contracts

### Why Force Dynamic Pages?
- Filters and search need fresh data
- Pagination can't be statically generated
- User-specific data changes frequently
- Trade-off: Slower initial load but always fresh


##  Common Errors & Solutions

### Error: `params` is a Promise
**Fix:** Change type to `Promise<{}>` and `await` it.

### Error: Cards not updating after filter
**Fix:** Add `router.refresh()` and `dynamic = 'force-dynamic'`.


##  Next Steps (Day 13)
- SEO and performance in Next