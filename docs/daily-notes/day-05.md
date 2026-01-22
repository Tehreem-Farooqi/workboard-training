# Day 5: Client State Management with Zustand

**Date Completed:** December 31, 2025

## What I Built Today

### Core Features
- Implemented authentication store using Zustand
  - Manages user and token state
  - Provides login and logout actions
- Implemented UI store for global UI concerns
  - Toast notifications
  - Modal visibility state
- Replaced Context API usage with centralized Zustand stores
- Implemented toast notification system
  - Supports Success, Error, Info, and Warning types
  - Auto-dismiss behavior
- Enabled global state access without prop drilling
- Stored authentication token in memory by default for improved security

---

## Architecture Decisions and Trade-offs

### State Management Approach
- Adopted Zustand for centralized client-side state management
- Scope intentionally limited to two small and focused stores:
  - `authStore`
    - Handles authentication state only
    - User object
    - Token
    - Login and logout actions
  - `uiStore`
    - Handles UI-related global state only
    - Toast notifications
    - Modal open/close state

---

### Why Zustand Was Chosen

**Benefits**
- Eliminates prop drilling for global concerns
- Selector-based subscriptions reduce unnecessary re-renders
- Minimal boilerplate compared to Redux or Context with useReducer
- Easy integration with developer tools for debugging

**Trade-offs and Mitigations**
- Risk of tight coupling due to centralized state
  - Mitigation: Kept domain data such as projects and form state local
- Risk of creating large and unmaintainable stores
  - Mitigation: Enforced strict separation of concerns
  - `authStore` has no knowledge of UI
  - `uiStore` has no knowledge of application data

---

## Decision Framework for State Placement

- Authentication state
  - Stored in `authStore`
  - Required across routes, layout, and API interactions
- Global UI feedback
  - Stored in `uiStore`
  - Toasts need to be triggered from deeply nested components
- Form state
  - Managed with React Hook Form
  - Ephemeral and validation-heavy
- Page-specific data (e.g., projects list)
  - Kept in local component state using `useState`
  - Ownership remains with the page responsible for fetching the data
- Simple UI toggles
  - Kept local using `useState`
  - Does not affect other parts of the application

---

## What I Learned

### Zustand Fundamentals

**Creating a Store**
```ts
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state) => ({ bears: state.bears + 1 })),
}));
````

**Using a Store with Selectors**

```ts
const bears = useStore((state) => state.bears);
```

### Key Differences Compared to Context API

* No Provider wrappers required in the application root
* Fine-grained subscriptions using selectors
* State and actions are colocated, improving clarity

---

## Challenges and Solutions

### Tight Coupling Concerns

* Concern raised about overusing Zustand for all application state
* Resolution:

  * Verified that project data remains in page-level state
  * Centralized only authentication and global UI feedback
  * Documented these boundaries clearly for future contributors

---

### Token Storage Strategy

* Challenge: Balancing security with usability
* Implementation:

  * Token stored in memory inside `authStore`
  * User initialized from `sessionStorage` during store initialization
  * Session data clears automatically on tab close
* Trade-off:

  * User may need to re-authenticate after a full refresh
  * Acceptable for this training-focused application

---

### Toast Animation Experience

* Issue: Toasts appeared abruptly
* Solution:

  * Added slide-in keyframe animation in `index.css`
  * Applied animation to the Toast component

---

## What’s Next (Day 6)

* create API client wrapper and error normalization.
* Implement projects list query and project detail query.
* Implement create/update mutations with invalidation.

---

## Notes for Future Reference

* Keep state local if it is only used by a single component and its children
* Promote state to Zustand only when it is truly global
* Always use selectors such as `state => state.user`
* Avoid subscribing to entire store objects to prevent unnecessary re-renders
