
import { BrainCircuit, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-serenity-blue" />
          <span className="text-sm font-medium">Serenity</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          Made with <Heart className="inline-block h-4 w-4 text-serenity-peach" /> 
          for better mental health
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} Serenity AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
