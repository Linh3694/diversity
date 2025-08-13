import { cn } from "@/lib/utils"
import { useCallback, useEffect, useMemo, useState } from "react"

interface MomentSectionProps {
  className?: string
  heightClassName?: string
}

const SLIDES = [
  "/moment-01.png",
  "/moment-02.png",
  "/moment-03.png",
] as const

export function MomentSection({ className, heightClassName }: MomentSectionProps) {
  const [index, setIndex] = useState<number>(0)
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null)
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false)

  const total = SLIDES.length
  const currentSrc = useMemo(() => SLIDES[index % total], [index, total])

  const goTo = useCallback((to: number) => {
    if (overlayIndex !== null) return
    setOverlayIndex(((to % total) + total) % total)
    setOverlayVisible(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true))
    })
  }, [overlayIndex, total])

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
        "relative w-full bg-cover bg-center overflow-hidden mt-20",
        className,
      )}
      style={{
        backgroundImage: 'url(/moment-section.png)',
        height: heightClassName ? undefined : 'clamp(420px, 51.1vw, 980px)'
      }}
      aria-label="Moment section"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-10">
        <h2 className="text-center font-daruma text-3xl sm:text-4xl md:text-5xl text-[#0F2A44]">
          Những khoảnh khắc đáng nhớ
        </h2>
      </div>

      {/* Carousel frame */}
      <div className="relative z-10 mx-auto mt-6 w-full max-w-[1440px] px-10">
        <div className="relative mx-auto w-full rounded-[28px]">
          {/* Slide */}
          <div className="relative grid place-items-center px-6 py-8 md:px-10 md:py-10 overflow-hidden">
            {/* Base image */}
            <img
              src={currentSrc}
              alt="Moment"
              className="block w-full max-w-[1100px] h-auto select-none rounded"
              draggable={false}
            />
            {/* Overlay image for fade transition */}
            {overlayIndex !== null && (
              <img
                src={SLIDES[overlayIndex]}
                alt="Moment next"
                className={cn(
                  "pointer-events-none absolute inset-0 m-auto w-full max-w-[1100px] h-auto rounded select-none transition-opacity duration-500",
                  overlayVisible ? "opacity-100" : "opacity-0",
                )}
                onTransitionEnd={() => {
                  if (overlayIndex !== null && overlayVisible) {
                    setIndex(overlayIndex)
                    setOverlayIndex(null)
                    setOverlayVisible(false)
                  }
                }}
                draggable={false}
              />
            )}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Trước"
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 h-[50px] w-[50px] grid place-items-center"
          >
            <img src="/arrow-left.svg" alt="Prev" className="h-[50px] w-[50px]" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Sau"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 h-[50px] w-[50px] grid place-items-center"
          >
            <img src="/arrow-right.svg" alt="Next" className="h-[50px] w-[50px]" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default MomentSection


