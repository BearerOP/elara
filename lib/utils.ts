import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Clears all cookies, localStorage, and sessionStorage
 * Used when user signs out
 */
export function clearAllStorage() {
  // Clear all cookies by setting them with expired dates
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      // Clear cookie by setting it with expired date and all possible paths
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
    })
  }

  // Clear localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.clear()
  }

  // Clear sessionStorage
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.clear()
  }
}
