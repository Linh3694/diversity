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
        height: heightClassName ? undefined : 'clamp(700px, 51.1vw, 800px)'
      }}
      aria-label="Message section"
    >
      {/* Background images - responsive */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/message-section.png)' }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/message-section-mobile.png)' }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center px-6 mt-40">
        {/* Single image */}
        <div className="relative max-w-[700px] md:max-w-[1100px] max-h-[200px] md:max-h-[430px]">
          {/* Desktop image */}
          <img
            src="/message-image.png"
            alt="Message image"
            className="hidden md:block w-full h-auto object-cover"
            draggable={false}
          />
          {/* Mobile image */}
          <img
            src="/message-image-mobile.png"
            alt="Message image"
            className="block md:hidden w-full h-auto object-cover"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}

export default MessageSection


