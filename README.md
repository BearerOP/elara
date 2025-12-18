![Elara Gradient](public/images/elara-gradient.svg)

A modern fashion styling platform built with Next.js, featuring an interactive onboarding flow and chat interface.

## Overview

Elara is a fashion styling application that helps users discover their personal style through an engaging onboarding experience. The platform includes a multi-step onboarding flow with interactive card swiping, style preferences, and a chat interface for personalized fashion recommendations.

## Features

### Authentication & Onboarding
- **Landing Page**: Modern hero section with gradient backgrounds
- **Signup Flow**: Multi-step signup with OAuth (Google, Apple) and email/password options
- **Login Flow**: Streamlined email/password authentication
- **Onboarding**: 10-step interactive onboarding process including:
  - Style preference selection
  - Gender and age selection
  - Body type selection (Ectomorph, Mesomorph, Endomorph)
  - Height, weight, and fit preferences
  - Interactive style card swiping with drag gestures
  - Image upload for color tone matching

### Chat Interface
- Full-featured chat interface with sidebar navigation
- File upload support (images, max 5MB)
- Typewriter effect on input placeholders
- Responsive design with smooth animations
- Toast notifications with customizable width

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
elara-web-app/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── signup/
│   │   └── page.tsx            # Signup page
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── chat/
│       └── page.tsx            # Chat interface
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ChatInput.tsx
│   │   ├── SignupChatInput.tsx
│   │   └── Logo.tsx
│   ├── chat/                   # Chat interface components
│   │   ├── ChatInterface.tsx
│   │   ├── ChatInterfaceWithOnboarding.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── Sidebar.tsx
│   │   └── WardrobeCard.tsx
│   ├── onboarding/             # Onboarding flow components
│   │   ├── OnboardingModal.tsx
│   │   ├── WelcomeModal.tsx
│   │   ├── OnboardingStep1.tsx # Style preference selection
│   │   ├── OnboardingStep2.tsx # Gender selection
│   │   ├── OnboardingStep3.tsx # Color tone & image upload
│   │   ├── OnboardingStep4.tsx # Body type selection
│   │   ├── OnboardingStep5.tsx # Height, weight, fit preferences
│   │   ├── OnboardingStep6.tsx # Style card swiping
│   │   └── CardStack.tsx       # Reusable swipeable card component
│   ├── LandingPage.tsx
│   ├── SignupPage.tsx
│   └── LoginPage.tsx
├── lib/
│   └── utils.ts                # Utility functions
├── public/
│   └── images/                 # Image assets
│       ├── onboarding/
│       └── ...
└── tailwind.config.ts          # Tailwind configuration
```

## Application Flow

### 1. Landing Page (`/`)
- Hero section with gradient background
- Navigation to signup/login

### 2. Signup Flow (`/signup`)
- **Step 1**: OAuth options (Google, Apple) or email entry
- **Step 2**: Password creation (if email selected)
- **Step 3**: Email verification (integrated)

### 3. Login Flow (`/login`)
- Email entry
- Password entry
- Redirects to chat interface

### 4. Chat Interface (`/chat`)
- **Welcome Modal**: Initial welcome screen
- **Onboarding Modal**: 10-step onboarding process
  - Step 1: Style preference selection
  - Step 2: Gender selection
  - Step 3: Color tone selection & image upload
  - Step 4: Body type selection
  - Step 5: Height, weight, and fit preferences
  - Step 6: Interactive style card swiping
  - Steps 7-10: (Future steps)
- **Chat Interface**: Main chat functionality

## Key Components

### CardStack
Reusable component for swipeable card interactions:
- Drag gestures (mouse and touch)
- Button controls (like/dislike)
- Stack effect with scaled and translated cards
- Random card rotations
- Smooth animations

### Onboarding Steps
Each step is a self-contained component with:
- Consistent layout (logo, step indicator, title, subtitle)
- Smooth transitions using Motion `layoutId`
- Skip and continue functionality
- State management

## Design System

### Colors
- Custom color palette with dark theme
- Gradient backgrounds
- Semi-transparent overlays

### Typography
- System fonts with custom font families - Outfit Font
- Consistent text sizing and weights

### Spacing
- 8px base unit
- Consistent spacing scale (8, 12, 16, 20, 24, 32, 48, 64)

### Border Radius
- Cards: `rounded-3xl` (24px)
- Buttons: `rounded-2xl` (16px)
- Inputs: `rounded-xl` (12px)

### Animations
- Framer Motion for all transitions
- Smooth page transitions
- Micro-interactions on interactive elements
- Layout animations for shared elements

## Development Notes

### File Upload
- Maximum file size: 5MB
- Supported formats: Images
- Oversized files are automatically skipped

### State Management
- React hooks for local state
- No global state management library (can be added if needed)

### Toast Notifications
The application includes a powerful toast notification system with support for multiple toasts, stacking animations, and hover effects.

#### Features
- **Multiple Toasts**: Show multiple notifications simultaneously
- **Stacked Animation**: Toasts stack on top of each other with a card-deck effect
- **Hover to Expand**: Hover over toasts to see all notifications vertically
- **Auto-dismiss**: Configurable auto-dismiss duration
- **Customizable Width**: Four width options for different content needs
- **Smooth Animations**: Framer Motion powered transitions

#### Usage
```typescript
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/ui/ToastContainer'

function MyComponent() {
  const { toasts, success, warning, danger, info, removeToast } = useToast()
  
  // Show multiple toasts
  success('Success!', 'Your action was completed successfully')
  warning('Warning!', 'Please check your input')
  danger('Error!', 'Something went wrong')
  
  // Custom width and duration
  info('Info', 'Here is some information', 'lg', 3000) // 3 seconds
  
  // Render the toast container
  return <ToastContainer toasts={toasts} onClose={removeToast} />
}
```

#### Width Options
- `sm`: Small toast (max-width: 384px on desktop)
- `md`: Medium toast (max-width: 448px on desktop) - **Default**
- `lg`: Large toast (max-width: 512px on desktop)
- `full`: Full width toast (max-width: 672px on desktop)

#### Toast Stacking Behavior
- **Default View**: Up to 3 toasts visible, stacked with scale and opacity effects
- **Hover State**: All toasts expand vertically for full visibility
- **Hidden Counter**: Shows "+N more" indicator when more than 3 toasts exist
- **Auto-dismiss**: Each toast auto-dismisses after 5 seconds (configurable)

On mobile devices, all toasts automatically adjust to fit the screen with proper padding.

#### Example Component
See `components/examples/ToastExample.tsx` for a complete demonstration of all toast features including:
- Different toast variants (success, warning, danger, info)
- Custom widths and durations
- Multiple simultaneous toasts
- Stacking and hover effects
# elara
