import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"

interface MessageSectionProps {
  className?: string
  heightClassName?: string
}

export function MessageSection({ className, heightClassName }: MessageSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const images = [
    { 
      src: "/message-image-01.png", 
      mobileSrc: "/message-image-01-mobile.png",
      alt: "Message image 1" 
    },
    { 
      src: "/message-image-02.png", 
      mobileSrc: "/message-image-02-mobile.png",
      alt: "Message image 2" 
    }
  ]
  
  // Tự động chuyển ảnh sau 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [images.length])
  
  // Xử lý drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setDragOffset(0)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const currentX = e.clientX
    const diff = currentX - startX
    setDragOffset(diff)
  }
  
  const handleMouseUp = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Nếu kéo đủ xa thì chuyển ảnh
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        // Kéo sang phải -> ảnh trước
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      } else {
        // Kéo sang trái -> ảnh sau
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }
    }
    
    setDragOffset(0)
  }
  
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setDragOffset(0)
    }
  }
  

  
  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center overflow-hidden",
        className,
      )}
      style={{
        height: heightClassName ? undefined : 'clamp(420px, 51.1vw, 780px)'
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
      <div className="relative z-10 h-full flex flex-col items-center px-6 pt-12">
        {/* Tiêu đề */}
        <h2 className="font-daruma text-2xl sm:text-3xl md:text-4xl text-[#EF5023] text-center mb-12 md:mb-20">
          Những lời nhắn từ WISers
        </h2>
        
        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-[800px] md:max-w-[1100px] max-h-[300px] md:max-h-[430px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ảnh hiện tại */}
          <div 
            className="flex justify-center transition-transform duration-300"
            style={{
              transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)'
            }}
          >
            {/* Desktop image */}
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="hidden md:block object-cover transition-all duration-300"
              draggable={false}
            />
            {/* Mobile image */}
            <img
              src={images[currentImageIndex].mobileSrc}
              alt={images[currentImageIndex].alt}
              className="block md:hidden object-cover transition-all duration-300 max-w-[80%] h-auto"
              draggable={false}
            />
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "lg:w-3 lg:h-3 w-2 h-2 rounded-full transition-all",
                  index === currentImageIndex 
                    ? "bg-[#EF5023] scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection


