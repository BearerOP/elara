"use client"

import { useState } from "react"
import { Star, Gift, MessageSquare, Settings, LogOut, User } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Menu, MenuTrigger, MenuPanel, MenuItem, MenuSeparator } from '@/components/animate-ui/components/base/menu'
import ReferralModal from "./ReferralModal"
import SettingsModal from './SettingsModal'
import { useRouter } from 'next/navigation'
import { clearAllStorage } from '@/lib/utils'

interface ChatHeaderProps {
  credits: number
  maxCredits: number
}

export function ChatHeader({ credits, maxCredits }: ChatHeaderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [location, setLocation] = useState('Kathmandu, Nepal')
  const [temperature, setTemperature] = useState(13)
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C')
  const router = useRouter()

  const handleLogout = () => {
    clearAllStorage()
    router.push('/login')
  }

  return (
    <>
      <header className="flex items-center px-6 py-4 border-b border-[#2a2a2a]">
        {/* Left side */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-medium text-xl" style={{ lineHeight: '1.26' }}>Elara Session</h2>

            {/* Action buttons */}
            {/* <button className="text-[#707070] hover:text-white transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button> */}
            <button className="text-[#707070] hover:text-white transition-colors">
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Center - Location & Weather */}
        <div className="flex items-center justify-center gap-6 px-5 py-2 rounded-full border border-transparent bg-[#252525]/40 backdrop-blur-[42px]" style={{ boxShadow: 'inset -5px -5px 250px 0px rgba(255, 255, 255, 0.02)' }}>
          {/* Weather Icon & Temperature */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C10.8954 4 10 4.89543 10 6V10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10V6C14 4.89543 13.1046 4 12 4Z" fill="white" fillOpacity="0.64" />
              <path d="M12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13C15 14.6569 13.6569 16 12 16Z" fill="white" fillOpacity="0.64" />
              <path d="M8 2H16M8 20H16" stroke="white" strokeOpacity="0.64" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="flex items-center gap-0.5">
              <span className="text-white text-base font-normal" style={{ letterSpacing: '-0.05em', lineHeight: '1.2' }}>{temperature}</span>
              <span className="text-white/70 text-xs font-normal" style={{ lineHeight: '1.2' }}>°{temperatureUnit}</span>
            </div>
          </div>

          {/* Location */}
          <span className="text-white text-sm font-normal" style={{ lineHeight: '1.2' }}>{location}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Gift icon */}
          <button
            onClick={() => setIsReferralModalOpen(true)}
            className="text-[#707070] hover:text-white transition-colors"
          >
            <Gift className="h-5 w-5" />
          </button>

          {/* Avatar with Menu */}
          <Menu>
            <MenuTrigger className="cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/user-avatar.png" />
                <AvatarFallback className="bg-[#2a2a2a] text-white text-xs">AY</AvatarFallback>
              </Avatar>
            </MenuTrigger>
            <MenuPanel className="bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl min-w-[240px] p-1">
              {/* User Info Header */}
              <div className="px-3 py-3 mb-1">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/images/user-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-br from-[#D50048] via-[#BE7281] to-[#4D4E86] text-white text-sm">
                      AY
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">Ankit Yadav</p>
                    <p className="text-white/60 text-xs">@work.ankit189</p>
                  </div>
                </div>
              </div>

              <MenuSeparator className="my-1 h-px bg-white/10" />

              {/* Menu Items */}
              <MenuItem
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </MenuItem>
              <MenuItem
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Support</span>
              </MenuItem>

              <MenuItem
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Community</span>
              </MenuItem>

              <MenuSeparator className="my-1 h-px bg-white/10" />

              <MenuItem
                onClick={handleLogout}
                variant="destructive"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer "
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </MenuItem>
            </MenuPanel>
          </Menu>
        </div>
      </header>

      {/* Referral Modal */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  )
}

export default ChatHeader
