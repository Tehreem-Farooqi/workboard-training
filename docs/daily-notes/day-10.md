# Day 10: Testing - Vitest + React Testing Library + MSW

**Date**: January 9, 2026

## Results
 **9 test files | 33 tests passed**  
 **Coverage**: ~35-37% overall, 100% on tested modules  
 **Non-flaky, reliable tests**  
 **MSW covers success/error states**

---

## Test Coverage

```
File                     % Stmts   % Branch   % Funcs   % Lines
All files                 34.66      37.1      34.86     37.2
  stores/                  100        80        100       100
  utils/secureStorage      100       100        100       100
  hooks/useDebounce        100        75        100       100
  components/forms         100        75        100       100
```

---

## What Was Tested

**Unit Tests (13 tests)**
- `authStore` - login, logout, state
- `uiStore` - toasts add/remove
- `secureStorage` - localStorage wrapper
- `useDebounce` - debounce logic (2 test files)

**Component Tests (14 tests)**
- `FormInput` - label, error, onChange, disabled, required
- `TaskCard` - render, edit, delete, status
- `ProjectFilters` - search, filters

**Integration Tests (6 tests)**
- `useProjects` - fetch, loading states

---

## Tech Stack

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - API mocking
- **happy-dom** - Fast DOM environment
- **@testing-library/user-event** - User interactions

---

## Commands

```bash
npm run test              # Watch mode
npm run test:run          # CI mode
npm run test:ui           # UI interface
npm run test:coverage     # Coverage report
```

## MSW Configuration

**Handlers**: Mock Projects and Tasks CRUD operations
- GET, POST, PUT, DELETE endpoints
- Success and 404/500 error states
- Simulated network delays

**Usage**:
- Tests: Auto-configured via `setup.ts`
- Dev mode: Optional via `VITE_USE_MSW=true`

---

## Key Implementation Details

1. **vitest.config.ts** - ES modules, path alias, coverage
2. **Custom render** - Wraps components with Router + React Query
3. **Type-safe imports** - `import type` for TS types
4. **Fake timers with act()** - For debounce tests, wrapped in act()
5. **MSW service worker** - Generated via `npx msw init public/`

---

## Issues Resolved

1. ES module `__dirname` → `fileURLToPath(import.meta.url)`
2. Render export conflict → Renamed internal import
3. jest-dom matchers → Added type declarations
4. Component prop mismatches → Fixed to actual APIs
5. MSW response shape → Matched real API structure
6. Debounce with fake timers → Wrapped `advanceTimersByTime` in `act()`

---

## CI/CD Ready

`.github/workflows/test.yml` configured for:
- Node.js 18
- `npm ci` install
- `npm run test:run`
- `npm run test:coverage`
- Codecov upload

---

## Notes

- Tests run in ~15s (coverage mode)
- Zero flaky tests
- Coverage in `coverage/` dir
- MSW optional for dev mode
- Vitest UI available at `npm run test:ui`

---

## Tomorrow 
- Day 11: Next.js App Router basics - routing and layouts
