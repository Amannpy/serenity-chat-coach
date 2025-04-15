
import { MHQoLForm } from "@/components/MHQoLForm"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 container">
        <h1 className="text-3xl font-bold text-center mb-2">Mental Health Assessment</h1>
        <p className="text-center text-muted-foreground mb-6 max-w-lg mx-auto">
          Complete this scientifically validated questionnaire to help us understand your 
          current mental wellbeing and provide better support.
        </p>
        <MHQoLForm />
      </main>
      <Footer />
    </div>
  )
}

export default Assessment
