# Day 6 – Server State with TanStack Query 

## What I Learned: Client State vs Server State

### Server State
- Comes from backend (not owned by UI)
- Can become stale or change externally
- Asynchronous by nature
- Requires caching, refetching, and invalidation
- Best handled using **TanStack Query**

### Client State
- Fully controlled by the UI
- Always in sync
- Synchronous
- No caching required
- Used for auth, modals, and UI-related state

> Don’t manage server data with `useState`  
> Use TanStack Query for API-driven data

## Important Things to Remember

- **Query keys act as cache addresses**
  - Structured keys enable safe group invalidation
- **Always invalidate after mutations**
  ```ts
  queryClient.invalidateQueries({ queryKey: ['projects'] })

- **Mutations should refresh UI automatically**


**Challenges Faced**
- TypeScript restriction

- Parameter property shorthand not allowed

- Fixed by defining class fields explicitly

- Component limitation

- Card component didn’t support onClick

- Solved using wrapper div (composition pattern)

**Key Wins**

- Centralized API client with normalized errors

- Query key factory prevented cache bugs

- Mock API enabled frontend development without backend

**Clear separation of responsibilities:**

- Server state → TanStack Query

- Client state → Zustand

- Form state → React Hook Form

**Next Day Plan (Day 7)**
- Tasks feature: CRUD + status transitions (Kanban basics)