'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Trash2, Pencil } from 'lucide-react'
import Image from 'next/image'
import { WardrobeItem } from '@/lib/wardrobeData'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from '@/components/animate-ui/components/base/menu'

interface WardrobeItemSidebarProps {
  item: WardrobeItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (item: WardrobeItem) => void
  onDelete: (itemId: string) => void
  isEditing: boolean
  onEditToggle: () => void
}

const categoryOptions = ['Top', 'Bottom', 'Shoes', 'Accessories', 'Outerwear', 'Other pieces']
const dressCodeOptions = ['Casual', 'Formal', 'Business Casual', 'Smart Casual', 'Sporty']
const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter']
const lengthOptions = ['Short', 'Normal', 'Long', 'Extra Long']
const fabricOptions = ['Cotton', 'Polyester', 'Denim', 'Wool', 'Silk', 'Linen', 'Leather']

export default function WardrobeItemSidebar({
  item,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isEditing,
  onEditToggle,
}: WardrobeItemSidebarProps) {
  const [editedItem, setEditedItem] = useState<WardrobeItem | null>(null)
  const [allowInStyling, setAllowInStyling] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (item) {
      setEditedItem(item)
      setAllowInStyling(item.allowInStyling)
    }
  }, [item])

  if (!item || !editedItem) return null

  const toggleDropdown = (key: string) => {
    const newSet = new Set(openDropdowns)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setOpenDropdowns(newSet)
  }

  const handleSave = () => {
    const updated = { ...editedItem, allowInStyling }
    onSave(updated)
    onEditToggle()
  }

  const handleCancel = () => {
    setEditedItem(item)
    setAllowInStyling(item.allowInStyling)
    onEditToggle()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop - only on screens < md (768px) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="
              flex-shrink-0 h-full flex flex-col overflow-hidden border-none min-w-0 bg-[#1a1a1a] rounded-2xl
              fixed md:relative right-0 top-0 bottom-0 z-50 w-full max-w-[359px]
              md:ml-2
            "
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b"
              style={{ borderColor: '#2a2a2a' }}
            >
              <h2
                className="text-lg font-medium text-white"
                style={{ lineHeight: '1.56' }}
              >
                {item.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent min-h-0"
              style={{ scrollbarColor: '#2a2a2a transparent' }}
            >
              <div className="flex flex-col gap-6 py-6">
                {/* Image */}
                <div className="relative w-full px-6">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '316px' }}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="331px"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                  </div>
                </div>

                {/* Allow in styling toggle */}
                <div className="flex items-center justify-between px-12 gap-6">
                  <span className="text-base font-normal text-white">Allow in styling</span>
                  <Toggle
                    checked={allowInStyling}
                    onChange={setAllowInStyling}
                    disabled={!isEditing}
                  />
                </div>

                {/* Product Information */}
                <div className="flex flex-col gap-4">
                  <div className="px-6">
                    <h3
                      className="text-sm font-normal"
                      style={{ color: 'rgba(255, 255, 255, 0.48)' }}
                    >
                      PRODUCT INFORMATION
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5 px-12">
                    <p
                      className="text-base font-normal text-white"
                      style={{ lineHeight: '1.5' }}
                    >
                      {editedItem.description || 'A stylish and polished look for a brunch at ETHGlobal Conference in Argentina.'}
                    </p>
                  </div>

                  {/* Category */}
                  <DropdownField
                    label="Category"
                    value={editedItem.category}
                    isOpen={openDropdowns.has('category')}
                    onToggle={() => toggleDropdown('category')}
                    isEditing={isEditing}
                    options={categoryOptions}
                    onSelect={(value) => setEditedItem({ ...editedItem, category: value })}
                  />

                  {/* Dress codes */}
                  <DropdownField
                    label="Dress codes"
                    value={editedItem.dressCodes.join(', ')}
                    isOpen={openDropdowns.has('dressCodes')}
                    onToggle={() => toggleDropdown('dressCodes')}
                    isEditing={isEditing}
                    tagValues={editedItem.dressCodes}
                    options={dressCodeOptions}
                    onSelect={(value) => {
                      if (!editedItem.dressCodes.includes(value)) {
                        setEditedItem({ ...editedItem, dressCodes: [...editedItem.dressCodes, value] })
                      }
                    }}
                  />

                  {/* Seasons */}
                  <DropdownField
                    label="Seasons"
                    value={editedItem.seasons.join(', ')}
                    isOpen={openDropdowns.has('seasons')}
                    onToggle={() => toggleDropdown('seasons')}
                    isEditing={isEditing}
                    tagValues={editedItem.seasons}
                    options={seasonOptions}
                    onSelect={(value) => {
                      if (!editedItem.seasons.includes(value)) {
                        setEditedItem({ ...editedItem, seasons: [...editedItem.seasons, value] })
                      }
                    }}
                  />

                  {/* Colors */}
                  <div className="flex items-center justify-between px-12">
                    <span className="text-base font-normal text-white/72">Colors</span>
                    <div className="flex items-center gap-1">
                      {editedItem.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Length */}
                  <DropdownField
                    label="Length"
                    value={editedItem.length}
                    isOpen={openDropdowns.has('length')}
                    onToggle={() => toggleDropdown('length')}
                    isEditing={isEditing}
                    options={lengthOptions}
                    onSelect={(value) => setEditedItem({ ...editedItem, length: value })}
                  />

                  {/* Fabrics */}
                  <DropdownField
                    label="Fabrics"
                    value={editedItem.fabrics.join(', ')}
                    isOpen={openDropdowns.has('fabrics')}
                    onToggle={() => toggleDropdown('fabrics')}
                    isEditing={isEditing}
                    tagValues={editedItem.fabrics}
                    options={fabricOptions}
                    onSelect={(value) => {
                      if (!editedItem.fabrics.includes(value)) {
                        setEditedItem({ ...editedItem, fabrics: [...editedItem.fabrics, value] })
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar - Sticky */}
            <div
              className="flex-shrink-0 flex items-center justify-end gap-2 px-6 py-4 border-t sticky bottom-0"
              style={{
                borderColor: '#292929',
                backgroundColor: '#1F1F1F',
              }}
            >
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/72 hover:text-white hover:bg-white/10 transition-colors"
                    style={{ height: '40px' }}
                  >
                    <X className="h-4 w-4" />
                    <span className="text-base font-normal">Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    <span className="text-base font-medium">Save changes</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-white/72 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={onEditToggle}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/72 hover:text-white hover:bg-white/10 transition-colors"
                    style={{ height: '40px' }}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="text-base font-normal">Edit</span>
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    <span className="text-base font-medium">Style this</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-purple-600' : 'bg-white/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full"
      />
    </button>
  )
}

interface DropdownFieldProps {
  label: string
  value: string
  isOpen: boolean
  onToggle: () => void
  isEditing: boolean
  tagValues?: string[]
  options?: string[]
  onSelect?: (value: string) => void
}

function DropdownField({
  label,
  value,
  isOpen,
  onToggle,
  isEditing,
  tagValues,
  options = [],
  onSelect,
}: DropdownFieldProps) {
  if (tagValues && tagValues.length > 0) {
    return (
      <div className="flex items-center justify-between px-12">
        <span className="text-base font-normal text-white/72">{label}</span>
        {isEditing ? (
          <Menu>
            <MenuTrigger className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#2C2C2C] hover:bg-[#2C2C2C]/80 cursor-pointer">
              <span className="text-base font-normal text-white">{value}</span>
              <ChevronDown className="h-5 w-5 text-white" />
            </MenuTrigger>
            <MenuPanel className="bg-[#2C2C2C] border-white/10">
              {options.map((option) => (
                <MenuItem key={option} onClick={() => onSelect?.(option)}>
                  {option}
                </MenuItem>
              ))}
            </MenuPanel>
          </Menu>
        ) : (
          <div className="flex items-center gap-1">
            {tagValues.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full text-sm font-normal text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  lineHeight: '1.43',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-12">
      <span className="text-base font-normal text-white/72">{label}</span>
      {isEditing ? (
        <Menu>
          <MenuTrigger className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#2C2C2C] hover:bg-[#2C2C2C]/80 cursor-pointer">
            <span className="text-base font-normal text-white">{value}</span>
            <ChevronDown className="h-5 w-5 text-white" />
          </MenuTrigger>
          <MenuPanel className="bg-[#2C2C2C] border-white/10">
            {options.map((option) => (
              <MenuItem key={option} onClick={() => onSelect?.(option)}>
                {option}
              </MenuItem>
            ))}
          </MenuPanel>
        </Menu>
      ) : (
        <span className="text-base font-normal text-white">{value}</span>
      )}
    </div>
  )
}

