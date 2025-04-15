
import { BrainCircuit, Menu } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

export function Header() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-serenity-blue" />
          <span className="text-xl font-semibold tracking-tight">Serenity</span>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/chat" className="text-lg font-medium">Chat</Link>
                <Link to="/assessment" className="text-lg font-medium">Assessment</Link>
                <Link to="/dashboard" className="text-lg font-medium">Dashboard</Link>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/chat" className="text-sm font-medium hover:text-primary transition-colors">Chat</Link>
            <Link to="/assessment" className="text-sm font-medium hover:text-primary transition-colors">Assessment</Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
