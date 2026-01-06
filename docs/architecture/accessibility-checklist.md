# Accessibility Checklist

## Keyboard Navigation

- All interactive elements are keyboard accessible (Tab, Enter, Space)
-  Modals can be closed with Escape key
-  No keyboard traps - users can navigate in and out of all components
- Skip to main content link for keyboard users
- Visible focus indicators on all interactive elements
- Logical tab order follows visual layout

## Focus Management

-  Focus trapped inside modals when open
-  Focus returns to trigger element when modal closes
-  Focus moves to first form field when modal opens
-  Focus outline visible with 2px ring on all interactive elements

## ARIA Attributes

-  `role="dialog"` and `aria-modal="true"` on modals
-  `aria-labelledby` links modal titles to dialogs
-  `aria-label` on icon-only buttons
-  `aria-describedby` links form inputs to error/helper text
-  `aria-invalid` on form fields with validation errors
-  `aria-live` regions for dynamic content announcements
-  `aria-current="page"` on active navigation items
-  `aria-busy` on buttons with loading states
-  `role="alert"` on error messages

## Semantic HTML

-  Proper heading hierarchy (h1 > h2 > h3)
-  Semantic landmarks: `<header>`, `<nav>`, `<main>`
-  `role="banner"` on site header
-  `role="navigation"` with `aria-label` on nav elements
-  `role="main"` on main content area
-  Form labels properly associated with inputs


## Color and Contrast

- Text contrast meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements have sufficient color contrast
- Error states not conveyed by color alone (includes text)
- Focus indicators visible against all backgrounds

## Forms

- Required fields marked with asterisk and `required` attribute
- Error messages specific and actionable
- Errors linked to form fields with `aria-describedby`
- Form validation errors announced to screen readers
- Helper text provided where needed

## Testing Performed

- Keyboard-only navigation through all pages
- Screen reader testing (NVDA/JAWS)
- High contrast mode compatibility
- Zoom to 200% without horizontal scroll
- Focus management in modals verified
- All interactive elements reachable via keyboard

## Known Limitations

None identified.

## Future Improvements

- Consider adding reduced motion support for animations
- Add language attribute to HTML root element
- Implement more comprehensive ARIA live region announcements for task updates
- Add keyboard shortcuts documentation for power users
