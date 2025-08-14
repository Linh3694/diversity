import { cn } from "@/lib/utils"

interface HeroSectionProps {
  className?: string
  heightClassName?: string
  onExploreClick?: () => void
}

// Hiển thị ảnh nền full chiều ngang màn hình, responsive theo viewport height
export function HeroSection({ className, heightClassName, onExploreClick }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center",
        // Chiều cao responsive: mobile cao hơn desktop do màn hình dọc
        heightClassName ?? "h-[700px] sm:h-[450px] md:h-[520px] lg:h-[620px] xl:h-[800px]",
        className,
      )}
      aria-label="Hero section"
    >
      {/* Background images - responsive */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/Herosection-background.webp)' }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/Herosection-background-mobile.png)' }}
      />

      {/* Overlay tùy chọn nếu cần nội dung nổi bên trên */}
      <div className="absolute inset-0" />

      {/* Gradient sương mù từ dưới lên trên */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />

      {/* Explore button overlay, center horizontally, responsive positioning */}
      <button
        type="button"
        onClick={onExploreClick}
        className="absolute left-1/2 cursor-pointer focus:outline-none group bottom-8 sm:bottom-12 md:bottom-16 -translate-x-1/2"
        aria-label="Explore"
      >
        <img
          src="/explore.svg"
          alt="Explore"
          className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[360px] xl:w-[400px] h-auto select-none transition-transform duration-300 group-hover:scale-105"
          style={{
            animation: 'slowBounce 2.5s ease-in-out infinite'
          }}
          draggable={false}
        />
      </button>
    </section>
  )
}


