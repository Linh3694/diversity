import { cn } from "@/lib/utils"

interface MessageSectionProps {
  className?: string
  heightClassName?: string
}

export function MessageSection({ className, heightClassName }: MessageSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center overflow-hidden",
        className,
      )}
      style={{
        backgroundImage: 'url(/message-section.png)',
        height: heightClassName ? undefined : 'clamp(420px, 51.1vw, 980px)'
      }}
      aria-label="Message section"
    >
      <div className="absolute inset-0" />
    </section>
  )
}

export default MessageSection


