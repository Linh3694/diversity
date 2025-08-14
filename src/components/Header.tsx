import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Language = "en" | "vi"

interface HeaderProps {
  language: Language
  onToggleLanguage: (lang: Language) => void
  className?: string
}

export function Header({ language, onToggleLanguage, className }: HeaderProps) {
  const nextLang: Language = language === "en" ? "vi" : "en"

  return (
    <header
      className={cn(
        "w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75",
        className,
      )}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Left logos */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <img
            src="/wellspring-logo.svg"
            alt="Wellspring Logo"
            className="h-12 w-auto md:h-16"
          />
          <img
            src="/happyjourney-logo.svg"
            alt="Happy Journey Logo"
            className="h-10 w-auto sm:h-12 md:h-16"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <img 
            src="/WASC.svg" 
            alt="WASC Logo" 
            className="h-8 w-auto sm:h-12 " 
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0"
            onClick={() => onToggleLanguage(nextLang)}
            aria-label={`Switch language to ${nextLang.toUpperCase()}`}
          >
            <img
              src={language === "en" ? "/flag-en.png" : "/flag-vi.png"}
              alt={language === "en" ? "English" : "Vietnamese"}
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
            />
          </Button>
        </div>
      </div>
    </header>
  )
}


