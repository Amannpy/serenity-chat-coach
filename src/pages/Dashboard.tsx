
import { Dashboard as DashboardComponent } from "@/components/Dashboard"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <DashboardComponent />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
