# Day 4: Forms and Validation - React Hook Form + Zod

**Date Completed**: December 30, 2025

##  What I Built Today

### Core Features
-  React Hook Form integration
-  Zod schema validation
-  Enhanced Login form with validation
-  Project Create form with modal
-  Project Edit form with modal
-  Reusable form components (FormInput, FormTextarea)
-  Accessible error messages with ARIA attributes
-  Form state management

##  What I Learned

### React Hook Form Basics

### Zod Schema Validation

### Key Concepts

1. **Controlled Forms**: React Hook Form manages form state
2. **Schema Validation**: Zod validates data structure
3. **Type Safety**: TypeScript types inferred from schemas
4. **Accessibility**: ARIA attributes for screen readers
5. **UX**: Disabled states, loading indicators, error messages

---

##  Blazor vs React Forms

- **Form Wrapper**
  - Blazor: `<EditForm Model="@model">`
  - React: `<form onSubmit={handleSubmit(onSubmit)}>`

- **Input Binding**
  - Blazor: `@bind-Value` (two-way binding)
  - React: `register()` (controlled via React Hook Form)

- **Validation Display**
  - Blazor: `<ValidationMessage />`
  - React: `errors.field?.message`

- **Validation Logic**
  - Blazor: `DataAnnotations` (C# attributes)
  - React: Zod schema (JavaScript)

- **Submit Handling**
  - Blazor: `OnValidSubmit`
  - React: `handleSubmit(onSubmit)`

- **Required Field**
  - Blazor: `[Required]`
  - React: `z.string().min(1)`

- **Email Validation**
  - Blazor: `[EmailAddress]`
  - React: `z.string().email()`

## Challenges & Solutions

### Challenge 1: Form Not Opening
**Problem**: "New Project" button didn't work
**Solution**: Missing `onClick` handler and state management. Added `useState` for modal state.

### Challenge 2: Understanding React Hook Form
**Problem**: Different from Blazor's two-way binding
**Solution**: RHF uses `register()` to connect inputs. No manual state needed.

### Challenge 3: Zod Schema Syntax
**Problem**: Optional fields validation
**Solution**: Use `.optional()` or `.or(z.literal(''))` for optional strings.


##  Important Learnings

### 1. React Hook Form is Uncontrolled
Unlike Blazor's `@bind-Value`, RHF uses refs internally. You don't manage state manually.

### 2. Zod Provides Type Safety
The schema defines both validation AND TypeScript types. One source of truth.

### 3. Accessibility is Built-In
FormInput/FormTextarea components handle ARIA attributes automatically.

### 4. Form State is Automatic
`isSubmitting`, `errors`, `isDirty` - all managed by RHF.

### 5. Validation Happens on Submit
By default, validation runs on submit. Can configure for `onChange` or `onBlur`.


## What's Next (Day 5)

Tomorrow I'll work on:
- Zustand for global state management
- UI state (toasts, modals)
- Shared state across components
- Better state organization

---

## Notes for Future Me

### Remember:
- Always use `zodResolver` to connect Zod with RHF
- Use `{...register('fieldName')}` to connect inputs
- `formState.errors` contains all validation errors
- `isSubmitting` is perfect for disabling buttons
- Zod schemas can be reused for TypeScript types

### Don't Forget:
- When adding real API, handle async validation
- Add loading states for better UX
- Consider `onBlur` validation for better feedback
- Test with keyboard and screen readers

---
