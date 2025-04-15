
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Frown, Meh, SmilePlus, Angry, Brain } from "lucide-react"

type Emotion = "happy" | "sad" | "neutral" | "anxious" | "angry" | null

interface EmotionDetectionProps {
  text?: string
  autoDetect?: boolean
}

export function EmotionDetection({ text = "", autoDetect = false }: EmotionDetectionProps) {
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion>(null)
  const [confidence, setConfidence] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)

  // Simulate emotion detection analysis
  useEffect(() => {
    if (!text || text.length < 5) return

    if (autoDetect) {
      setAnalyzing(true)
      
      // Simulate AI processing delay
      const timer = setTimeout(() => {
        detectEmotionMock(text)
        setAnalyzing(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [text, autoDetect])

  const detectEmotionMock = (text: string) => {
    // This is just a simple mock function based on keywords
    // In a real app, this would use a proper emotion detection model
    const textLower = text.toLowerCase()
    let emotion: Emotion = "neutral"
    let conf = 0.7
    
    if (textLower.match(/happy|joy|excited|great|good|love|wonderful|delighted/i)) {
      emotion = "happy"
      conf = 0.85
    } else if (textLower.match(/sad|upset|unhappy|depressed|down|cry|tears|miserable/i)) {
      emotion = "sad"
      conf = 0.82
    } else if (textLower.match(/anxious|worry|stress|nervous|fear|afraid|panic|tense/i)) {
      emotion = "anxious"
      conf = 0.78
    } else if (textLower.match(/angry|mad|furious|annoyed|irritated|frustrated|rage/i)) {
      emotion = "angry"
      conf = 0.88
    }
    
    setDetectedEmotion(emotion)
    setConfidence(conf)
  }

  const getEmotionIcon = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return <SmilePlus className="h-12 w-12 text-serenity-green" />
      case "sad":
        return <Frown className="h-12 w-12 text-serenity-blue" />
      case "anxious":
        return <Meh className="h-12 w-12 text-serenity-peach" />
      case "angry":
        return <Angry className="h-12 w-12 text-serenity-peach-dark" />
      case "neutral":
      default:
        return <Meh className="h-12 w-12 text-serenity-gray" />
    }
  }

  const getEmotionAdvice = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return "You seem to be in a positive mood. This is a great time to engage in activities you enjoy or connect with others to maintain this state."
      case "sad":
        return "I notice signs of sadness in your message. Consider reaching out to a friend, engaging in a calming activity, or practicing self-compassion."
      case "anxious":
        return "Your message suggests you might be feeling anxious. Deep breathing exercises or grounding techniques might help you feel more centered."
      case "angry":
        return "I detect frustration in your message. It might help to take a moment to pause before responding further, or try a brief physical activity to release tension."
      case "neutral":
      default:
        return "Your emotional state appears balanced. This is a good time for reflection or planning."
    }
  }
  
  const getConfidenceColor = (conf: number) => {
    if (conf > 0.8) return "bg-serenity-green"
    if (conf > 0.6) return "bg-serenity-blue"
    return "bg-serenity-gray"
  }

  return (
    <Card className="shadow-sm border-serenity-gray-light/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-serenity-blue" />
          Emotion Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex space-x-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
                className="w-3 h-3 rounded-full bg-serenity-blue"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2, repeatDelay: 0.2 }}
                className="w-3 h-3 rounded-full bg-serenity-green"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4, repeatDelay: 0.2 }}
                className="w-3 h-3 rounded-full bg-serenity-peach"
              />
            </div>
            <p className="text-sm text-muted-foreground">Analyzing emotional content...</p>
          </div>
        ) : detectedEmotion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={detectedEmotion}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-serenity-gray-light/50 rounded-full">
                  {getEmotionIcon(detectedEmotion)}
                </div>
                <div>
                  <h3 className="font-medium text-lg capitalize">{detectedEmotion}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full h-2 rounded-full bg-serenity-gray-light">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(confidence)}`} 
                        style={{ width: `${confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-serenity-gray-light/30 p-4 rounded-lg">
                <p className="text-sm">{getEmotionAdvice(detectedEmotion)}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 text-muted-foreground/40 mb-2" />
            <p className="text-sm">No text to analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
