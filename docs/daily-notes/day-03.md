
## What I Built Today

### Core Features
- Multi-page navigation with React Router v6
- Login page with form handling
- Dashboard page with stats cards
- Projects list page
- Project detail page (with URL parameters)
- 404 Not Found page
- Protected routes (authentication required)
- Active navigation styling
- Centralized auth state management
- Secure storage utility

### Routes Implemented
| Route | Type | Description |
|-------|------|-------------|
| `/login` | Public | Login page |
| `/dashboard` | Protected | Dashboard with stats |
| `/projects` | Protected | Projects list |
| `/projects/:projectId` | Protected | Individual project details |
| `/` | Redirect | Redirects to `/dashboard` |
| `*` | 404 | Not found page |

---
##  What I Learned

### React Router Concepts

#### 1. Routes and Navigation
#### 2. URL Parameters
#### 3. Location State

### Secure Storage Implementation

Created a custom `secureStorage` utility that:
- Wraps `sessionStorage` for better security
- Provides type-safe methods
- Handles JSON serialization automatically
- Includes error handling
- Easy to test and maintain

## Team Lead Review & Improvements

### Initial Feedback Received
> "I think auth state is missing here. And try to use secureStorage instead of localStorage where needed."

### Issues Identified
1.  No centralized auth state management
2.  Using `localStorage` directly (security concern)
3.  No user data available in components
4.  No loading states during auth check

### Improvements Made

#### 1. Created secureStorage Utility
**What**: Custom utility class wrapping sessionStorage
**Benefits**:
- More secure (cleared on tab close)
- Type-safe with TypeScript generics
- Automatic JSON handling
- Built-in error handling

#### 2. Implemented AuthContext
**Why**: Centralized auth state management
**What**: React Context + custom hook pattern
**Benefits**:
- Single source of truth for auth
- User data available everywhere
- No prop drilling
- Easy to test

#### 3. Added Loading States
**Why**: Better UX during auth checks
**What**: Loading spinner while checking session
**Benefits**:
- No flash of wrong content
- Professional user experience

## Blazor Concepts

- **`@page "/projects"`**  
  Defines a route (URL) for a Blazor component

- **`NavigationManager.NavigateTo("/path")`**  
  Used for programmatic navigation

- **`[Parameter] public string Id`**  
  Receives route (URL) parameters

- **`NavLink`**  
  Creates navigation links

- **`CascadingValue`**  
  Shares state/data with child components

- **`[CascadingParameter]`**  
  Consumes shared state/data

- **`OnInitialized()`**  
  Runs when the component loads

- **`StateHasChanged()`**  
  Manually triggers UI refresh


## 🔹 React Router / React Concepts

- **`<Route path="/projects" />`**  
  Defines a route in React Router

- **`navigate("/path")`**  
  Used for programmatic navigation

- **`const { id } = useParams()`**  
  Accesses URL parameters

- **`Link`**  
  Creates navigation links

- **`Context.Provider`**  
  Shares state/data with child components

- **`useContext()`**  
  Consumes shared state/data

- **`useEffect(() => {}, [])`**  
  Runs when component mounts

- **Automatic re-render**  
  UI updates automatically when state changes


##  Challenges & Solutions

### Challenge 1: Understanding Context API
**Problem**: Confused about when to use Context vs props
**Solution**: Context is for data needed by many components (like auth). Props are for parent-child communication.

### Challenge 2: sessionStorage vs localStorage
**Problem**: Didn't understand the security difference
**Solution**: 
- `sessionStorage` = Cleared on tab close (more secure)
- `localStorage` = Persists forever (less secure)
- Use sessionStorage for sensitive data like tokens

### Challenge 3: Protected Routes Pattern
**Problem**: How to redirect and return to original page
**Solution**: Save location in state, redirect back after login


##  Important Learnings

### 1. React Router is Declarative
You declare routes, React Router handles the rest. No manual URL parsing needed.

### 2. Context Prevents Prop Drilling
Instead of passing auth through every component, Context makes it available anywhere.

### 3. Custom Hooks Encapsulate Logic
`useAuth()` hides Context complexity and provides clean API.

### 5. Security Best Practices
- Never store sensitive data in localStorage
- Use sessionStorage for tokens
- Clear storage on logout
- Validate on both client and server


## What's Next (Day 4)

Tomorrow I'll work on:
- React Hook Form for better form handling
- Zod for schema validation
- Build proper forms for creating/editing projects
- Form field components with validation
- Accessible error messages

## Notes for Future Me

### Remember:
- Always wrap app in `AuthProvider` before `BrowserRouter`
- Use `useAuth()` hook, never `useContext(AuthContext)` directly
- Protected routes need loading state check
- Save location state for post-login redirect
- sessionStorage is cleared on tab close (by design)

### Don't Forget:
- When adding real API, replace mock login with actual endpoint
- Store JWT token in secureStorage
- Add token refresh logic
- Implement proper error handling for network failures

