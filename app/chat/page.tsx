'use client'

import { Suspense } from 'react'
import ChatInterfaceWithOnboarding from '@/components/chat/ChatInterfaceWithOnboarding'

function ChatPageContent() {
  return <ChatInterfaceWithOnboarding />
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  )
}

