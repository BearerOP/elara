'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ElaraLogoGradient } from './ui/Logo'
import { SignupChatInput } from './ui/SignupChatInput'
import { ExternalLinkIcon } from 'lucide-react'

type SignupStep = 'initial' | 'password' | 'verify'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<SignupStep>('initial')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    // In a real app, this would trigger Google OAuth
    // For now, simulate and redirect to chat
    setTimeout(() => {
      setIsLoading(false)
      router.push('/chat')
    }, 1000)
  }

  const handleAppleSignup = async () => {
    setIsLoading(true)
    // In a real app, this would trigger Apple OAuth
    // For now, simulate and redirect to chat
    setTimeout(() => {
      setIsLoading(false)
      router.push('/chat')
    }, 1000)
  }

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    // Move to password step
    setStep('password')
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim() || !confirmPassword.trim()) return
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsLoading(true)
    // In a real app, this would send the email for verification
    // For now, simulate and show verify email section
    setTimeout(() => {
      setIsLoading(false)
      setStep('verify')
    }, 1000)
  }

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank')
  }

  const handleOpenOutlook = () => {
    window.open('https://outlook.live.com', '_blank')
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0F0F0F]">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-12 py-20 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[400px]"
        >
          {/* Back Button - Show on all steps */}
          <button
            onClick={() => {
              if (step === 'initial') {
                router.push('/')
              } else if (step === 'password') {
                setStep('initial')
              } else if (step === 'verify') {
                setStep('password')
              }
            }}
            className="mb-6 flex items-center gap-1 text-base font-medium leading-[1.26] text-white/64 transition-colors hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="mb-12 flex flex-col gap-6">
            <ElaraLogoGradient size="lg" />
            <h1 className="text-[32px] font-medium leading-[1.26] text-text-primary">
              Create your account
            </h1>
          </div>

          {/* Step 1: Initial - OAuth and Email */}
          {step === 'initial' && (
            <>
              {/* OAuth Buttons */}
              <div className="mb-8 flex flex-col gap-4">
                <button
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  className="
                    flex w-full items-center justify-center gap-2.5
                    rounded-button border-none bg-white/10 px-6 py-3
                    text-base font-medium text-text-primary
                    transition-all hover:bg-white/10
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
                <button
                  onClick={handleAppleSignup}
                  disabled={isLoading}
                  className="
                    flex w-full items-center justify-center gap-2.5
                    rounded-button border-none bg-white/10 px-6 py-3
                    text-base font-medium text-text-primary
                    transition-all hover:bg-white/10
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 32 32"><g className="nc-icon-wrapper" fill="rgba(255, 255, 255, 1)"><path d="M19.61,4.808c1.035-1.294,1.737-3.032,1.552-4.808-1.515,.075-3.363,.999-4.433,2.295-.961,1.109-1.811,2.92-1.59,4.621,1.7,.147,3.399-.85,4.471-2.108"></path><path d="M21.143,7.248c-2.469-.147-4.569,1.401-5.748,1.401s-2.986-1.327-4.939-1.292c-2.542,.037-4.901,1.475-6.191,3.761-2.653,4.573-.7,11.357,1.88,15.081,1.253,1.843,2.763,3.872,4.753,3.799,1.88-.074,2.617-1.217,4.902-1.217s2.947,1.217,4.937,1.18c2.064-.037,3.354-1.844,4.607-3.688,1.437-2.101,2.026-4.129,2.063-4.24-.037-.037-3.98-1.549-4.016-6.084-.037-3.797,3.095-5.603,3.243-5.716-1.769-2.616-4.533-2.911-5.491-2.985"></path></g></svg>
                  Continue with Apple
                </button>
              </div>

              {/* Divider */}
              <div className="mb-8 flex items-center gap-2.5">
                <div className="h-px flex-1 bg-border-tertiary" />
                <span className="text-sm font-medium leading-[1.86] text-text-tertiary">OR</span>
                <div className="h-px flex-1 bg-border-tertiary" />
              </div>

              {/* Email Form - Step 1 */}
              <form onSubmit={handleEmailContinue} className="mb-8 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                      w-full rounded-button 
                      px-4 py-3
                      bg-white/10 border border-white/10
                      text-base font-normal leading-[1.625] text-text-primary
                      placeholder:text-text-muted
                      focus:outline-none focus:border-white/32
                      transition-colors
                    "
                    required
                  />
                </div>
                <p className="text-sm font-medium leading-[1.43] text-text-muted">
                  By continuing, you agree to the{' '}
                  <Link href="/terms" className="underline hover:text-text-primary transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline hover:text-text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="
                    w-full rounded-button border border-white/20
                    bg-white text-black/80 px-6 py-3 hover:bg-white/80 hover:text-black/80 cursor-pointer hover:scale-[103%] transition-all duration-300
                    text-base font-medium leading-[1.625]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  Continue
                </button>
              </form>
            </>
          )}

          {/* Step 2: Password Step */}
          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="mb-8 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {/* Email Field - Prefilled and disabled */}
                <div className="flex flex-col gap-1">
                  <label className="text-base font-medium leading-[1.625] text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="
                      w-full rounded-button border border-white/24
                      bg-white/8 px-4 py-3
                      text-base font-normal leading-[1.625] text-text-primary
                      opacity-60 cursor-not-allowed
                      placeholder:text-text-muted
                    "
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-base font-medium leading-[1.625] text-text-primary">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className={`
                        w-full rounded-button 
                        px-4 py-3
                        bg-white/10 border border-white/10
                        text-base font-medium leading-[1.625]
                        placeholder:text-text-primary/50
                        focus:outline-none focus:border-white/32
                        transition-colors
                        ${password.trim() ? 'pr-10' : 'pr-4'}
                      `}
                      required
                    />
                    {password.trim() && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {showPassword ? (
                            <>
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                            </>
                          ) : (
                            <>
                              <path
                                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                            </>
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-base font-medium leading-[1.625] text-text-primary">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter password again"
                      className={`
                        w-full rounded-button 
                        px-4 py-3
                        bg-white/10 border border-white/10
                        text-base font-medium leading-[1.625] text-text-primary
                        placeholder:text-text-primary/50
                        focus:outline-none focus:border-white/32
                        transition-colors
                        ${confirmPassword.trim() ? 'pr-10' : 'pr-4'}
                      `}
                      required
                    />
                    {confirmPassword.trim() && (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {showConfirmPassword ? (
                            <>
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                            </>
                          ) : (
                            <>
                              <path
                                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                            </>
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !password.trim() || !confirmPassword.trim()}
                className="
                 w-full rounded-button border border-white/20
                    bg-white text-black/80 px-6 py-3 hover:bg-white/80 hover:text-black/80 cursor-pointer hover:scale-[103%] transition-all duration-300
                    text-base font-medium leading-[1.625]
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading ? 'Loading...' : 'Continue'}
              </button>
            </form>
          )}

          {/* Step 3: Verify Email Section */}
          {step === 'verify' && (
            <>
              <div className="mb-8 flex flex-col gap-8">
                {/* Description */}
                <p className="text-base font-medium leading-[1.26] text-white/72">
                  We've just sent a mail to {email}. Click the link in the email to verify your account.
                </p>

                {/* Email Client Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleOpenGmail}
                    className="
                    flex flex-1 items-center justify-center gap-2.5
                    rounded-button border-none bg-white/10 px-6 py-3
                    text-base font-medium leading-[1.625] text-text-primary
                    transition-all hover:bg-white/5 hover:text-white/90 cursor-pointer hover:scale-[103%] transition-all duration-300
                  "
                  >
                    Open Gmail
                    <ExternalLinkIcon className='size-4' />
                  </button>
                  <button
                    onClick={handleOpenOutlook}
                    className="
                   flex flex-1 items-center justify-center gap-2.5
                    rounded-button border-none bg-white/10 px-6 py-3
                    text-base font-medium leading-[1.625] text-text-primary
                    transition-all hover:bg-white/5 hover:text-white/90 cursor-pointer hover:scale-[103%] transition-all duration-300
                  "
                  >
                    Open Outlook
                    <ExternalLinkIcon className='size-4' />
                  </button>
                </div>

                {/* Change Email Link */}
                <p className="text-center text-base font-medium leading-[1.625] text-text-primary">
                  Gave an incorrect email?{' '}
                  <button
                    onClick={() => {
                      setStep('initial')
                      setPassword('')
                      setConfirmPassword('')
                    }}
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    Change email.
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Login Link - Show on initial and verify steps */}
          {(step === 'initial' || step === 'verify') && (
            <p className="text-center text-base font-medium leading-[1.625] text-text-primary">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:opacity-80 transition-opacity">
                Login.
              </Link>
            </p>
          )}
        </motion.div>
      </div>

      {/* Right Side - Image with Chat Input */}
      <div className="hidden lg:block lg:w-1/2 relative p-4">
        <div className="relative h-[96vh] overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0" />
          {/* Background Image */}
          <Image
            src="/images/signup-side-image.svg"
            alt="Fashion illustration"
            fill
            className="object-cover rounded-2xl"
            priority
          />
          {/* Chat Input Overlay - Centered */}
          <SignupChatInput />
        </div>
      </div>
    </div>
  )
}

