# Toast Notification System - Implementation Guide

## Overview

This document describes the complete toast notification system implementation with support for multiple toasts, stacking animations, and hover effects.

## Features

✅ **Multiple Toasts**: Show multiple notifications simultaneously  
✅ **Stacked Animation**: Toasts stack with a card-deck effect (scale + opacity)  
✅ **Hover to Expand**: Hover over toasts to see all notifications vertically  
✅ **Auto-dismiss**: Configurable auto-dismiss duration (default: 5s)  
✅ **Customizable Width**: Four width options (sm, md, lg, full)  
✅ **Smooth Animations**: Framer Motion powered transitions  
✅ **Mobile Responsive**: Automatically adjusts to screen size  
✅ **Hidden Counter**: Shows "+N more" when more than 3 toasts exist  

## Architecture

### Components

#### 1. `Toast.tsx` - Individual Toast Component
- Displays a single toast notification
- Supports two modes: **standalone** and **container**
- Standalone mode: Self-positioning with fixed positioning
- Container mode: Renders without positioning (managed by ToastContainer)

**Props:**
```typescript
interface ToastProps {
  isOpen: boolean
  onClose: () => void
  variant?: 'success' | 'warning' | 'danger' | 'info'
  title: string
  message: string
  duration?: number
  showCloseButton?: boolean
  width?: 'sm' | 'md' | 'lg' | 'full'
  standalone?: boolean
}
```

#### 2. `ToastContainer.tsx` - Toast Manager
- Manages multiple toasts
- Handles stacking animations
- Implements hover-to-expand behavior
- Shows hidden count indicator

**Props:**
```typescript
interface ToastContainerProps {
  toasts: ToastItem[]
  onClose: (id: string) => void
  maxVisible?: number // Default: 3
}
```

#### 3. `useToast.tsx` - Toast Hook
- State management for toasts
- Provides helper methods for showing toasts
- Auto-generates unique IDs
- Handles auto-dismiss timing

**API:**
```typescript
const {
  toasts,           // Array of active toasts
  success,          // Show success toast
  warning,          // Show warning toast
  danger,           // Show danger toast
  info,             // Show info toast
  removeToast,      // Remove specific toast
  clearAllToasts,   // Remove all toasts
} = useToast()
```

## Usage Examples

### Basic Usage

```typescript
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/ui/ToastContainer'

function MyComponent() {
  const { toasts, success, removeToast } = useToast()
  
  const handleClick = () => {
    success('Success!', 'Your action was completed')
  }
  
  return (
    <>
      <button onClick={handleClick}>Show Toast</button>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}
```

### Multiple Toasts

```typescript
function showMultipleToasts() {
  const { success, warning, danger, info } = useToast()
  
  success('Success!', 'First notification')
  warning('Warning!', 'Second notification')
  danger('Error!', 'Third notification')
  info('Info', 'Fourth notification')
}
```

### Custom Width and Duration

```typescript
// Small width, 3 second duration
success('Quick!', 'This disappears quickly', 'sm', 3000)

// Large width, 10 second duration
info('Important', 'Read this carefully', 'lg', 10000)

// Full width, default duration
warning('Wide Alert', 'This spans the full width', 'full')
```

### Standalone Toast (Single Toast)

```typescript
import { Toast } from '@/components/ui/Toast'

function SingleToastComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Toast
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      variant="success"
      title="Success!"
      message="Your action was completed"
      standalone={true} // This is the default
    />
  )
}
```

## Animation Details

### Stacking Animation (Default State)
- **Top Toast**: Full opacity (1), no offset, full scale (1)
- **2nd Toast**: 60% opacity, 12px offset down, 95% scale
- **3rd Toast**: 40% opacity, 24px offset down, 90% scale
- **Hidden Toasts**: Not rendered, shown in "+N more" indicator

### Hover State
- **All Toasts**: Full opacity (1), full scale (1)
- **Vertical Spacing**: 80px between each toast
- **Transition**: Smooth 300ms ease-out animation

### Entry/Exit Animations
- **Entry**: Slide up from bottom (y: 100 → 0) with fade in
- **Exit**: Slide down to bottom (y: 0 → 100) with fade out
- **Duration**: 400ms with custom easing curve

## Width Configuration

| Size   | Desktop Max-Width | Tailwind Class  | Use Case                    |
|--------|-------------------|-----------------|------------------------------|
| `sm`   | 384px            | `sm:max-w-sm`   | Short messages              |
| `md`   | 448px            | `sm:max-w-md`   | Standard notifications (default) |
| `lg`   | 512px            | `sm:max-w-lg`   | Longer content              |
| `full` | 672px            | `sm:max-w-2xl`  | Maximum content display     |

**Mobile**: All toasts use `max-w-[calc(100%-2rem)]` for proper padding

## Styling

### Color Variants

**Success** (Green):
- Icon Background: `bg-green-500/15`
- Icon Color: `text-green-300`

**Warning** (Yellow):
- Icon Background: `bg-yellow-500/15`
- Icon Color: `text-yellow-300`

**Danger** (Red):
- Icon Background: `bg-red-500/15`
- Icon Color: `text-red-300`

**Info** (Blue):
- Icon Background: `bg-blue-500/15`
- Icon Color: `text-blue-300`

### Toast Card Style
```css
background: #141118
border: 1px solid rgba(255, 255, 255, 0.1)
backdrop-filter: blur(xl)
box-shadow: 0 18px 60px rgba(0, 0, 0, 0.75)
border-radius: 12px (mobile) / 16px (desktop)
padding: 10px 12px (mobile) / 12px 16px (desktop)
```

## Best Practices

### Do's ✅
- Use appropriate variants for different message types
- Keep titles short and descriptive (max 50 characters)
- Use custom durations for important messages (longer) or quick updates (shorter)
- Test with multiple toasts to ensure stacking works correctly
- Use the hover effect to let users review multiple notifications

### Don'ts ❌
- Don't spam toasts - batch similar notifications
- Don't use very long messages (use modals for detailed content)
- Don't set duration to 0 unless you want permanent toasts
- Don't forget to render the ToastContainer component
- Don't use toasts for critical errors (use modals instead)

## Performance Considerations

- **Auto-cleanup**: Toasts automatically remove themselves after duration
- **Max Visible**: Only 3 toasts rendered at once (configurable)
- **Efficient Animations**: Uses transform and opacity (GPU-accelerated)
- **Layout Animations**: Framer Motion's `layout` prop for smooth reordering
- **Unique IDs**: Prevents duplicate toasts and enables proper React keys

## Accessibility

- **Close Button**: Includes `aria-label="Close notification"`
- **Keyboard Navigation**: Close button is keyboard accessible
- **Screen Readers**: Title and message are properly structured
- **Focus Management**: Toasts don't trap focus
- **Color Contrast**: All text meets WCAG AA standards

## Migration from Old System

If you're migrating from the old single-toast system:

### Old Code
```typescript
const { toast, closeToast } = useToast()

<Toast
  isOpen={toast.isOpen}
  onClose={closeToast}
  variant={toast.variant}
  title={toast.title}
  message={toast.message}
  width={toast.width}
/>
```

### New Code
```typescript
const { toasts, removeToast } = useToast()

<ToastContainer toasts={toasts} onClose={removeToast} />
```

**Note**: The old standalone Toast component still works for single-toast use cases!

## Testing

See `components/examples/ToastExample.tsx` for a complete interactive demo.

## Files Modified/Created

### Created
- `components/ui/ToastContainer.tsx` - Toast container component
- `components/examples/ToastExample.tsx` - Example/demo component
- `TOAST_IMPLEMENTATION.md` - This documentation

### Modified
- `components/ui/Toast.tsx` - Added standalone mode and width support
- `hooks/useToast.tsx` - Updated to support multiple toasts
- `components/chat/Sidebar.tsx` - Updated to use ToastContainer
- `README.md` - Added toast documentation

## Future Enhancements

Possible improvements for future versions:
- [ ] Toast positioning options (top, bottom, top-right, etc.)
- [ ] Custom icons for toasts
- [ ] Progress bar for auto-dismiss countdown
- [ ] Action buttons in toasts
- [ ] Toast queue with rate limiting
- [ ] Persistent toasts (saved to localStorage)
- [ ] Toast groups/categories
- [ ] Sound effects for different variants
- [ ] Swipe to dismiss on mobile

