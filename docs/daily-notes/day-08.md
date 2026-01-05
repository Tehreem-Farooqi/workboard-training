# Day 8: Search, Filters, Pagination & Virtualization

**Date Completed**: January 5, 2026

## What I Built Today

### Core Features
-  Debounced search for projects and tasks
-  Filter components (ProjectFilters, TaskFilters)
-  URL query parameter persistence
-  Pagination component with navigation
-  Virtual scrolling for large task lists
-  Filter state management with URL sync

##  What I Learned

### 1. Debouncing Prevents Network Spam
**Problem**: Every keystroke triggers an API call
**Solution**: `use-debounce` delays the API call until user stops typing

### 2. URL Query Params Make Filters Shareable
**Problem**: Filters reset on page reload or URL share
**Solution**: Store filters in URL query parameters


### 3. Local State + Debounced State Pattern
**Key Insight**: Use two states for search
- **Local state**: Updates immediately (instant UI feedback)
- **Debounced state**: Used for API calls (prevents spam)

### 4. React Query Cache Keys Must Include Filters
**Problem**: Changing filters doesn't refetch data
**Solution**: Include filters in query key

### 5. Virtual Scrolling for Performance
**Problem**: Rendering 100+ tasks causes lag
**Solution**: `@tanstack/react-virtual` only renders visible items

### 6. useMemo for Derived State
**Pattern**: Use `useMemo` for URL sync side effects

# Blazor vs React: Filtering & Pagination

- **Search Debounce**
  - Blazor: Custom timer / `Task.Delay`
  - React: `use-debounce` library

- **URL Params**
  - Blazor: `NavigationManager` query parsing
  - React: `useSearchParams` (react-router)

- **Filter State**
  - Blazor: Component state + `EventCallback`
  - React: Local state + URL sync

- **Pagination**
  - Blazor: `PaginationState` component
  - React: Custom pagination component

- **Virtual Scroll**
  - Blazor: Built-in `Virtualize`
  - React: `@tanstack/react-virtual`

- **API Filtering**
  - Blazor: OData / query params
  - React: `URLSearchParams`

- **Cache Invalidation**
  - Blazor: Manual refresh
  - React: React Query (automatic)


**Key Difference**: Blazor has built-in `Virtualize` component; React needs external library but more flexible.

##  Challenges & Solutions

- Challenge 1: TypeScript Errors in VirtualTaskColumn

- Challenge 2: TaskCard onStatusChange Type Mismatch

- Challenge 3: Card Component Doesn't Accept onClick

## Day 9: Accessibility and UX polish
- Keyboard navigation pass: modals, forms, menus.
- Focus management and escape-to-close for modals.
- A11y notes: headings, landmarks, contrast.

##  Personal Notes

- Debouncing is crucial for good UX and performance
- URL state management is more powerful than I initially thought
- Virtual scrolling is impressive but adds complexity
- React Query's caching with filters is elegant
- TypeScript really helps catch prop mismatches early
- The local state + debounced state pattern is very useful
