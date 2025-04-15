
import { ChatInterface } from "@/components/ChatInterface"
import { EmotionDetection } from "@/components/EmotionDetection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useState } from "react"

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 md:container">
        <h1 className="text-3xl font-bold mb-6">AI Therapy Chat</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
          <div className="lg:col-span-1">
            <EmotionDetection text={currentMessage} autoDetect={true} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Chat
