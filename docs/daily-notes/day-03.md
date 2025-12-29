# Day 3: React Router - Navigation and Protected Routes
## What I Built
- Login page
- Dashboard page
- Projects list page
- Project detail page (with URL params)
- 404 page
- Protected route wrapper
- Active navigation styling
## What I Learned
- **React Router**: Like NavigationManager in Blazor
- **Routes**: Like @page in Blazor
- **useNavigate**: Programmatic navigation
- **useParams**: Get URL parameters (like [Parameter] from route)
- **useLocation**: Get current route info
- **Link**: Like NavLink in Blazor
- **Navigate component**: Redirect component
## Blazor vs React Router

**Blazor:**
- `@page "/projects"`
- `NavigationManager.NavigateTo()`
- `[Parameter] public string Id`
- `NavLink`

**React Router:**
- `<Route path="/projects" />`
- `navigate('/path')`
- `const { id } = useParams()`
- `Link`
## Tomorrow
- React Hook Form for better form handling
- Zod for validation
- Build real forms for projects and tasks