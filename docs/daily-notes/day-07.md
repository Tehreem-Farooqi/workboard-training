# Day 7: Tasks Feature - CRUD + Status Transitions (Kanban Basics)

**Date Completed**: January 2, 2026

##  What I Built Today

### Core Features
-  Task CRUD operations (Create, Read, Update, Delete)
-  Task status transitions (todo → doing → done)
-  Kanban board with three columns
-  Optimistic UI updates with automatic rollback
-  Task form with validation (title, description, status, priority)
-  Task filtering by status
-  Real-time task count per column
-  Task priority badges (low, medium, high)
-  Mock API endpoints for tasks
-  Custom hook for task management (useTasks)


##  What I Learned

### Optimistic UI Pattern

**What it is**: Update UI immediately before server responds

**Why it matters**: Better perceived performance, app feels instant

**How it works**:
1. Create temporary task with temp ID (`temp-${Date.now()}`)
2. Add to local state immediately
3. Send request to server
4. On success: Replace temp task with real one
5. On error: Remove temp task (rollback)


### Key Concepts

1. **Optimistic Updates**: UI updates before server confirmation
2. **Rollback on Error**: Revert changes if server request fails
3. **Grouped Data**: Tasks organized by status using `reduce()`
4. **Loading States**: Visual feedback for pending operations
5. **Form Reset**: Clear form after submit or when switching tasks

##  Challenges & Solutions

### Challenge 1: Schema Optional Fields
**Problem**: Zod `.optional().default()` caused resolver type conflicts
**Solution**: Removed `.optional()` and `.default()` - let form handle defaults

### Challenge 2: projectId Unused Warning
**Problem**: TaskFormModal received `projectId` but never used it
**Solution**: Removed from props since it's not needed in the form component

---

##  Important Learnings

### 1. Optimistic UI Improves UX
Users see immediate feedback. Even with 800ms delay, app feels instant because UI updates immediately.

### 2. Always Store Old State for Rollback
Before optimistic update, capture current state. If request fails, restore it.

### 3. Temporary IDs Must Be Unique
Use `temp-${Date.now()}` to avoid collisions. Check `id.startsWith('temp-')` to show loading state.

### 4. Array Operations Are Immutable
Never mutate state directly. Always use:
- `[...prev, newItem]` to add
- `prev.filter()` to remove
- `prev.map()` to update

### 5. useCallback Dependencies Matter
If callback uses state from closure, include in dependency array. Otherwise, stale closures cause bugs.

### 6. Form Reset Timing is Critical
Reset form AFTER successful submit AND when modal closes. Use `useEffect` to reset when modal opens.

---

##  What's Next (Day 8)
- Add debounced search and filters on tasks/projects.
- Add pagination on projects list OR virtualization on large task lists.
- Persist filter state in URL query params (React Router).

##  Notes for Future Me

### Remember:
- Optimistic UI = better UX, but always implement rollback
- Temporary IDs need unique generation (`Date.now()` works)
- `useCallback` dependencies prevent stale closures
- Array immutability: use spread, map, filter - never mutate
- Form reset needs `useEffect` when modal opens/closes
- Toast notifications keep users informed of all actions

### Don't Forget:
- Test rollback by simulating network errors
- Visual indicator for optimistic updates (opacity, spinner)
- Disable actions on optimistic items (`isOptimistic` check)
- Network delay simulation helps test UX (`delay()` function)
- Confirmation dialogs for destructive actions (delete)

