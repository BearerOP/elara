'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Edit2, ThumbsUp, ThumbsDown, Share2, RefreshCcw } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { MobileSidebar } from './MobileSidebar'
import { DynamicHeader } from './DynamicHeader'
import { SettingsModal } from './SettingsModal'
import ChatInput from '@/components/ui/ChatInput'
import SearchChatsPage from './SearchChatsPage'
import WardrobePage from './WardrobePage'
import SavedOutfitsPage, { sampleOutfits as savedOutfitsList, getItemImage } from './SavedOutfitsPage'
import ShinyText from '../ui/ShinyText'
import ProductResponse from './ProductResponse'
import ViewDetailsSidebar from './ViewDetailsSidebar'
import VirtualTryOnModal from './VirtualTryOnModal'
import WardrobeItemSidebar from './WardrobeItemSidebar'
import { OutfitSuggestion } from './OutfitSuggestionRow'
import { sampleOutfits } from '@/lib/sampleOutfitData'
import { WardrobeItem } from '@/lib/wardrobeData'
import { useOnboardingState } from '@/hooks/useOnboardingState'

interface Message {
  id: number
  text?: string
  isUser: boolean
  outfitSuggestions?: OutfitSuggestion[]
  type?: 'text' | 'product-response'
}

interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

interface ChatInterfaceProps {
  onboardingState?: ReturnType<typeof useOnboardingState>
  onOpenOnboarding?: () => void
}

export default function ChatInterface({
  onboardingState,
  onOpenOnboarding
}: ChatInterfaceProps = {} as ChatInterfaceProps) {
  const searchParams = useSearchParams()
  const initialMessage = searchParams?.get('message') || ''
  const mode = searchParams?.get('mode') || ''

  const [messages, setMessages] = useState<Message[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedChat, setSelectedChat] = useState('New chat')
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('new-chat')
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [generatingChatId, setGeneratingChatId] = useState<string | null>(null)
  const [currentResponse, setCurrentResponse] = useState('')
  const [thinkingState, setThinkingState] = useState<string>('')
  const [responseIntervals, setResponseIntervals] = useState<{ thinking?: NodeJS.Timeout; typing?: NodeJS.Timeout }>({})

  // Mobile states
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const isGenerating = generatingChatId !== null && generatingChatId === selectedChatId
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitSuggestion | null>(null)
  const [isOutfitSidebarOpen, setIsOutfitSidebarOpen] = useState(false)
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false)
  const [virtualTryOnOutfit, setVirtualTryOnOutfit] = useState<OutfitSuggestion | null>(null)
  const [likedOutfit, setLikedOutfit] = useState(false)
  const [dislikedOutfit, setDislikedOutfit] = useState(false)
  const [savedOutfit, setSavedOutfit] = useState(false)
  const [wardrobeProcessing, setWardrobeProcessing] = useState(false)
  const [wardrobeProcessedCount, setWardrobeProcessedCount] = useState(5)
  const [wardrobeTotalProcessing, setWardrobeTotalProcessing] = useState(8)
  const [wardrobeItemCount, setWardrobeItemCount] = useState(0)
  const [selectedWardrobeItem, setSelectedWardrobeItem] = useState<WardrobeItem | null>(null)
  const [isWardrobeSidebarOpen, setIsWardrobeSidebarOpen] = useState(false)
  const [isWardrobeEditing, setIsWardrobeEditing] = useState(false)
  const [selectedSavedOutfitId, setSelectedSavedOutfitId] = useState<string | null>(null)
  const [isSavedOutfitSidebarOpen, setIsSavedOutfitSidebarOpen] = useState(false)
  const [likedSavedOutfit, setLikedSavedOutfit] = useState(false)
  const [dislikedSavedOutfit, setDislikedSavedOutfit] = useState(false)
  const [savedSavedOutfit, setSavedSavedOutfit] = useState(false)

  const thinkingStates = ['Thinking', 'Generating', 'Searching', 'Browsing']

  const preGeneratedResponses = [
    {
      text: "Wardrobe check-list:\n\nDo you have a pastel maxi or midi dress (soft pink, baby blue, mint, light yellow)?\n\nIs the fabric flowy (not too stiff) and comfortable for warm weather?",
      hasProducts: true,
    },
    {
      text: "For a beach wedding in Goa, I'd recommend a flowy pastel maxi dress or an elegant linen suit. The key is to stay comfortable in the heat while looking sophisticated. Consider lightweight fabrics like chiffon or cotton blends. Pastel colors like mint green, soft pink, or lavender would be perfect. Don't forget accessories like statement earrings and comfortable wedges!",
      hasProducts: false,
    },
    {
      text: "Based on your style preferences, I've found several options that would work beautifully. A sage green wrap dress would be stunning, or perhaps a light blue palazzo set with delicate embroidery. Both options are Instagram-worthy and perfect for a beach setting.",
      hasProducts: false,
    },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentResponse])

  useEffect(() => {
    if (initialMessage) {
      const userMessage = {
        id: Date.now(),
        text: initialMessage,
        isUser: true,
      }
      setMessages((prev) => {
        if (prev.some((m) => m.text === initialMessage && m.isUser)) {
          return prev
        }
        return [...prev, userMessage]
      })

      generateAIResponse(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateAIResponse = (responseIndex: number = 0, targetChatId: string | null = null) => {
    const chatId = targetChatId || selectedChatId
    setGeneratingChatId(chatId)
    setCurrentResponse('')

    // Cycle through thinking states
    let stateIndex = 0
    const thinkingInterval = setInterval(() => {
      setThinkingState(thinkingStates[stateIndex])
      stateIndex = (stateIndex + 1) % thinkingStates.length
    }, 800)

    // Store intervals for cleanup
    setResponseIntervals({ thinking: thinkingInterval })

    // Simulate API delay
    setTimeout(() => {
      clearInterval(thinkingInterval)
      setThinkingState('')

      // Typewriter effect
      const responseData = preGeneratedResponses[responseIndex % preGeneratedResponses.length]
      const response = responseData.text
      let charIndex = 0

      const typeInterval = setInterval(() => {
        // Continue typing - the generatingChatId check handles chat switching
        if (charIndex < response.length) {
          setCurrentResponse(response.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setGeneratingChatId(null)
          setResponseIntervals({})

          // Add completed message
          const newMessage: Message = {
            id: Date.now(),
            text: response,
            isUser: false,
            type: 'text',
          }

          // If response has products, add product response after a delay
          if (responseData.hasProducts) {
            setTimeout(() => {
              const productMessage: Message = {
                id: Date.now() + 1,
                isUser: false,
                type: 'product-response',
                outfitSuggestions: sampleOutfits,
              }

              // Update chat history with product response
              if (chatId) {
                setChatHistories(prev => prev.map(chat =>
                  chat.id === chatId
                    ? { ...chat, messages: [...chat.messages, productMessage], updatedAt: Date.now() }
                    : chat
                ))
              }

              // Update messages state (will only show if still on this chat)
              setMessages((prev) => {
                // Only update if we're still viewing this chat
                if (prev.length > 0 && prev[0].id) {
                  return [...prev, productMessage]
                }
                return prev
              })
            }, 500)
          }

          // Update chat history with AI response
          if (chatId) {
            setChatHistories(prev => prev.map(chat =>
              chat.id === chatId
                ? { ...chat, messages: [...chat.messages, newMessage], updatedAt: Date.now() }
                : chat
            ))
          }

          // Update messages state (will only show if still on this chat)
          setMessages((prev) => [...prev, newMessage])
          setCurrentResponse('')
        }
      }, 30)
    }, 2500)
  }

  const handleChatSubmit = (message: string) => {
    if (!message.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      isUser: true,
    }
    setMessages((prev) => [...prev, userMessage])

    // Create new chat if this is the first message in a new chat
    if (messages.length === 0 && selectedChat === 'New chat') {
      const newChatId = `chat-${Date.now()}`
      const chatTitle = message.length > 50 ? message.substring(0, 50) + '...' : message

      const newChat: ChatHistory = {
        id: newChatId,
        title: chatTitle,
        messages: [userMessage],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      setChatHistories(prev => [newChat, ...prev])
      setSelectedChatId(newChatId)
      setSelectedChat(chatTitle)

      // Generate response for the new chat
      generateAIResponse(0, newChatId)
    } else if (selectedChatId) {
      // Update existing chat
      setChatHistories(prev => prev.map(chat =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, userMessage], updatedAt: Date.now() }
          : chat
      ))

      // Generate response for existing chat
      generateAIResponse(messages.length, selectedChatId)
    }
  }

  const handleSelectChat = (chatTitle: string, chatId?: string) => {
    // Clean up any ongoing response generation
    if (responseIntervals.thinking) clearInterval(responseIntervals.thinking)
    if (responseIntervals.typing) clearInterval(responseIntervals.typing)
    setResponseIntervals({})
    setCurrentResponse('')
    setThinkingState('')
    setGeneratingChatId(null)

    setSelectedChat(chatTitle)

    if (chatTitle === 'New chat') {
      setMessages([])
      setSelectedChatId(null)
      setActiveTab('new-chat')
    } else if (chatId) {
      const chat = chatHistories.find(c => c.id === chatId)
      if (chat) {
        setMessages(chat.messages)
        setSelectedChatId(chatId)
        setActiveTab('new-chat')
      }
    }
  }

  const handleRenameChat = (chatId: string, newTitle: string) => {
    if (!newTitle.trim()) return

    setChatHistories(prev => prev.map(chat =>
      chat.id === chatId
        ? { ...chat, title: newTitle.trim(), updatedAt: Date.now() }
        : chat
    ))

    if (selectedChatId === chatId) {
      setSelectedChat(newTitle.trim())
    }
  }

  const handleDeleteChat = (chatId: string) => {
    setChatHistories(prev => prev.filter(chat => chat.id !== chatId))

    if (selectedChatId === chatId) {
      setSelectedChat('New chat')
      setSelectedChatId(null)
      setMessages([])
    }
  }

  const handleNewChat = () => {
    setSelectedChat('New chat')
    setSelectedChatId(null)
    setMessages([])
    setActiveTab('new-chat')
  }

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleTryAgain = () => {
    if (messages.length > 0) {
      generateAIResponse(messages.length - 1)
    }
  }

  const handleViewDetails = (outfit: OutfitSuggestion) => {
    setSelectedOutfit(outfit)
    setIsOutfitSidebarOpen(true)
  }

  const handleCloseOutfitSidebar = () => {
    setIsOutfitSidebarOpen(false)
    // Delay clearing selected outfit to allow transition
    setTimeout(() => {
      setSelectedOutfit(null)
    }, 300)
  }

  const handleProductLike = (productId: string) => {
    console.log('Liked product:', productId)
  }

  const handleProductDislike = (productId: string) => {
    console.log('Disliked product:', productId)
  }

  const handleProductShare = (productId: string) => {
    console.log('Shared product:', productId)
  }

  const handleProductSave = (productId: string) => {
    console.log('Saved product:', productId)
  }

  const handleVirtualTryOn = (outfit: OutfitSuggestion) => {
    setVirtualTryOnOutfit(outfit)
    setIsVirtualTryOnOpen(true)
  }

  const handleCloseVirtualTryOn = () => {
    setIsVirtualTryOnOpen(false)
    setVirtualTryOnOutfit(null)
  }

  const handleOutfitLike = () => {
    setLikedOutfit(!likedOutfit)
    setDislikedOutfit(false)
  }

  const handleOutfitDislike = () => {
    setDislikedOutfit(!dislikedOutfit)
    setLikedOutfit(false)
  }

  const handleOutfitSave = () => {
    setSavedOutfit(!savedOutfit)
  }

  const handleSaveToLookbook = (outfit: OutfitSuggestion) => {
    console.log('Saved outfit to lookbook:', outfit)
  }

  const handleWardrobeItemClick = (item: WardrobeItem) => {
    setSelectedWardrobeItem(item)
    setIsWardrobeSidebarOpen(true)
  }

  const handleWardrobeCloseSidebar = () => {
    setIsWardrobeSidebarOpen(false)
    setSelectedWardrobeItem(null)
    setIsWardrobeEditing(false)
  }

  const handleWardrobeSaveItem = (item: WardrobeItem) => {
    setSelectedWardrobeItem(item)
  }

  const handleWardrobeDeleteItem = (itemId: string) => {
    if (selectedWardrobeItem?.id === itemId) {
      handleWardrobeCloseSidebar()
    }
  }

  const handleWardrobeEditToggle = () => {
    setIsWardrobeEditing(!isWardrobeEditing)
  }

  // Saved Outfits handlers
  const handleSavedOutfitClick = (outfitId: string) => {
    setSelectedSavedOutfitId(outfitId)
    setIsSavedOutfitSidebarOpen(true)
  }

  const handleSavedOutfitCloseSidebar = () => {
    setIsSavedOutfitSidebarOpen(false)
    setSelectedSavedOutfitId(null)
  }

  const handleSavedOutfitLike = () => {
    setLikedSavedOutfit(!likedSavedOutfit)
    if (dislikedSavedOutfit) setDislikedSavedOutfit(false)
  }

  const handleSavedOutfitDislike = () => {
    setDislikedSavedOutfit(!dislikedSavedOutfit)
    if (likedSavedOutfit) setLikedSavedOutfit(false)
  }

  const handleSavedOutfitSave = () => {
    setSavedSavedOutfit(!savedSavedOutfit)
  }

  const handleSavedOutfitProductLike = (productId: string) => {
    console.log('Product liked:', productId)
  }

  // Get selected saved outfit
  const selectedSavedOutfit = useMemo<OutfitSuggestion | null>(() => {
    if (!selectedSavedOutfitId) return null
    const outfit = savedOutfitsList.find(o => o.id === selectedSavedOutfitId)
    if (!outfit) return null

    return {
      id: outfit.id,
      title: outfit.title,
      number: 1,
      tag: 'Wardrobe' as const,
      description: outfit.description,
      total: outfit.items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''))
        return sum + price
      }, 0).toFixed(2),
      products: outfit.items.map((item, idx) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        image: getItemImage(item.name, idx),
        url: '#',
      }))
    }
  }, [selectedSavedOutfitId])

  // Get dynamic header title based on active tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'search':
        return 'Search Chats'
      case 'wardrobe':
        return 'Wardrobe'
      case 'saved':
        return 'Saved Outfits'
      case 'new-chat':
        return 'Elara Session'
      default:
        // For recent chats, use the selected chat name
        return selectedChat
    }
  }

  const renderMessageActions = (message: Message) => {
    if (message.isUser) {
      return (
        <div className="flex items-center gap-1 md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => message.text && handleCopyMessage(message.text)}
            className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
            style={{ color: '#707070' }}
            title="Copy"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
            style={{ color: '#707070' }}
            title="Edit"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }

    // Don't show actions for product responses
    if (message.type === 'product-response') {
      return null
    }

    return (
      <div className="flex w-fit items-start gap-1">
        <button
          onClick={() => message.text && handleCopyMessage(message.text)}
          className="p-1.5 text-[#707070] hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Copy"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 text-[#707070] hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Like"
        >
          <ThumbsUp className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 text-[#707070] hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Dislike"
        >
          <ThumbsDown className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 text-[#707070] hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Share"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={handleTryAgain}
          className="p-1.5 text-[#707070] hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Try again"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchChatsPage />
      case 'wardrobe':
        return (
          <WardrobePage
            isProcessing={wardrobeProcessing}
            processedCount={wardrobeProcessedCount}
            totalProcessing={wardrobeTotalProcessing}
            onUpdateProcessingState={(isProcessing, processedCount, totalProcessing) => {
              setWardrobeProcessing(isProcessing)
              setWardrobeProcessedCount(processedCount)
              setWardrobeTotalProcessing(totalProcessing)
            }}
            onUpdateItemCount={(count) => setWardrobeItemCount(count)}
            selectedItem={selectedWardrobeItem}
            isSidebarOpen={isWardrobeSidebarOpen}
            isEditing={isWardrobeEditing}
            onItemClick={handleWardrobeItemClick}
            onCloseSidebar={handleWardrobeCloseSidebar}
            onSaveItem={handleWardrobeSaveItem}
            onDeleteItem={handleWardrobeDeleteItem}
            onEditToggle={handleWardrobeEditToggle}
          />
        )
      case 'saved':
        return (
          <SavedOutfitsPage
            selectedId={selectedSavedOutfitId}
            isSidebarOpen={isSavedOutfitSidebarOpen}
            onOutfitClick={handleSavedOutfitClick}
            onCloseSidebar={handleSavedOutfitCloseSidebar}
          />
        )
      default:
        return (
          <div className="flex flex-1 flex-col overflow-hidden relative h-full">
            {/* Welcome Screen - Centered when no messages */}
            <AnimatePresence>
              {messages.length === 0 && !isGenerating && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-10 z-10"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="text-2xl font-medium text-white text-center"
                    style={{ lineHeight: '1.26' }}
                  >
                    What are you in the mood for today?
                  </motion.h1>

                  {/* Chat Input - Centered when no messages */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                    className="w-full px-0 md:px-6"
                    style={{ maxWidth: '755px' }}
                  >
                    <ChatInput
                      onSubmit={handleChatSubmit}
                      initialValue="I have a beach wedding in Goa next weekend. I want something light, elegant, and Insta-worthy. I like pastel colors and flowy fits. Can you suggest an outfit from my wardrobe or find something online?"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Container - Scrollable */}
            {(messages.length > 0 || isGenerating) && (
              <div className="flex flex-1 flex-col overflow-hidden min-h-0 relative" style={{ zIndex: 1 }}>
                <div
                  className="flex-1 overflow-y-auto px-6 scrollbar-thin scrollbar-track-transparent min-h-0"
                  style={{ scrollbarColor: '#2a2a2a transparent' }}
                >
                  <div className="flex flex-col gap-6 py-6 mx-auto" style={{ maxWidth: '737px', width: '100%' }}>
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`group flex flex-col w-full ${message.isUser ? 'items-end' : 'items-start'}`}
                        >
                          {message.isUser ? (
                            // User message - Right aligned
                            <>
                              <div className="flex flex-col gap-2 max-w-[90%]">
                                <div className="px-5 py-5 rounded-2xl rounded-br-none bg-white/10 text-white">
                                  <p
                                    className="text-base font-medium whitespace-pre-wrap"
                                    style={{ lineHeight: '1.5' }}
                                  >
                                    {message.text}
                                  </p>
                                </div>
                              </div>
                              {/* Action buttons below message */}
                              <div className="mt-2 flex justify-end max-w-[90%]">
                                {renderMessageActions(message)}
                              </div>
                            </>
                          ) : message.type === 'product-response' ? (
                            // Product Response - Full width for sidebar layout
                            <div className="w-full" style={{ maxWidth: 'none' }}>
                              {message.outfitSuggestions && (
                                <ProductResponse
                                  outfitSuggestions={message.outfitSuggestions}
                                  selectedOutfit={selectedOutfit}
                                  isSidebarOpen={isOutfitSidebarOpen}
                                  onViewDetails={handleViewDetails}
                                  onProductLike={handleProductLike}
                                  onProductDislike={handleProductDislike}
                                  onProductShare={handleProductShare}
                                  onProductSave={handleProductSave}
                                />
                              )}
                            </div>
                          ) : (
                            // AI text message - Left aligned
                            <>
                              <div className="flex items-start gap-3 max-w-[90%]">
                                <div className="flex flex-col gap-2 flex-1">
                                  <div className="px-4 py-3 rounded-2xl text-white">
                                    <p
                                      className="text-base font-medium whitespace-pre-wrap"
                                      style={{ lineHeight: '1.75' }}
                                    >
                                      {message.text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Action buttons below message */}
                              <div className="mt-2 flex justify-start px-4">
                                {renderMessageActions(message)}
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}

                      {/* Generating Response */}
                      {isGenerating && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#D50048] via-[#BE7281] to-[#4D4E86] flex items-center justify-center text-white text-sm font-medium">
                            E
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="px-4 py-3 rounded-2xl bg-white/5">
                              {thinkingState && !currentResponse && (
                                <ShinyText text={`${thinkingState}...`} speed={2} className="text-sm" />
                              )}
                              {currentResponse && (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-white">
                                  {currentResponse}
                                  <span className="inline-block w-1 h-4 bg-white ml-1 animate-pulse" />
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input at bottom - Animated from center */}
                <motion.div
                  key="bottom-input"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.1
                  }}
                  className="flex-shrink-0 px-0 flex justify-center bg-transparent relative z-30"
                >
                  <ChatInput onSubmit={handleChatSubmit} />
                </motion.div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen w-full p-2" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        chatHistories={chatHistories}
        onNewChat={handleNewChat}
        onboardingState={onboardingState}
        onOpenOnboarding={onOpenOnboarding}
        wardrobeItemCount={wardrobeItemCount}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Desktop Left Navigation Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          chatHistories={chatHistories}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
          wardrobeItemCount={wardrobeItemCount}
          onboardingState={onboardingState}
          onOpenOnboarding={onOpenOnboarding}
        />
      </div>

      {/* Main Chat Container + Outfit Sidebar */}
      <div className="flex flex-1 overflow-hidden min-w-0 lg:ml-2">
        {/* Main Chat Container */}
        <div
          className="flex flex-1 flex-col overflow-hidden rounded-3xl relative"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {/* Mobile Header - Shown only on mobile */}
          <MobileHeader
            onMenuClick={() => setIsMobileSidebarOpen(true)}
            onSettingsClick={() => setIsSettingsOpen(true)}
          />

          {/* Gradient Blur Effect - Centered Background */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{
              borderRadius: '24.75rem',
              background: 'rgba(78, 79, 134, 0.48)',
              filter: 'blur(128px)',
              width: '24.75rem',
              height: '6.25rem',
            }}
          />

          {/* Desktop Header - Hidden on mobile */}
          <div className="hidden lg:block relative flex-shrink-0">
            <DynamicHeader
              title={getHeaderTitle()}
              credits={5}
              maxCredits={5}
              showActions={activeTab === 'new-chat' || (activeTab !== 'search' && activeTab !== 'wardrobe' && activeTab !== 'saved')}
              isProcessing={activeTab === 'wardrobe' && wardrobeProcessing}
              processedCount={wardrobeProcessedCount}
              totalProcessing={wardrobeTotalProcessing}
              itemCount={activeTab === 'wardrobe' ? wardrobeItemCount : undefined}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative z-10">
            {renderContent()}
          </div>
        </div>

        {/* Outfit Details Sidebar - Only in new-chat tab */}
        <ViewDetailsSidebar
          isOpen={isOutfitSidebarOpen && activeTab === 'new-chat'}
          onClose={handleCloseOutfitSidebar}
          outfit={selectedOutfit}
          onVirtualTryOn={handleVirtualTryOn}
          onProductLike={handleProductLike}
          likedOutfit={likedOutfit}
          dislikedOutfit={dislikedOutfit}
          savedOutfit={savedOutfit}
          onOutfitLike={handleOutfitLike}
          onOutfitDislike={handleOutfitDislike}
          onOutfitSave={handleOutfitSave}
        />

        {/* Wardrobe Item Sidebar - Only in wardrobe tab */}
        <WardrobeItemSidebar
          isOpen={isWardrobeSidebarOpen && activeTab === 'wardrobe'}
          onClose={handleWardrobeCloseSidebar}
          item={selectedWardrobeItem}
          isEditing={isWardrobeEditing}
          onEditToggle={handleWardrobeEditToggle}
          onSave={handleWardrobeSaveItem}
          onDelete={handleWardrobeDeleteItem}
        />

        {/* Saved Outfit Sidebar - Only in saved tab */}
        {selectedSavedOutfit && (
          <ViewDetailsSidebar
            isOpen={isSavedOutfitSidebarOpen && activeTab === 'saved'}
            onClose={handleSavedOutfitCloseSidebar}
            outfit={selectedSavedOutfit}
            onVirtualTryOn={handleVirtualTryOn}
            onProductLike={handleSavedOutfitProductLike}
            likedOutfit={likedSavedOutfit}
            dislikedOutfit={dislikedSavedOutfit}
            savedOutfit={savedSavedOutfit}
            onOutfitLike={handleSavedOutfitLike}
            onOutfitDislike={handleSavedOutfitDislike}
            onOutfitSave={handleSavedOutfitSave}
            hideLikeDislike={true}
          />
        )}

        {/* Virtual Try-On Modal */}
        {virtualTryOnOutfit && (
          <VirtualTryOnModal
            outfit={virtualTryOnOutfit}
            outfits={messages
              .filter(m => m.type === 'product-response' && m.outfitSuggestions)
              .flatMap(m => m.outfitSuggestions || [])}
            isOpen={isVirtualTryOnOpen}
            onClose={handleCloseVirtualTryOn}
            onSaveToLookbook={handleSaveToLookbook}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}
