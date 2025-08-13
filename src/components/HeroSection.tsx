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
        // Chiều cao mặc định theo từng breakpoint
        heightClassName ?? "h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px] xl:h-[800px]",
        className,
      )}
      style={{ backgroundImage: 'url(/Herosection-background.webp)' }}
      aria-label="Hero section"
    >
      {/* Overlay tùy chọn nếu cần nội dung nổi bên trên */}
      <div className="absolute inset-0" />

      {/* Explore button overlay, center horizontally, 40px from bottom */}
      <button
        type="button"
        onClick={onExploreClick}
        className="absolute left-1/2 bottom-16 -translate-x-1/2 cursor-pointer focus:outline-none"
        aria-label="Explore"
      >
        <img
          src="/explore.svg"
          alt="Explore"
          className="w-[260px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-auto select-none"
          draggable={false}
        />
      </button>
    </section>
  )
}


