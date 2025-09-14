import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto h-[calc(100vh-3rem)]">
        <ChatInterface />
      </div>
    </div>
  )
}
