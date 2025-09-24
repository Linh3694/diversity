import { cn } from "@/lib/utils"
import { useCallback, useEffect, useMemo, useState } from "react"

interface MomentSectionProps {
  className?: string
  heightClassName?: string
}

const SLIDES = [
  "/moment-01.webp",
  "/moment-02.webp",
  "/moment-03.webp",
] as const

const MOBILE_SLIDES = [
  "/moment-01-mobile.webp",
  "/moment-02-mobile.webp",
  "/moment-03-mobile.webp",
] as const

export function MomentSection({ className, heightClassName }: MomentSectionProps) {
  const [index, setIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const total = SLIDES.length
  const currentSrc = useMemo(() => {
    if (isMobile) {
      return MOBILE_SLIDES[index % total]
    }
    return SLIDES[index % total]
  }, [index, total, isMobile])

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goTo = useCallback((to: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    const newIndex = ((to % total) + total) % total
    setIndex(newIndex)
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning, total])

  const prev = useCallback(() => {
    goTo(index - 1)
  }, [goTo, index])

  const next = useCallback(() => {
    goTo(index + 1)
  }, [goTo, index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next])

  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center overflow-hidden lg:min-h-screen",
        className,
      )}
      style={{
        backgroundImage: isMobile ? 'url(/moment-section-mobile.png)' : 'url(/moment-section.png)',
        height: heightClassName ? undefined : isMobile ? '700px' : 'clamp(600px, 51.1vw, 980px)'
      }}
      aria-label="Moment section"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-10">
        <h2 className="text-center font-daruma text-2xl sm:text-3xl md:text-4xl text-[#008399]">
          Những khoảnh khắc đáng nhớ
        </h2>
      </div>

      {/* Carousel frame */}
      <div className="relative z-10 mx-auto mt-6 w-full max-w-[1100px] px-10">
        <div className="relative mx-auto max-w-[1100px] rounded-[28px]">
          {/* Slide */}
          <div className="relative grid place-items-center px-6 py-8 md:px-10 md:py-10 overflow-hidden">
            <img
              key={currentSrc} // Force re-render when src changes
              src={currentSrc}
              alt="Moment"
              className={cn(
                "block w-full h-auto select-none rounded transition-opacity duration-200",
                isTransitioning ? "opacity-70" : "opacity-100"
              )}
              draggable={false}
            />
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Trước"
            className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-20 h-[50px] w-[50px] grid place-items-center"
          >
            <img src="/arrow-left.svg" alt="Prev" className="h-[30px] w-[30px]" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Sau"
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-20 h-[50px] w-[50px] grid place-items-center"
          >
            <img src="/arrow-right.svg" alt="Next" className="h-[30px] w-[30px]" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default MomentSection


