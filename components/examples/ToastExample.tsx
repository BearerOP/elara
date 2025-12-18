'use client'

import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { Button } from '@/components/ui/Button'

/**
 * Example component demonstrating the toast notification system
 * 
 * Features:
 * - Multiple toasts can be shown simultaneously
 * - Toasts stack with a card-deck effect
 * - Hover over toasts to expand and see all notifications
 * - Auto-dismiss after configured duration
 * - Customizable width and duration
 */
export function ToastExample() {
  const { toasts, success, warning, danger, info, removeToast, clearAllToasts } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Toast Notification Examples</h2>
      
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => success('Success!', 'Your action was completed successfully')}
          variant="default"
        >
          Show Success
        </Button>

        <Button
          onClick={() => warning('Warning!', 'Please check your input before proceeding')}
          variant="secondary"
        >
          Show Warning
        </Button>

        <Button
          onClick={() => danger('Error!', 'Something went wrong. Please try again.')}
          variant="secondary"
        >
          Show Error
        </Button>

        <Button
          onClick={() => info('Info', 'Here is some helpful information for you')}
          variant="secondary"
        >
          Show Info
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          onClick={() => {
            success('Small Toast', 'This is a small width toast', 'sm')
          }}
          variant="secondary"
        >
          Small Width
        </Button>

        <Button
          onClick={() => {
            info('Large Toast', 'This is a large width toast with more content space', 'lg')
          }}
          variant="secondary"
        >
          Large Width
        </Button>

        <Button
          onClick={() => {
            warning('Full Width', 'This is a full width toast for maximum content display', 'full')
          }}
          variant="secondary"
        >
          Full Width
        </Button>

        <Button
          onClick={() => {
            info('Quick Toast', 'This toast will dismiss in 2 seconds', 'md', 2000)
          }}
          variant="secondary"
        >
          Quick Dismiss (2s)
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          onClick={() => {
            success('Toast 1', 'First notification')
            setTimeout(() => warning('Toast 2', 'Second notification'), 300)
            setTimeout(() => danger('Toast 3', 'Third notification'), 600)
            setTimeout(() => info('Toast 4', 'Fourth notification'), 900)
          }}
          variant="default"
        >
          Show Multiple Toasts
        </Button>

        <Button
          onClick={clearAllToasts}
          variant="secondary"
        >
          Clear All Toasts
        </Button>
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-sm font-medium text-white mb-2">Tips:</h3>
        <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
          <li>Click "Show Multiple Toasts" to see the stacking effect</li>
          <li>Hover over the toasts to expand and see all notifications</li>
          <li>Up to 3 toasts are visible at once (shows "+N more" indicator)</li>
          <li>Each toast auto-dismisses after 5 seconds (or custom duration)</li>
          <li>Click the X button to manually dismiss a toast</li>
        </ul>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}

