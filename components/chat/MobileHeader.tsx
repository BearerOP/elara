'use client'

import { useState } from 'react'
import { Settings, MessageSquare, LogOut, User, ChevronDown } from 'lucide-react'
import MenuIcon from '@/components/icons/MenuIcon'
import { useRouter } from 'next/navigation'
import { clearAllStorage } from '@/lib/utils'
import { useSettings } from '@/hooks/useSettings'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Menu, MenuTrigger, MenuPanel, MenuItem, MenuSeparator } from '@/components/animate-ui/components/base/menu'


interface MobileHeaderProps {
    onMenuClick: () => void
    onSettingsClick?: () => void
}

export function MobileHeader({ onMenuClick, onSettingsClick }: MobileHeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter()
    const { settings } = useSettings()

    const handleLogout = () => {
        clearAllStorage()
        router.push('/login')
    }

    // Get temperature and location from settings
    const temperature = settings.temperatureUnit === 'celsius' ? '4.5°C' : '40°F'
    const location = settings.location || 'Kathmandu, Nepal'

    return (
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
            {/* Left: Hamburger Menu */}
            <button
                onClick={onMenuClick}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Open menu"
            >
                <MenuIcon className="h-6 w-6 text-white" />
            </button>

            {/* Center: Temperature & Location */}
            <div className="flex items-center gap-2">
                <span className="text-white text-base font-medium">{location}</span>
                <span className="text-white/60 text-sm">{temperature}</span>
                <ChevronDown className="h-4 w-4 text-white/60" />
            </div>

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
                        onClick={() => {
                            onSettingsClick?.()
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSettingsClick?.()
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded cursor-pointer transition-colors"
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span>Support</span>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            onSettingsClick?.()
                        }}
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
    )
}
