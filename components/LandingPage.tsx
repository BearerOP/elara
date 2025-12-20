'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './ui/Logo'
import { Button } from '@/components/ui/Button'
import { ChatInputLanding } from './ui/ChatInputLanding'

export default function LandingPage() {
  const router = useRouter()

  const handleChatSubmit = (message: string) => {
    router.push(`/chat?message=${encodeURIComponent(message)}`)
  }

  const [activePromptIndex, setActivePromptIndex] = useState(0)

  const lifestyleItems = [
    {
      text: 'Plan outfits for my NYC trip next week.',
      image: '/images/landing/lifestyle-mockup-1.png',
    },
    {
      text: 'Suggest jackets that go with my green trousers.',
      image: '/images/landing/lifestyle-mockup-2.png',
    },
    {
      text: 'What should I wear for a rooftop wedding?',
      image: '/images/landing/lifestyle-mockup-3.png',
    },
    {
      text: 'Show me brands like COS, but cheaper.',
      image: '/images/landing/lifestyle-mockup-4.png',
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-[#090909]">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gradient-background.svg"
            alt="Gradient background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent"
            style={{ height: '10vh' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-12">
            <Logo size="sm" className="md:hidden" />
            <Logo size="md" className="hidden md:inline-block lg:hidden" />
            <Logo size="lg" className="hidden lg:inline-block" />
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="secondary"
                className="border-none bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white/80 cursor-pointer hover:scale-105 transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
              <Button
                variant="default"
                className="bg-white text-black hover:bg-white/90 hover:text-black/80 cursor-pointer hover:scale-105 transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
                onClick={() => router.push('/signup')}
              >
                Get started
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-1 items-center justify-center  lg:px-12 pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 w-full max-w-4xl"
            >
              {/* Tagline */}
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-center text-2xl sm:text-3xl lg:text-[2.25rem] font-outfit font-semibold leading-[1.26] text-white px-8">
                  Dress smarter. Shop better. Feel confident.
                </h1>
                <p className="w-full max-w-[633px] text-center text-base sm:text-lg lg:text-xl leading-[1.26] text-white/72 px-4">
                  Your AI-powered stylist that curates outfits, digitizes your
                  wardrobe, and shops with you — all in one chat.
                </p>
              </div>

              {/* Chat Input Preview */}
              <div className="w-full px-4 flex justify-center">
                <ChatInputLanding onSubmit={handleChatSubmit} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="flex min-h-[400px] sm:min-h-[500px] lg:min-h-[712px] flex-col items-center justify-center gap-12 sm:gap-16 lg:gap-[72px] px-4 sm:px-6 lg:px-0 py-16 sm:py-24 lg:py-[172px]">
        <h2 className="w-full max-w-[998px] text-center text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] font-playfair font-semibold leading-[1.2] sm:leading-[1.25] lg:leading-[1.3125] text-white px-4">
          Fashion isn't{' '}
          <span className="line-through decoration-white/80">broken</span>. But how we decide what to wear is.
        </h2>
      </section>

      {/* One Profile Section */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-12 sm:gap-16 lg:gap-[84px] px-4 sm:px-6 lg:px-20 py-12 sm:py-16 lg:py-[172px]">
        <div className="flex w-full flex-col gap-8 sm:gap-12 lg:gap-[72px] px-4 sm:px-6 lg:px-[60px] pb-0 pt-0">
          {/* Header */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-playfair font-semibold leading-[1.2] sm:leading-[1.25] lg:leading-[1.333] text-white flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span>One profile.</span> <span>Infinite possibilities.</span>
            </h2>
            <p className="w-full max-w-[844px] text-base sm:text-lg font-plus-jakarta leading-[1.5] sm:leading-[1.55] lg:leading-[1.556] text-white/70">
              From styling to shopping, your Elara Profile adapts to your
              life—capturing your fit, preferences, and vibe to deliver
              personalized recommendations that get smarter over time. One setup,
              endless value.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="relative flex justify-center gap-4  w-full">
            {/* Grain overlays */}
            {/* <div className="pointer-events-none absolute -left-10 sm:-left-16 top-4 sm:top-8 w-32 h-32 sm:w-44 sm:h-44 opacity-100">
              <Image
                src="/images/landing/Grain%201.svg"
                alt="Decorative gradient"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pointer-events-none absolute right-0 sm:-right-10 -bottom-12 sm:-bottom-16 w-32 h-32 sm:w-44 sm:h-44 opacity-70">
              <Image
                src="/images/landing/Grain%202.svg"
                alt="Decorative gradient"
                fill
                className="object-contain"
                priority
              />
            </div> */}

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-10 max-w-[1056px] w-full">
              {/* Column 1: Chat + Digitized */}
              <div className="flex flex-col gap-10 sm:gap-10">
                {/* Chat-First Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full group"
                >
                  <div
                    className="absolute -inset-[10px] rounded-[16px] p-[1px] pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(45deg, #d8d9db99 20%, #1f1f1fab 50%, #545454ab 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  <div className="relative flex flex-col justify-between rounded-[12px] border border-white/15 bg-[#0F0F0F] shadow-[0_4px_24px_0_rgba(255,255,255,0.11)] overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-9 pb-2 sm:pb-3">
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-outfit font-semibold leading-[1.26] text-white">
                        Chat-First Experience
                      </h3>
                      <p className="text-sm sm:text-base leading-[1.26] text-white/72">
                        No more filters. Just ask. Elara handles the rest.
                      </p>
                    </div>
                    {/* Mobile Mockup */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-[260px] w-full bg-transparent flex items-center justify-center">
                      <Image
                        src="/images/landing/chat-first-mockup.png"
                        alt="Chat-First Experience"
                        width={408}
                        height={458}
                        className="h-full w-auto max-w-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
                {/* Digitized Wardrobe */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full group"
                >
                  <div
                    className="absolute -inset-[10px] rounded-[16px] p-[1px] pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(45deg, #d8d9db99 20%, #1f1f1fab 50%, #545454ab 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  <div className="relative flex flex-col justify-between rounded-[12px] border border-white/15 bg-[#0F0F0F] shadow-[0_4px_24px_0_rgba(255,255,255,0.16)] overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-9 pb-2 sm:pb-3">
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-outfit font-semibold leading-[1.26] text-white">
                        Digitized Wardrobe
                      </h3>
                      <p className="text-sm sm:text-base leading-[1.26] text-white/72">
                        Upload your closet or let Elara auto-tag your outfits from
                        photos.
                      </p>
                    </div>
                    {/* Mobile Mockup */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-[458px] w-full bg-transparent flex items-center justify-center">
                      <Image
                        src="/images/landing/digitized-wardrobe-mockup.png"
                        alt="Digitized Wardrobe"
                        width={408}
                        height={458}
                        className="h-full w-auto max-w-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Column 2: Smart Outfit + Context-Aware */}
              <div className="flex flex-col gap-10 sm:gap-10">
                {/* Smart Outfit Planning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative w-full group"
                >
                  <div
                    className="absolute -inset-[10px] rounded-[16px] p-[1px] pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(45deg, #d8d9db99 20%, #1f1f1fab 50%, #545454ab 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  <div className="relative flex flex-col justify-between rounded-[12px] border border-white/15 bg-[#0F0F0F] shadow-[0_4px_24px_0_rgba(255,255,255,0.16)] overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-9 pb-2 sm:pb-3">
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-outfit font-semibold leading-[1.26] text-white">
                        Smart Outfit Planning
                      </h3>
                      <p className="text-sm sm:text-base leading-[1.26] text-white/72">
                        Get daily looks curated for your body type, vibe, and
                        weather.
                      </p>
                    </div>
                    {/* Mobile Mockup */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-[458px] w-full bg-transparent flex items-center justify-center">
                      <Image
                        src="/images/landing/smart-outfit-mockup.png"
                        alt="Smart Outfit Planning"
                        width={408}
                        height={458}
                        className="h-full w-auto max-w-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Context-Aware Shopping */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative w-full group"
                >
                  <div
                    className="absolute -inset-[10px] rounded-[16px] p-[1px] pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(45deg, #d8d9db99 20%, #1f1f1fab 50%, #545454ab 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  <div className="relative flex flex-col justify-between rounded-[12px] border border-white/15 bg-[#0F0F0F] shadow-[0_4px_24px_0_rgba(255,255,255,0.16)] overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-9 pb-2 sm:pb-3">
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-outfit font-semibold leading-[1.26] text-white">
                        Context-Aware Shopping
                      </h3>
                      <p className="text-sm sm:text-base leading-[1.26] text-white/82">
                        Only see products that match your style and fill real
                        gaps.
                      </p>
                    </div>
                    {/* Mobile Mockup */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-[260px] w-full bg-transparent flex items-center justify-center">
                      <Image
                        src="/images/landing/context-shopping-mockup.png"
                        alt="Context-Aware Shopping"
                        width={408}
                        height={458}
                        className="h-full w-auto max-w-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Waitlist CTA */}
          {/* <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
            <p className="text-lg sm:text-xl font-plus-jakarta font-medium leading-[1.26] text-white text-center">
              Join our app waitlist
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[516px] px-4 sm:px-0">
              <input
                type="email"
                placeholder="Your email"
                className="h-12 sm:h-[52px] w-full rounded-2xl border border-white/32 bg-[#1D1D1D] px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-plus-jakarta text-white/72 placeholder:text-white/56 backdrop-blur-sm"
              />
              <Button
                variant="default"
                className="h-12 sm:h-[52px] rounded-xl bg-white px-5 sm:px-6 py-2.5 text-sm sm:text-base font-plus-jakarta font-semibold text-black hover:bg-white/90 w-full sm:w-auto"
              >
                Join Waitlist
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Transition Section - "your closet is about to get smarter" */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <video src="/images/landing/closet-video.mp4" autoPlay muted loop className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909]" />
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 flex flex-col items-center gap-0 px-4">
          <span className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[4.5rem] font-playfair font-normal leading-[1.333] text-white/72">
            your closet is about to get
          </span>
          <div className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] mt-2 sm:mt-4">
            <Image
              src="/images/landing/smarter.svg"
              alt="smarter"
              width={400}
              height={120}
              className="w-full h-auto object-fit"
            />
          </div>
        </div>
      </section>

      {/* Elara fits your lifestyle Section */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-12 sm:gap-16 lg:gap-[84px] px-4 sm:px-6 lg:px-20 py-12 sm:py-16 lg:py-[72px] lg:pb-[172px]">
        <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-[10px] px-4 sm:px-6 lg:px-[60px] pb-0 pt-0">
          <div className="flex w-full lg:w-[455px] flex-col gap-8 sm:gap-12 lg:gap-14">
            <div className="flex flex-col gap-6 sm:gap-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-playfair font-semibold leading-[1.2] sm:leading-[1.25] lg:leading-[1.333] text-white">
                Elara fits your lifestyle.
              </h2>
            </div>

            {/* Prompts List */}
            <div className="flex flex-col gap-2.5 w-full">
              {lifestyleItems.map((item, index) => {
                const isActive = activePromptIndex === index
                return (
                  <div
                    key={index}
                    onClick={() => setActivePromptIndex(index)}
                    className={`flex flex-col gap-2.5 cursor-pointer transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 ${isActive
                      ? 'rounded-r-xl border-l-2 border-[#592CA6] bg-[rgba(255,255,255,0.12)]'
                      : 'rounded-r-lg border-l-2 border-transparent bg-[#090909] hover:bg-[#111111]'
                      }`}
                  >
                    <p
                      className={`text-sm sm:text-base lg:text-lg font-outfit leading-[1.26] transition-colors duration-300 ${isActive ? 'font-medium text-white' : 'text-white/72'
                        }`}
                    >
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Mockups Stack */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[706px] w-full max-w-[500px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {lifestyleItems.map((item, index) => {
                const isActive = activePromptIndex === index
                // We render all items, but style them based on active state
                // Actually, AnimatePresence is for mounting/unmounting. We keep all mounted.
                // So we don't strictly need AnimatePresence unless we change key order.
                // We'll just map and animate.

                // Calculate "stack" style for inactive items
                // Distribute them slightly to left/right for visibility
                const offset = (index - activePromptIndex)
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={index}
                    className="absolute w-[80%] sm:w-[70%] lg:w-[324px] h-[300px] sm:h-[400px] lg:h-[600px]"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 20 : 10 - Math.abs(index - activePromptIndex),
                      x: isActive ? 0 : (isLeft ? '-25%' : '25%'),
                      rotate: 0,
                      filter: isActive ? 'blur(0px)' : 'blur(2px)',
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1], // Custom ease for smooth "spring-like" feel
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={`Lifestyle Mockup ${index + 1}`}
                        fill
                        className="object-contain rounded-[15px]"
                        priority={index === 0}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 sm:gap-10 px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-[72px] lg:pb-[82px]">
        <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
          <h2 className="w-full max-w-[740px] mb-12 text-center text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-playfair font-medium leading-[1.2] sm:leading-[1.25] lg:leading-[1.3] text-white px-4">
            What People Are Actually Struggling With
          </h2>

          {/* Testimonials Grid (Desktop/Tablet) */}
          <div className="hidden lg:flex justify-center w-[150vw]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-[132vw]">
              {[
                {
                  text: "Online shopping feels like gambling—half the stuff doesn't fit or look right.",
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
                {
                  text: 'I hate wasting money on clothes I never end up wearing.',
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
                {
                  text: 'Every shopping site feels the same—too many options, no real help.',
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
                {
                  text: 'I have a closet full of clothes but nothing I feel good in.',
                  name: 'Lincoln Stanton',
                  avatar: '/images/landing/avatars/lincoln-stanton.png',
                },
                {
                  text: 'I waste hours scrolling through outfits and still end up wearing the same 5 pieces.',
                  name: 'Chance Bator',
                  avatar: '/images/landing/avatars/chance-bator.png',
                },
                {
                  text: 'I wish someone could just tell me what to wear for my trip or a date.',
                  name: 'Ann Schleifer',
                  avatar: '/images/landing/avatars/ann-schleifer.png',
                },
                {
                  text: "I never know if something actually suits my body or just looks good on the model.",
                  name: 'Paityn Donin',
                  avatar: '/images/landing/avatars/paityn-donin.png',
                },
                {
                  text: 'A game-changer for my productivity. Now I can challenge myself and earn real rewards for sticking to my screen time goals!',
                  name: 'Adison Vetrovs',
                  avatar: '/images/landing/avatars/adison-vetrovs.png',
                },
                {
                  text: "I like too many styles—I need help narrowing things down.",
                  name: 'Davis Philips',
                  avatar: '/images/landing/avatars/davis-philips.png',
                },
                {
                  text: 'Shopping online is overwhelming. I always return half of what I buy.',
                  name: 'Alena Franci',
                  avatar: '/images/landing/avatars/alena-franci.png',
                },
                {
                  text: "I want to dress better but I have no idea what my style even is.",
                  name: 'Makenna Saris',
                  avatar: '/images/landing/avatars/makenna-saris.png',
                },
                {
                  text: "I follow fashion influencers but can't figure out how to apply that to my own style.",
                  name: 'Gretchen Bator',
                  avatar: '/images/landing/avatars/gretchen-bator.png',
                },
                {
                  text: "I don't know how to mix and match things in my wardrobe.",
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
                {
                  text: "I keep buying clothes that don't go with anything I already own.",
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
                {
                  text: 'I wish someone would just tell me what to wear for a date or event.',
                  name: 'Sophie Gray',
                  school: "Harvard'23",
                  avatar: '/images/landing/avatars/sophie-gray.png',
                },
              ].reduce((columns, item, index) => {
                columns[index % 5].push(item)
                return columns
              }, [[], [], [], [], []] as any[][]).map((columnItems, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex flex-col gap-4 ${colIndex % 2 === 1 ? 'lg:pt-10' : ''}`}
                >
                  {columnItems.map((testimonial: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      className="flex w-full max-w-[360px] h-fit flex-col gap-5 sm:gap-6 rounded-2xl border border-white/10 bg-[#0C0C0C] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_44px_rgba(0,0,0,0.45)] p-4 sm:p-5 lg:p-6"
                    >
                      <p className="text-sm sm:text-base font-plus-jakarta leading-[1.6] text-white">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 overflow-hidden rounded-full">
                          {testimonial.avatar ? (
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5 sm:gap-2">
                          <p className="text-sm sm:text-base font-plus-jakarta font-semibold leading-[1.5] text-white">
                            {testimonial.name}
                          </p>
                          {testimonial.school && (
                            <p className="text-xs sm:text-sm font-plus-jakarta leading-[1.5] text-white/72">
                              {testimonial.school}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Carousel (Mobile) */}
          <div className="flex items-center lg:hidden w-full overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-4 pb-4">
            {[
              {
                text: "Online shopping feels like gambling—half the stuff doesn't fit or look right.",
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
              {
                text: 'I hate wasting money on clothes I never end up wearing.',
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
              {
                text: 'Every shopping site feels the same—too many options, no real help.',
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
              {
                text: 'I have a closet full of clothes but nothing I feel good in.',
                name: 'Lincoln Stanton',
                avatar: '/images/landing/avatars/lincoln-stanton.png',
              },
              {
                text: 'I waste hours scrolling through outfits and still end up wearing the same 5 pieces.',
                name: 'Chance Bator',
                avatar: '/images/landing/avatars/chance-bator.png',
              },
              {
                text: 'I wish someone could just tell me what to wear for my trip or a date.',
                name: 'Ann Schleifer',
                avatar: '/images/landing/avatars/ann-schleifer.png',
              },
              {
                text: "I never know if something actually suits my body or just looks good on the model.",
                name: 'Paityn Donin',
                avatar: '/images/landing/avatars/paityn-donin.png',
              },
              {
                text: 'A game-changer for my productivity. Now I can challenge myself and earn real rewards for sticking to my screen time goals!',
                name: 'Adison Vetrovs',
                avatar: '/images/landing/avatars/adison-vetrovs.png',
              },
              {
                text: "I like too many styles—I need help narrowing things down.",
                name: 'Davis Philips',
                avatar: '/images/landing/avatars/davis-philips.png',
              },
              {
                text: 'Shopping online is overwhelming. I always return half of what I buy.',
                name: 'Alena Franci',
                avatar: '/images/landing/avatars/alena-franci.png',
              },
              {
                text: "I want to dress better but I have no idea what my style even is.",
                name: 'Makenna Saris',
                avatar: '/images/landing/avatars/makenna-saris.png',
              },
              {
                text: "I follow fashion influencers but can't figure out how to apply that to my own style.",
                name: 'Gretchen Bator',
                avatar: '/images/landing/avatars/gretchen-bator.png',
              },
              {
                text: "I don't know how to mix and match things in my wardrobe.",
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
              {
                text: "I keep buying clothes that don't go with anything I already own.",
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
              {
                text: 'I wish someone would just tell me what to wear for a date or event.',
                name: 'Sophie Gray',
                school: "Harvard'23",
                avatar: '/images/landing/avatars/sophie-gray.png',
              },
            ].map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex max-w-[400px] min-w-[250px] snap-center h-fit flex-col gap-5 rounded-2xl border border-white/10 bg-[#0C0C0C] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_44px_rgba(0,0,0,0.45)] p-5"
              >
                <p className="text-base font-plus-jakarta leading-[1.6] text-white">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-base font-plus-jakarta font-semibold leading-[1.5] text-white">
                      {testimonial.name}
                    </p>
                    {testimonial.school && (
                      <p className="text-sm font-plus-jakarta leading-[1.5] text-white/72">
                        {testimonial.school}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {/* <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-[200px] z-0 flex items-center justify-center z-[1] overflow-visible">
          <Image
            src="/images/landing/cta-blur.svg"
            alt=""
            width={1512}
            height={700}
            className="w-full"
            priority
          />
        </div>

        <div className="relative z-10 mb-[300px] flex w-full flex-col gap-12 px-[120px] overflow-visible">
          <div className="flex flex-col gap-6">
            <h2 className="w-[481px] text-[3.5rem] font-playfair font-normal leading-[1.2] tracking-[-0.04em] text-white">
              Be first. Be stylish. Be in the know.
            </h2>
            <p className="text-xl font-dm-sans font-normal leading-[1.2] tracking-[-0.016em] text-[#C5C5C5]">
              It's not just an app. It's your future stylist.
            </p>
          </div>

          <div className="flex">
            <button className="group relative h-[50px] rounded-full border border-white/10 bg-[#0C0C0C] px-6 py-2 transition-all hover:border-white/20">
              <span className="text-base font-medium uppercase leading-[1.42] tracking-[-0.01em] text-white">
                Join waitlist
              </span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full overflow-hidden z-[999]">
            <Image
              src="/images/landing/footer-brand.svg"
              alt="Elara"
              width={1512}
              height={300}
              className="w-full object-contain"
            />
          </div>
        </div>
      </section> */}

      <section className="relative flex min-h-[500px] sm:min-h-[600px] lg:min-h-screen flex-col justify-end overflow-hidden pt-16 sm:pt-24 lg:pt-[400px]">
        {/* Background Blur - positioned just above footer */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[180px] sm:bottom-[200px] lg:bottom-[60px] flex items-center justify-center">
          <Image
            src="/images/landing/cta-blur.svg"
            alt=""
            width={1512}
            height={700}
            className="w-full "
            priority
          />
        </div>

        {/* Content - positioned just above footer */}
        <div className="relative z-10 mb-[120px] sm:mb-[140px] lg:mb-[160px] flex w-full flex-col gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 lg:px-[120px]">
          {/* Heading */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="max-w-[500px] font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-normal leading-[1.2] sm:leading-[1.25] lg:leading-[1] tracking-[-0.04em] text-white">
              Be first. Be stylish.
              <br />
              Be in the know.
            </h2>
            <p className="font-dm-sans text-base sm:text-lg font-normal leading-[1.5] sm:leading-[1.55] tracking-[-0.016em] text-[#C5C5C5]">
              It's not just an app. It's your future stylist.
            </p>
          </div>

          {/* CTA Button then Get Started*/}
          <div className="flex">
            <button 
               onClick={() => router.push('/signup')}
            className="group relative h-12 sm:h-[50px] rounded-full border border-white/10 bg-[#0C0C0C] px-6 sm:px-8 py-2.5 sm:py-3 transition-all hover:border-white/20 hover:bg-[#151515]">
              <span className="font-dm-sans text-xs sm:text-sm font-medium uppercase leading-none tracking-wider text-white">
               Get Started
              </span>
            </button>
          </div>
        </div>

        {/* Footer Brand - positioned at bottom */}
        <div className="relative z-20 mt-auto w-full">
          <Image
            src="/images/landing/footer-brand.svg"
            alt="Elara"
            width={1512}
            height={300}
            className="w-full object-contain"
          />
        </div>
      </section>

    </div>
  )
}
