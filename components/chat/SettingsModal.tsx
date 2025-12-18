'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, CreditCard, User, Shield, ChevronDown, Instagram, Music2, Check, LogOut } from 'lucide-react'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from '@/components/animate-ui/components/base/menu'
import { Button } from '@base-ui-components/react/button'
import { useRouter } from 'next/navigation'
import { clearAllStorage } from '@/lib/utils'
import { useSettings } from '@/hooks/useSettings'
import { ColorAnalysisDialog } from './dialogs/ColorAnalysisDialog'
import { HeightWeightDialog } from './dialogs/HeightWeightDialog'
import { VibesStackDialog } from './dialogs/VibesStackDialog'
import { BrandsStackDialog } from './dialogs/BrandsStackDialog'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/ui/ToastContainer'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabId = 'preferences' | 'plans' | 'account' | 'privacy'

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('preferences')
  const [profileSection, setProfileSection] = useState<'profile' | 'body' | 'style'>('profile')
  const router = useRouter()
  const { settings, updateSetting, updateSettings } = useSettings()
  const { toasts, success, removeToast } = useToast()

  // Dialog states
  const [colorDialogOpen, setColorDialogOpen] = useState(false)
  const [heightWeightDialogOpen, setHeightWeightDialogOpen] = useState(false)
  const [vibesDialogOpen, setVibesDialogOpen] = useState(false)
  const [brandsDialogOpen, setBrandsDialogOpen] = useState(false)

  const handleLogout = () => {
    clearAllStorage()
    router.push('/login')
  }

  const handleSaveSettings = () => {
    // Settings are already saved via updateSetting/updateSettings
    // Just show success toast and close modal
    success('Settings Saved', 'Your preferences have been updated successfully')
    setTimeout(() => {
      onClose()
    }, 500)
  }

  const tabs = [
    { id: 'preferences' as TabId, label: 'User & Preferences', icon: MessageSquare },
    { id: 'plans' as TabId, label: 'Plans & Credits', icon: CreditCard },
    { id: 'account' as TabId, label: 'Account Info', icon: User },
    { id: 'privacy' as TabId, label: 'Privacy & Security', icon: Shield },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-b from-[#161724] to-[#161616] rounded-2xl w-full max-w-5xl h-[90vh] max-h-[800px] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-white/10">
                <h2 className="text-lg md:text-xl font-semibold text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
                {/* Sidebar - Horizontal scroll on mobile, vertical on desktop */}
                <div className="md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-2 md:p-4 flex-shrink-0 flex flex-col overflow-x-auto md:overflow-x-visible">
                  <nav className="flex md:flex-col gap-1 md:space-y-1 flex-1 min-w-max md:min-w-0">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      const isActive = activeTab === tab.id
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm transition-colors whitespace-nowrap md:w-full ${isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                  </nav>

                  {/* Sign Out Button - Hidden on mobile */}
                  <Button
                    onClick={handleLogout}
                    className="hidden md:flex w-full items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-white/60 hover:text-red-500 hover:bg-red-500/5 mt-4"
                  >
                    <span>Sign Out</span>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="h-full">
                    {activeTab === 'preferences' && (
                      <div className="space-y-4">
                        {/* Sub-navigation */}
                        <div className="flex gap-0 border-b border-white/20 px-3 md:px-5 pt-1">
                          <button
                            onClick={() => setProfileSection('profile')}
                            className={`px-4 py-4 text-sm font-medium transition-colors relative ${profileSection === 'profile'
                              ? 'text-[#9D7CF5]'
                              : 'text-white/75 hover:text-white'
                              }`}
                          >
                            Profile
                            {profileSection === 'profile' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9D7CF5]" />
                            )}
                          </button>
                          <button
                            onClick={() => setProfileSection('body')}
                            className={`px-4 py-4 text-sm font-normal transition-colors relative ${profileSection === 'body'
                              ? 'text-[#9D7CF5]'
                              : 'text-white/75 hover:text-white'
                              }`}
                          >
                            Body & Fit
                            {profileSection === 'body' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9D7CF5]" />
                            )}
                          </button>
                          <button
                            onClick={() => setProfileSection('style')}
                            className={`px-4 py-4 text-sm font-normal transition-colors relative ${profileSection === 'style'
                              ? 'text-[#9D7CF5]'
                              : 'text-white/75 hover:text-white'
                              }`}
                          >
                            Style Preferences
                            {profileSection === 'style' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9D7CF5]" />
                            )}
                          </button>
                        </div>

                        {/* Profile Section */}
                        {profileSection === 'profile' && (
                          <div className="space-y-4 px-3 md:px-5 py-3 pb-20 ">
                            {/* What brings you to Elara */}
                            <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div className="">
                                <label className="text-sm font-medium text-white block">What brings you to Elara?</label>
                              </div>
                              <Menu>
                                <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                                  {settings.purpose || 'Select an option'}
                                  <ChevronDown className="h-5 w-5 ml-auto" />
                                </MenuTrigger>
                                <MenuPanel className="bg-[#2C2C2C] border-white/10">
                                  <MenuItem onClick={() => updateSetting('purpose', 'Build a new wardrobe')}>Build a new wardrobe</MenuItem>
                                  <MenuItem onClick={() => updateSetting('purpose', 'Refresh my style')}>Refresh my style</MenuItem>
                                  <MenuItem onClick={() => updateSetting('purpose', 'Find outfit inspiration')}>Find outfit inspiration</MenuItem>
                                  <MenuItem onClick={() => updateSetting('purpose', 'Shop smarter')}>Shop smarter</MenuItem>
                                </MenuPanel>
                              </Menu>
                            </div>

                            {/* Gender */}
                            <div className="pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div className="">
                                <label className="text-sm font-medium text-white block">Gender</label>
                              </div>
                              <Menu>
                                <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                                  {settings.gender === 'man' ? 'Male' : settings.gender === 'woman' ? 'Female' : settings.gender === 'other' ? 'Non-binary' : settings.gender || 'Select gender'}
                                  <ChevronDown className="h-5 w-5 ml-auto" />
                                </MenuTrigger>
                                <MenuPanel className="bg-[#2C2C2C] border-white/10">
                                  <MenuItem onClick={() => updateSetting('gender', 'man')}>Male</MenuItem>
                                  <MenuItem onClick={() => updateSetting('gender', 'woman')}>Female</MenuItem>
                                  <MenuItem onClick={() => updateSetting('gender', 'other')}>Non-binary</MenuItem>
                                  <MenuItem onClick={() => updateSetting('gender', null)}>Prefer not to say</MenuItem>
                                </MenuPanel>
                              </Menu>
                            </div>

                            {/* Social Media */}
                            <div className="flex items-start justify-between ">
                              <div className="">
                                <label className="text-sm font-medium text-white block">Social Media</label>
                              </div>
                              <div className="space-y-4 max-w-[270px]">
                                {/* Instagram */}
                                <div>
                                  <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-lg px-2 py-3 w-full">
                                    <div className="flex-shrink-0 w-5 h-5 rounded bg-gradient-to-br from-[#FFDD55] via-[#FF543E] to-[#C837AB] flex items-center justify-center">
                                      <Instagram className="h-3.5 w-3.5 text-white" />
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Paste your profile URL"
                                      className="flex-1 bg-transparent text-white/50 text-base outline-none placeholder:text-white/50"
                                    />
                                  </div>
                                </div>

                                {/* TikTok */}
                                <div>
                                  <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-lg px-2 py-3">
                                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                      <Music2 className="h-5 w-5 text-white" />
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Paste your profile URL"
                                      className="flex-1 bg-transparent text-white/50 text-base outline-none placeholder:text-white/50"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Body & Fit Section */}
                        {profileSection === 'body' && (
                          <div className="space-y-3 px-5 py-3 pb-20">
                            <div className='py-2 flex items-center justify-between '>
                              {/* Color Analysis */}
                              <div className="">
                                <label className="text-sm font-medium text-white block">Color Analysis</label>
                              </div>
                              <div className="flex items-center gap-2 opacity-90">
                                <button
                                  onClick={() => setColorDialogOpen(true)}
                                  className="py-2 border border-white/10  hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer flex justify-between items-center p-2 gap-2"
                                >
                                  {settings.colorAnalysis ? (
                                    <>
                                      <span className="text-white text-base">{settings.colorAnalysis.split('-')[0].toUpperCase()}</span>
                                      <div className="h-8 w-8 rounded-full bg-[#ECCAAA]"></div>
                                    </>
                                  ) : (
                                    <span className="text-white/60 text-sm">Click to set</span>
                                  )}
                                </button>
                              </div>
                            </div>


                            {/* Body Shape */}
                            <div className="py-2 pb-5 border-b border-white/10 flex justify-between items-center gap-3">
                              <div className="">
                                <label className="text-sm font-medium text-white">Body Shape</label>
                              </div>
                              <div className="opacity-90">
                                <Menu>
                                  <MenuTrigger className="bg-[#2C2C2C] text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]/80">
                                    {settings.bodyShape || 'Select body shape'}
                                    <ChevronDown className="h-5 w-5 ml-auto" />
                                  </MenuTrigger>
                                  <MenuPanel className="bg-[#2C2C2C] border-white/10">
                                    <MenuItem onClick={() => updateSetting('bodyShape', 'Ectomorph')}>Ectomorph</MenuItem>
                                    <MenuItem onClick={() => updateSetting('bodyShape', 'Mesomorph')}>Mesomorph</MenuItem>
                                    <MenuItem onClick={() => updateSetting('bodyShape', 'Endomorph')}>Endomorph</MenuItem>
                                  </MenuPanel>
                                </Menu>
                              </div>
                            </div>

                            {/* Height & Weight */}
                            <div className='py-2 flex items-center justify-between '>
                              <div className="flex items-center justify-between w-full">
                                <label className="text-sm font-medium text-white">Height & Weight</label>
                                <div className="flex items-center  gap-6 opacity-90">
                                  <button
                                    onClick={() => setHeightWeightDialogOpen(true)}
                                    className="py-2 flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-2"
                                  >
                                    {settings.heightUnit === 'ft' ? (
                                      <>
                                        <span className="text-white text-base">{settings.heightFeet} ft {settings.heightInches} in</span>
                                      </>
                                    ) : (
                                      <span className="text-white text-base">{settings.heightCm} cm</span>
                                    )}
                                    <span className="text-white/40">•</span>
                                    <span className="text-white text-base">
                                      {settings.weightUnit === 'kg' ? `${settings.weightKg} kg` : `${settings.weightLbs} lbs`}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Style Preferences Section */}
                        {profileSection === 'style' && (
                          <div className="space-y-3 px-5 py-3 pb-20 ">
                            {/* Preferred Vibes */}
                            <div className='py-2 flex items-center justify-between '>
                              <div className="">
                                <label className="text-sm font-medium text-white block cursor-pointer">Preferred Vibes</label>
                              </div>
                              <div className="flex items-center gap-2 w-fit">
                                <button
                                  onClick={() => setVibesDialogOpen(true)}
                                  className=" py-2  border border-white/10  hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer"
                                >
                                  {settings.preferredVibes.length > 0 ? (
                                    <span className="text-white text-base">{settings.preferredVibes.length} selected</span>
                                  ) : (
                                    <span className="text-white/60 text-sm">Click to select</span>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Preferred Brands */}
                            <div className='py-2 flex items-center justify-between '>
                              <div className="">
                                <label className="text-sm font-medium text-white block cursor-pointer">Preferred Brands</label>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setBrandsDialogOpen(true)}
                                  className="py-2  border border-white/10  hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer"
                                >
                                  {settings.preferredBrands.length > 0 ? (
                                    <span className="text-white text-base">{settings.preferredBrands.length} selected</span>
                                  ) : (
                                    <span className="text-white/60 text-sm">Click to select</span>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Budget Range */}
                            <div className="py-2 flex items-center justify-between ">
                              <div className="">
                                <label className="text-sm font-medium text-white block">Budget Range</label>
                              </div>
                              <Menu>
                                <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                                  {settings.budgetRange || 'Select budget range'}
                                  <ChevronDown className="h-5 w-5 ml-auto" />
                                </MenuTrigger>
                                <MenuPanel className="bg-[#2C2C2C] border-white/10">
                                  <MenuItem onClick={() => updateSetting('budgetRange', '$ - Budget Friendly')}>$ - Budget Friendly</MenuItem>
                                  <MenuItem onClick={() => updateSetting('budgetRange', '$$ - Mid Range')}>$$ - Mid Range</MenuItem>
                                  <MenuItem onClick={() => updateSetting('budgetRange', '$$$ - Premium')}>$$$ - Premium</MenuItem>
                                  <MenuItem onClick={() => updateSetting('budgetRange', '$$$$ - Luxury')}>$$$$ - Luxury</MenuItem>
                                </MenuPanel>
                              </Menu>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'plans' && (
                      <div className="flex items-center justify-center h-full min-h-[400px]">
                        <div className="text-center px-8 py-12">
                          <div className="inline-block px-6 py-3 mb-4 bg-gradient-to-r from-[#D50048] to-[#4D4E86] rounded-full text-white text-base font-medium">
                            Coming Soon
                          </div>
                          <p className="text-white/80 text-lg font-medium">
                            Plans & Credits will be available soon
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'account' && (
                      <div className="space-y-3 px-3 md:px-5 py-3 pb-20">
                        {/* Username */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Username</label>
                            <p className="text-sm text-white/60 mt-1">Your public identifier and profile URL.</p>
                          </div>
                          <input
                            type="text"
                            placeholder="mehuagar"
                            className="w-full bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 text-base outline-none max-w-[270px]"
                          />
                        </div>

                        {/* Email */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Email</label>
                            <p className="text-sm text-white/60 mt-1">Your email address associated with your account.</p>
                          </div>
                          <input
                            type="email"
                            placeholder="mehuagar@gmail.com"
                            className="w-full bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 text-base outline-none max-w-[270px]"
                          />
                        </div>

                        {/* Name */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Name</label>
                            <p className="text-sm text-white/60 mt-1">Your full name, as visible to others.</p>
                          </div>
                          <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 text-base outline-none max-w-[270px]"
                          />
                        </div>

                        {/* Linked sign-in providers */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Linked sign-in providers</label>
                            <p className="text-sm text-white/60 mt-1">Your full name, as visible to others.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-[#2C2C2C]/90 rounded-lg px-2 py-3 w-fit">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.7096C14.0225 13.6071 12.1763 15 10 15C7.23875 15 5 12.7612 5 9.99996C5 7.23871 7.23875 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C5.39792 1.66663 1.66667 5.39788 1.66667 9.99996C1.66667 14.602 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1713 8.36788Z" fill="#FFC107" />
                              <path d="M2.6275 6.12121L5.36542 8.12913C6.10625 6.29496 7.90042 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C6.79917 1.66663 4.02334 3.47371 2.6275 6.12121Z" fill="#FF3D00" />
                              <path d="M10 18.3333C12.1525 18.3333 14.1083 17.5095 15.5871 16.1712L13.0079 13.9875C12.1431 14.6452 11.0864 15.0009 10 15C7.83255 15 5.99213 13.6179 5.29880 11.6891L2.58047 13.783C3.96047 16.4816 6.76130 18.3333 10 18.3333Z" fill="#4CAF50" />
                              <path d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1709C15.4046 16.3363 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1713 8.36796Z" fill="#1976D2" />
                            </svg>
                            <span className="text-white/50 text-base">mehuagar@gmail.com</span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Location</label>
                          </div>
                          <Menu>
                            <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                              {settings.location || 'Select location'}
                              <ChevronDown className="h-5 w-5 ml-auto" />
                            </MenuTrigger>
                            <MenuPanel className="bg-[#2C2C2C] border-white/10">
                              <MenuItem onClick={() => updateSetting('location', 'United States')}>United States</MenuItem>
                              <MenuItem onClick={() => updateSetting('location', 'United Kingdom')}>United Kingdom</MenuItem>
                              <MenuItem onClick={() => updateSetting('location', 'Canada')}>Canada</MenuItem>
                              <MenuItem onClick={() => updateSetting('location', 'Australia')}>Australia</MenuItem>
                              <MenuItem onClick={() => updateSetting('location', 'India')}>India</MenuItem>
                              <MenuItem onClick={() => updateSetting('location', 'Other')}>Other</MenuItem>
                            </MenuPanel>
                          </Menu>
                        </div>

                        {/* Preferred temperature unit */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="mb-3">
                            <label className="text-sm font-medium text-white block">Preferred temperature unit</label>
                          </div>
                          <Menu>
                            <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                              {settings.temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
                              <ChevronDown className="h-5 w-5 ml-auto" />
                            </MenuTrigger>
                            <MenuPanel className="bg-[#2C2C2C] border-white/10">
                              <MenuItem onClick={() => updateSetting('temperatureUnit', 'celsius')}>Celsius (°C)</MenuItem>
                              <MenuItem onClick={() => updateSetting('temperatureUnit', 'fahrenheit')}>Fahrenheit (°F)</MenuItem>
                            </MenuPanel>
                          </Menu>
                        </div>

                        {/* Delete Account */}
                        <div className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Delete Account</label>
                            <p className="text-sm text-white/60 mt-1">Permanently delete your elara account. This cannot be undone.</p>
                          </div>
                          <button className="px-5 py-2 bg-[#D50048] text-white rounded-lg hover:bg-[#D50048]/90 transition-colors text-base">
                            Delete account
                          </button>
                        </div>
                        <div className="h-[1px] bg-white/10 w-full" />
                      </div>
                    )}

                    {activeTab === 'privacy' && (
                      <div className="space-y-3 px-3 md:px-5 py-3 pb-20">
                        {/* Profile Visibility */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Profile Visibility</label>
                            <p className="text-sm text-white/60 mt-1">Choose whether your profile is accessible to everyone, friends or no-one.</p>
                          </div>
                          <Menu>
                            <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                              {settings.profileVisibility || 'Select visibility'}
                              <ChevronDown className="h-5 w-5 ml-auto" />
                            </MenuTrigger>
                            <MenuPanel className="bg-[#2C2C2C] border-white/10">
                              <MenuItem onClick={() => updateSetting('profileVisibility', 'Public')}>Public - Anyone can view</MenuItem>
                              <MenuItem onClick={() => updateSetting('profileVisibility', 'Friends Only')}>Friends Only</MenuItem>
                              <MenuItem onClick={() => updateSetting('profileVisibility', 'Private')}>Private - Only you</MenuItem>
                            </MenuPanel>
                          </Menu>
                        </div>

                        {/* Default wardrobe access */}
                        <div className="py-2 pb-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Default wardrobe access</label>
                            <p className="text-sm text-white/60 mt-1">Choose whether your wardrobe is accessible to everyone, friends or no-one.</p>
                          </div>
                          <Menu>
                            <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                              {settings.wardrobeAccess || 'Select access'}
                              <ChevronDown className="h-5 w-5 ml-auto" />
                            </MenuTrigger>
                            <MenuPanel className="bg-[#2C2C2C] border-white/10">
                              <MenuItem onClick={() => updateSetting('wardrobeAccess', 'Private')}>Private - Only you</MenuItem>
                              <MenuItem onClick={() => updateSetting('wardrobeAccess', 'Friends Only')}>Friends Only</MenuItem>
                              <MenuItem onClick={() => updateSetting('wardrobeAccess', 'Public')}>Public - Anyone can view</MenuItem>
                            </MenuPanel>
                          </Menu>
                        </div>

                        {/* Notifications */}
                        <div className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="">
                            <label className="text-sm font-medium text-white block">Notifications</label>
                          </div>
                          <Menu>
                            <MenuTrigger className="bg-[#2C2C2C]/90 text-white rounded-lg px-5 py-2 pr-10 cursor-pointer text-base outline-none inline-flex items-center gap-2 hover:bg-[#2C2C2C]">
                              {settings.notifications || 'Select notification preference'}
                              <ChevronDown className="h-5 w-5 ml-auto" />
                            </MenuTrigger>
                            <MenuPanel className="bg-[#2C2C2C] border-white/10">
                              <MenuItem onClick={() => updateSetting('notifications', 'All notifications')}>All notifications</MenuItem>
                              <MenuItem onClick={() => updateSetting('notifications', 'Important only')}>Important only</MenuItem>
                              <MenuItem onClick={() => updateSetting('notifications', 'None')}>None</MenuItem>
                            </MenuPanel>
                          </Menu>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-[#292929]">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/10 text-white/75 rounded-lg hover:bg-white/15 transition-colors text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors text-base font-normal"
                >
                  Save changes
                </button>
              </div>
            </motion.div>
          </div>

          {/* Dialogs */}
          <ColorAnalysisDialog
            isOpen={colorDialogOpen}
            onClose={() => setColorDialogOpen(false)}
            selectedColor={settings.colorAnalysis}
            onSelect={(color) => updateSetting('colorAnalysis', color)}
          />
          <HeightWeightDialog
            isOpen={heightWeightDialogOpen}
            onClose={() => setHeightWeightDialogOpen(false)}
            initialData={{
              heightUnit: settings.heightUnit,
              weightUnit: settings.weightUnit,
              heightFeet: settings.heightFeet,
              heightInches: settings.heightInches,
              heightCm: settings.heightCm,
              weightKg: settings.weightKg,
              weightLbs: settings.weightLbs,
            }}
            onSave={(data) => updateSettings(data)}
          />
          <VibesStackDialog
            isOpen={vibesDialogOpen}
            onClose={() => setVibesDialogOpen(false)}
            selectedVibes={settings.preferredVibes}
            onSave={(vibes) => updateSetting('preferredVibes', vibes)}
            gender={settings.gender}
          />
          <BrandsStackDialog
            isOpen={brandsDialogOpen}
            onClose={() => setBrandsDialogOpen(false)}
            selectedBrands={settings.preferredBrands}
            onSave={(brands) => updateSetting('preferredBrands', brands)}
          />

          {/* Toast Container */}
          <ToastContainer toasts={toasts} onClose={removeToast} />
        </>
      )}
    </AnimatePresence>
  )
}

export default SettingsModal
