
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronsRight, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "./ui/card"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

// MHQoL-7D questions
const questions = [
  {
    id: "q1",
    title: "Mood",
    question: "Over the last 7 days, how would you rate your mood?",
    description: "This includes feeling sad, anxious, or depressed vs. feeling happy, calm, or content.",
    options: [
      { value: "1", label: "Very poor" },
      { value: "2", label: "Poor" },
      { value: "3", label: "Fair" },
      { value: "4", label: "Good" },
      { value: "5", label: "Very good" }
    ]
  },
  {
    id: "q2",
    title: "Relationships",
    question: "Over the last 7 days, how satisfied have you been with your personal relationships?",
    description: "This includes relationships with family, friends, and romantic partners.",
    options: [
      { value: "1", label: "Very unsatisfied" },
      { value: "2", label: "Unsatisfied" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Satisfied" },
      { value: "5", label: "Very satisfied" }
    ]
  },
  {
    id: "q3",
    title: "Energy",
    question: "Over the last 7 days, how would you rate your energy levels?",
    description: "This includes feeling tired, fatigued, or exhausted vs. feeling energetic and motivated.",
    options: [
      { value: "1", label: "Very low" },
      { value: "2", label: "Low" },
      { value: "3", label: "Moderate" },
      { value: "4", label: "High" },
      { value: "5", label: "Very high" }
    ]
  },
  {
    id: "q4",
    title: "Sleep",
    question: "Over the last 7 days, how would you rate your sleep quality?",
    description: "This includes falling asleep, staying asleep, and feeling rested upon waking.",
    options: [
      { value: "1", label: "Very poor" },
      { value: "2", label: "Poor" },
      { value: "3", label: "Fair" },
      { value: "4", label: "Good" },
      { value: "5", label: "Very good" }
    ]
  },
  {
    id: "q5",
    title: "Stress",
    question: "Over the last 7 days, how well have you been able to manage stress?",
    description: "This includes coping with daily stressors, work pressures, or unexpected challenges.",
    options: [
      { value: "1", label: "Not at all" },
      { value: "2", label: "A little" },
      { value: "3", label: "Moderately" },
      { value: "4", label: "Quite well" },
      { value: "5", label: "Extremely well" }
    ]
  },
  {
    id: "q6",
    title: "Self-worth",
    question: "Over the last 7 days, how would you rate your sense of self-worth?",
    description: "This includes feelings about yourself, your abilities, and your value as a person.",
    options: [
      { value: "1", label: "Very low" },
      { value: "2", label: "Low" },
      { value: "3", label: "Moderate" },
      { value: "4", label: "High" },
      { value: "5", label: "Very high" }
    ]
  },
  {
    id: "q7",
    title: "Overall Satisfaction",
    question: "Over the last 7 days, how satisfied have you been with your life as a whole?",
    description: "This represents your overall sense of wellbeing and satisfaction with your current situation.",
    options: [
      { value: "1", label: "Very unsatisfied" },
      { value: "2", label: "Unsatisfied" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Satisfied" },
      { value: "5", label: "Very satisfied" }
    ]
  }
]

export function MHQoLForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    setSubmitting(true)
    
    // Calculate total score
    const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0)
    const percentageScore = Math.round((totalScore / (questions.length * 5)) * 100)
    
    // Simulate API submission
    setTimeout(() => {
      setScore(percentageScore)
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const isCompleted = Object.keys(answers).length === questions.length
  const hasCurrentAnswer = answers[currentQuestion?.id]

  if (submitted) {
    return (
      <div className="max-w-md mx-auto my-8">
        <Card className="border-serenity-blue/20 shadow-md">
          <CardHeader>
            <div className="mx-auto bg-serenity-blue/20 p-3 rounded-full mb-2">
              <Check className="h-6 w-6 text-serenity-blue" />
            </div>
            <CardTitle className="text-center">Assessment Complete</CardTitle>
            <CardDescription className="text-center">
              Thank you for completing the MHQoL-7D assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke="currentColor" 
                    strokeWidth="16" 
                    fill="none" 
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)}
                    className="text-serenity-blue"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <span className="absolute text-2xl font-bold">{score}%</span>
              </div>
              <p className="text-lg font-medium mt-4">Your Wellbeing Score</p>
            </div>
            
            <div className="bg-serenity-gray-light p-4 rounded-lg">
              <h4 className="font-medium mb-2">What this means:</h4>
              <p className="text-sm text-muted-foreground">
                {score >= 80 ? (
                  "Your responses indicate generally positive mental wellbeing. Keep practicing healthy habits."
                ) : score >= 60 ? (
                  "Your mental wellbeing appears moderate. Consider incorporating more self-care practices."
                ) : score >= 40 ? (
                  "Your responses suggest some challenges with mental wellbeing. Consider talking with a professional."
                ) : (
                  "Your responses indicate significant challenges with mental wellbeing. We strongly recommend professional support."
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="/chat">Chat with Serenity AI</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <Card className="border-serenity-blue/20 shadow-md">
        <CardHeader>
          <CardTitle>Mental Health Quality of Life Assessment</CardTitle>
          <CardDescription>
            Answer 7 questions to help us understand your current wellbeing
          </CardDescription>
          <div className="w-full bg-serenity-gray-light rounded-full h-2 mt-2">
            <div 
              className="bg-serenity-blue h-2 rounded-full transition-all" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% complete</span>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-medium mb-1">{currentQuestion.title}</h3>
              <p className="text-sm mb-2">{currentQuestion.question}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xs text-muted-foreground underline decoration-dotted cursor-help">
                      What does this mean?
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{currentQuestion.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <RadioGroup 
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleOptionSelect}
              className="space-y-2"
            >
              {currentQuestion.options.map((option) => (
                <div 
                  key={option.value}
                  className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-serenity-gray-light/50"
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                  <Label 
                    htmlFor={`${currentQuestion.id}-${option.value}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex-1">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                disabled={!hasCurrentAnswer || submitting}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Submit Assessment"
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!hasCurrentAnswer}
                className="w-full"
              >
                Next Question
                <ChevronsRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
