
import { ArrowRight, Brain, Clock, Heart, Shield, Smile } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-serenity-blue-light/30 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Your AI-Powered Mental Health Companion
            </h1>
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              Serenity is a supportive AI chatbot that listens, understands, and helps you 
              navigate through difficult emotions with evidence-based techniques.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/chat">
                  Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/assessment">Take Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Tools designed to support your mental wellbeing journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-serenity-blue" />}
              title="AI Therapy Conversations"
              description="Have meaningful conversations with our AI therapist using advanced natural language processing and emotional intelligence."
            />
            <FeatureCard 
              icon={<Smile className="h-10 w-10 text-serenity-green" />}
              title="Emotion Detection"
              description="Our AI recognizes your emotional state to provide more personalized and empathetic responses."
            />
            <FeatureCard 
              icon={<Heart className="h-10 w-10 text-serenity-peach" />}
              title="Wellbeing Assessment"
              description="Take the validated MHQoL-7D assessment to track your mental health quality of life over time."
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-serenity-blue" />}
              title="Available 24/7"
              description="Get support whenever you need it, day or night, without appointments or waiting lists."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-serenity-green-dark" />}
              title="Privacy Focused"
              description="Your conversations are private and secure. We prioritize your data protection and confidentiality."
            />
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-serenity-peach-dark" />}
              title="Evidence-Based Techniques"
              description="Access therapeutic techniques backed by psychological research, including CBT and mindfulness practices."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-background to-serenity-blue-light/30 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Begin your path to better mental wellbeing with Serenity's supportive AI companion.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/chat">
                Chat Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="mb-4 rounded-full bg-serenity-gray-light p-3">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
