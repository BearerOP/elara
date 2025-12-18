"use client"

import { Search } from "lucide-react"

export default function SearchChatsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="p-4 rounded-full bg-white/5">
          <Search className="h-8 w-8 text-[#707070]" />
        </div>
        <h2 className="text-xl font-medium text-white">Search Your Chats</h2>
        <p className="text-sm text-[#707070] leading-relaxed">
          Find your previous conversations, outfit suggestions, and styling sessions quickly.
        </p>
        <div className="w-full mt-4">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-[#707070] focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

