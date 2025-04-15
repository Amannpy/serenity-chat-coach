
import { useState, useRef, useEffect } from "react"
import { SendHorizontal, Smile, Mic, MicOff, Brain } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  emotion?: "neutral" | "happy" | "sad" | "anxious" | "angry"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm Serenity, your AI mental health companion. How are you feeling today?",
    sender: "bot",
    timestamp: new Date()
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    
    // Simulate AI thinking
    setIsThinking(true)
    
    // In a real app, we would call our AI API here
    // For now, simulate a delayed response with mock emotional analysis
    setTimeout(() => {
      // Detect mock emotion (would use real AI in production)
      let detectedEmotion: Message["emotion"] = "neutral"
      
      if (input.toLowerCase().includes("sad") || input.toLowerCase().includes("depressed")) {
        detectedEmotion = "sad"
      } else if (input.toLowerCase().includes("anxious") || input.toLowerCase().includes("worry")) {
        detectedEmotion = "anxious"
      } else if (input.toLowerCase().includes("happy") || input.toLowerCase().includes("great")) {
        detectedEmotion = "happy"
      } else if (input.toLowerCase().includes("angry") || input.toLowerCase().includes("mad")) {
        detectedEmotion = "angry"
      }
      
      // Generate a response based on the detected emotion
      let response = ""
      switch (detectedEmotion) {
        case "sad":
          response = "I'm sorry to hear you're feeling down. Remember that it's okay to feel sad sometimes. Would you like to talk about what's troubling you, or perhaps try a brief mindfulness exercise together?"
          break
        case "anxious":
          response = "I understand anxiety can be challenging. Let's take a deep breath together. Inhale slowly for 4 counts, hold for 2, and exhale for 6. Would you like to explore some anxiety management techniques?"
          break
        case "happy":
          response = "It's wonderful to hear you're feeling good! Positive emotions are worth celebrating. What's contributed to your good mood today?"
          break
        case "angry":
          response = "I can see you're feeling frustrated. Anger is a natural emotion and can sometimes signal our boundaries have been crossed. Would it help to talk about what triggered these feelings?"
          break
        default:
          response = "Thank you for sharing. I'm here to listen and support you. Is there anything specific you'd like to discuss or work through today?"
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        emotion: detectedEmotion,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsThinking(false)
    }, 2000)
  }

  const toggleListening = () => {
    // In a real app, we would implement speech recognition here
    setIsListening(!isListening)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-serenity-gray-light/30 rounded-lg shadow-sm overflow-hidden border">
      {/* Chat header */}
      <div className="flex items-center gap-2 p-4 border-b bg-white">
        <div className="flex items-center justify-center p-1.5 rounded-full bg-serenity-blue-light">
          <Brain className="h-5 w-5 text-serenity-blue-dark" />
        </div>
        <div>
          <h3 className="font-semibold">Serenity AI Therapist</h3>
          <p className="text-xs text-muted-foreground">Online • Available 24/7</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex max-w-[75%] mb-4",
                message.sender === "user" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl p-4",
                  message.sender === "user"
                    ? "bg-serenity-blue text-white rounded-br-none"
                    : "bg-white shadow-sm border rounded-bl-none"
                )}
              >
                <p className="text-sm">{message.content}</p>
                {message.emotion && message.sender === "bot" && (
                  <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
                    <Smile className="h-4 w-4 mr-1 text-serenity-blue" />
                    <span className="text-xs text-muted-foreground capitalize">
                      Detected mood: {message.emotion}
                    </span>
                  </div>
                )}
                <span className="block mt-1 text-xs text-right opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Bot is thinking indicator */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex max-w-[75%] mr-auto"
          >
            <div className="bg-white rounded-2xl p-4 rounded-bl-none shadow-sm border">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-serenity-blue animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-serenity-blue animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-serenity-blue animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t bg-white p-4">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[60px] flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              size="icon"
              variant={isListening ? "destructive" : "outline"}
              onClick={toggleListening}
              className="rounded-full"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="rounded-full"
              disabled={input.trim() === ""}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
