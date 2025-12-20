"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Bookmark, ChevronDown, MoreHorizontal, Star, Edit2, Archive, Trash2 } from "lucide-react"

import Image from "next/image"
import Logo from "@/components/ui/Logo"
import { SidebarCloseIcon, SidebarOpenIcon, Wardrobe } from "@/components/icons"
import { Tooltip, TooltipTrigger, TooltipPanel } from "@/components/animate-ui/components/base/tooltip"
import { Menu, MenuTrigger, MenuPanel, MenuItem, MenuSeparator } from "@/components/animate-ui/components/base/menu"
import { RenameChatModal } from "./RenameChatModal"
import { DeleteChatModal } from "./DeleteChatModal"
import { ToastContainer } from "@/components/ui/ToastContainer"
import { useToast } from "@/hooks/useToast"
import { OnboardingProgress } from "./OnboardingProgress"
import { useOnboardingState } from "@/hooks/useOnboardingState"

interface ChatHistory {
  id: string
  title: string
  messages: any[]
  createdAt: number
  updatedAt: number
}

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  selectedChat: string
  onSelectChat: (chat: string, chatId?: string) => void
  activeTab: string
  onTabChange: (tab: string) => void
  chatHistories: ChatHistory[]
  onRenameChat: (chatId: string, newTitle: string) => void
  onDeleteChat: (chatId: string) => void
  wardrobeItemCount?: number
  onboardingState?: ReturnType<typeof useOnboardingState>
  onOpenOnboarding?: () => void
}

export function Sidebar({
  isCollapsed,
  onToggle,
  selectedChat,
  onSelectChat,
  activeTab,
  onTabChange,
  chatHistories,
  onRenameChat,
  onDeleteChat,
  wardrobeItemCount = 0,
  onboardingState,
  onOpenOnboarding
}: SidebarProps) {
  const [isAllChatsOpen, setIsAllChatsOpen] = useState(true)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)
  const [starredChats, setStarredChats] = useState<Set<string>>(new Set())
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null)
  const { toasts, success, removeToast } = useToast()

  const handleStarChat = (chatId: string) => {
    setStarredChats(prev => {
      const newSet = new Set(prev)
      if (newSet.has(chatId)) {
        newSet.delete(chatId)
      } else {
        newSet.add(chatId)
      }
      return newSet
    })
  }

  // Keyboard shortcut: Cmd + . to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault()
        onToggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onToggle])

  const handleRenameClick = (chatId: string) => {
    setRenamingChatId(chatId)
    setIsRenameModalOpen(true)
  }

  const handleRenameSubmit = (newTitle: string) => {
    if (renamingChatId && newTitle.trim()) {
      onRenameChat(renamingChatId, newTitle)
      success('Chat renamed successfully', `Your chat has been renamed to "${newTitle}".`)
    }
    setIsRenameModalOpen(false)
    setRenamingChatId(null)
  }

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false)
    setRenamingChatId(null)
  }

  const handleDeleteClick = (chatId: string) => {
    setDeletingChatId(chatId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSubmit = () => {
    if (deletingChatId) {
      const chatTitle = chatHistories.find(c => c.id === deletingChatId)?.title || 'Chat'
      onDeleteChat(deletingChatId)
      success('Chat deleted successfully', `"${chatTitle}" has been permanently deleted.`)
    }
    setIsDeleteModalOpen(false)
    setDeletingChatId(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingChatId(null)
  }

  const navItems = [
    { icon: Plus, label: "New chat", id: "new-chat" },
    { icon: Search, label: "Search chats", id: "search" },
    { icon: Wardrobe, label: "Wardrobe", id: "wardrobe" },
    { icon: Bookmark, label: "Saved Outfits", id: "saved" },
  ]

  return (
    <div className={`flex flex-col bg-transparent transition-all duration-300 h-full max-h-screen group ${isCollapsed ? "w-[68px]" : "w-[268px]"}`}>
      {/* Header with Logo and Toggle */}
      <div className={`flex items-center justify-between flex-shrink-0 px-5 py-6 ${isCollapsed ? "px-3" : ""}`}>
        {!isCollapsed && <>

          <Logo size="sm" className='block md:hidden' />
          <Logo size="lg" className='hidden md:block' />
        </>}
        <Tooltip>
          <TooltipTrigger
            onClick={onToggle}
            className={`p-2 text-[#707070] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all duration-200 ${isCollapsed ? "mx-auto" : ""
              }`}
          >
            {
              isCollapsed ? <SidebarOpenIcon className="h-4 w-4 hover:text-white hover:bg-white" width={18} height={18} /> :
                <SidebarCloseIcon className="h-4 w-4 hover:text-white hover:bg-white" width={18} height={18} />}
          </TooltipTrigger>
          <TooltipPanel side="right" className="bg-[#1a1a1a] text-white border border-white/10">
            <span className="flex items-center gap-1.5">
              {isCollapsed ? "Open" : "Close"} Sidebar
              <kbd className="ml-1 px-1.5 py-0.5 text-[10px] bg-white/10 rounded">⌘</kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded">.</kbd>
            </span>
          </TooltipPanel>
        </Tooltip>
      </div>

      {/* Onboarding Progress - Only show if not complete */}
      {!isCollapsed && onboardingState && !onboardingState.isOnboardingComplete() && onOpenOnboarding && (
        <div className="px-3 mb-2">
          <OnboardingProgress
            completedSteps={onboardingState.getCompletedSteps()}
            totalSteps={10}
            onClick={onOpenOnboarding}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-3 flex-shrink-0">
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id
          const IconComponent = item.icon

          if (isCollapsed) {
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger
                  onClick={() => {
                    if (item.id === 'new-chat') {
                      onSelectChat('New chat')
                    }
                    onTabChange(item.id)
                  }}
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 text-sm justify-center ${isActive
                    ? "bg-[#1a1a1a] text-white"
                    : "text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]/50"
                    }`}
                >
                  {index === 0 ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D50048]/30 via-[#BE7281]/30 to-[#4D4E86]/30 rounded blur-[2px]"></div>
                      <IconComponent className="h-4 w-4 flex-shrink-0 relative z-10" style={{
                        background: 'linear-gradient(135deg, #D50048 0%, #BE7281 50%, #4D4E86 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }} />
                    </div>
                  ) : (
                    <IconComponent
                      className={`h-4 w-4 flex-shrink-0 ${isActive ? 'fill-white' : ''}`}
                      filled={isActive}
                    />
                  )}
                </TooltipTrigger>
                <TooltipPanel side="right" className="bg-[#1a1a1a] text-white border border-white/10">
                  {item.label}
                </TooltipPanel>
              </Tooltip>
            )
          }

          return (
            <div
              key={item.label}
              className="relative cursor-pointer rounded-lg"
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => {
                if (item.id === 'new-chat') {
                  onSelectChat('New chat')
                }
                onTabChange(item.id)
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={`${item.id}-active`}
                    layoutId="sidebar-nav-active"
                    className="pointer-events-none absolute inset-0 rounded-lg bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && hoveredNav === item.id && (
                  <motion.div
                    key={`${item.id}-hover`}
                    layoutId="sidebar-nav-hover"
                    className="pointer-events-none absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <div
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${isActive ? "text-black" : "text-[#a0a0a0]"
                  }`}
              >
                {index === 0 ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D50048]/30 via-[#BE7281]/30 to-[#4D4E86]/30 rounded blur-[2px]"></div>
                    <IconComponent className="h-4 w-4 flex-shrink-0 relative" style={{
                      background: 'linear-gradient(135deg, #D50048 0%, #BE7281 50%, #4D4E86 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }} />
                  </div>
                ) : (
                  <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? 'fill-black' : ''}`} />
                )}
                <span className={isActive ? "text-black" : "text-white"}>{item.label}</span>

                {/* Wardrobe count badge or "Add items now!" */}
                {item.id === 'wardrobe' && (
                  <>
                    {wardrobeItemCount > 0 ? (
                      <div
                        className="ml-auto flex items-center justify-center px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                          padding: '2px 8px'
                        }}
                      >
                        <span
                          className={`text-sm font-normal ${isActive ? 'text-black/72' : 'text-white/72'}`}
                          style={{ lineHeight: '1.4285714285714286em' }}
                        >
                          {wardrobeItemCount}
                        </span>
                      </div>
                    ) : (
                      <span className={`ml-auto text-xs font-normal ${isActive ? 'text-black/60' : 'text-[#D4A574]'}`}>
                        Add items now!
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Recents section - hidden when collapsed */}
      {!isCollapsed && (
        <div className="mt-6 px-3 flex-1 flex flex-col overflow-hidden">
          <button
            onClick={() => setIsAllChatsOpen(!isAllChatsOpen)}
            className="flex items-center gap-2 px-3 py-2 text-[#707070] hover:text-white text-sm transition-colors w-full flex-shrink-0 justify-between"
          >
            <span>Recents</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isAllChatsOpen ? "rotate-180" : ""}`} />
          </button>
          {isAllChatsOpen && (
            <div className="flex flex-col gap-0.5 mt-1 overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
              {chatHistories.map((chat) => {
                const isActive = selectedChat === chat.title
                const isHover = hoveredChat === chat.id
                return (
                  <AnimatePresence key={chat.id}>
                    <div
                      className="relative group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex-shrink-0 cursor-pointer"
                      onMouseEnter={() => setHoveredChat(chat.id)}
                      onMouseLeave={() => setHoveredChat(null)}
                      onClick={() => onSelectChat(chat.title, chat.id)}
                    >
                      {isActive && (
                        <motion.div
                          key={`${chat}-active`}
                          layoutId="recent-active"
                          className="pointer-events-none absolute inset-0 rounded-lg bg-white"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {!isActive && isHover && (
                        <motion.div
                          key={`${chat}-hover`}
                          layoutId="recent-hover"
                          className="pointer-events-none absolute inset-0 rounded-lg bg-white/10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      <div className={`relative flex-1 text-left truncate ${isActive ? "text-black" : "text-[#a0a0a0]"}`}>
                        {chat.title}
                      </div>

                      <Menu>
                        <MenuTrigger
                          onClick={(e) => e.stopPropagation()}
                          className={`relative p-1 rounded transition-colors flex-shrink-0 ${isActive ? "opacity-100 text-black" : "opacity-0 group-hover:opacity-100 text-white"
                            } ${!isActive ? "hover:bg-white/10" : "hover:bg-white/20"}`}
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </MenuTrigger>
                        <MenuPanel className="bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl min-w-[180px] p-1">
                          <MenuItem
                            variant="warning"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStarChat(chat.id)
                            }} className={`flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors ${starredChats.has(chat.id) ? 'fill-yellow-500 bg-yellow-500/10' : ''}`}>
                            <Star className={`h-4 w-4 ${starredChats.has(chat.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                            <span>Star</span>
                          </MenuItem>
                          <MenuItem variant="default" onClick={(e) => {
                            e.stopPropagation()
                            handleRenameClick(chat.id)
                          }} className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors">
                            <Edit2 className="h-4 w-4" />
                            <span>Rename</span>
                          </MenuItem>
                          <MenuSeparator className="my-1 h-px bg-white/10" />
                          <MenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(chat.id)
                            }}
                            variant="destructive"
                            className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </MenuItem>
                        </MenuPanel>
                      </Menu>
                    </div>
                  </AnimatePresence>

                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Mobile App Promo - hidden when collapsed, always at bottom */}
      {!isCollapsed && (
        <div className="p-3 flex-shrink-0 mt-auto ">
          <div className="rounded-xl bg-[#1a1a1a] p-4 pb-0">
            <h3 className="text-white text-sm font-medium mb-1">Elara's Mobile App is Coming</h3>
            <p className="text-[#707070] text-xs leading-relaxed mb-4">
              Style smarter, scroll smoother, shop faster. Be the first to try the AI stylist in your pocket.
            </p>
            <button className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Join waitlist now
            </button>
            {/* Phone Mockup */}
            <div className="mt-4 relative">
              <Image src="/images/iphone-mockup.svg" alt="Phone Mockup" width={100} height={100} className="w-full h-full object-contain relative bottom-0" />
            </div>
          </div>
        </div>
      )}

      {/* Rename Chat Modal */}
      <RenameChatModal
        isOpen={isRenameModalOpen}
        onClose={handleCloseRenameModal}
        onRename={handleRenameSubmit}
        currentTitle={renamingChatId ? chatHistories.find(c => c.id === renamingChatId)?.title || '' : ''}
      />

      {/* Delete Chat Modal */}
      <DeleteChatModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteSubmit}
        chatTitle={deletingChatId ? chatHistories.find(c => c.id === deletingChatId)?.title || '' : ''}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  )
}

export default Sidebar

