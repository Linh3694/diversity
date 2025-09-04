import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface IntroductionSectionProps {
  className?: string
  heightClassName?: string
}

export function IntroductionSection({ className, heightClassName }: IntroductionSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    { src: "/Introduction-image.webp", alt: "Students" },
    { src: "/Introduction-image-1.webp", alt: "Students 1" },
    { src: "/Introduction-image-2.webp", alt: "Students 2" },
    { src: "/Introduction-image-3.webp", alt: "Students 3" }
  ]
  
  // Tự động chuyển ảnh sau 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [images.length])
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center",
        heightClassName,
        className,
      )}
      style={{
        backgroundImage: 'url(/Introduction-section.webp)',
        // clamp(min, preferred, max) với preferred ≈ 65.1vw theo tỉ lệ 1250/1920
        height: heightClassName ? undefined : 'clamp(1262px, 65.1vw, 1250px)'
      }}
      aria-label="Introduction section"
    >
      <div className="absolute inset-0" />

      {/* Content overlay */}
      <div className="relative mx-auto max-w-[1400px] h-full px-6 sm:px-8 md:px-36 flex flex-col">
        <div className="grid grid-cols-1 items-center gap-6 lg:gap-8 lg:grid-cols-12 flex-1">
          {/* Mobile: Ảnh ở trên cùng, Desktop: Ảnh bên phải */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 self-center order-1 lg:order-2">
            <div className="relative mx-auto w-fit">
              <div className="relative inline-block w-fit">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="block h-[250px] w-[220px] sm:h-[350px] sm:w-[300px] md:h-[450px] md:w-[400px] rounded object-cover bg-white p-4 sm:p-6 md:p-8 shadow-xl ring-1 ring-black/5 rotate-3 transition-all duration-500"
                />
                {/* Prev/Next arrows (inside the white frame) */}
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={prevImage}
                  className="absolute -left-10 sm:-left-8 md:-left-12 top-1/2 -translate-y-1/2 z-10 h-6 w-6 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-[#F05023] text-white shadow-lg grid place-items-center hover:bg-[#e14a1f]"
                >
                  <img src="/arrow-left.svg" alt="Previous" className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={nextImage}
                  className="absolute -right-10 sm:-right-8 md:-right-12 top-1/2 -translate-y-1/2 z-10 h-6 w-6 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-[#F05023] text-white shadow-lg grid place-items-center hover:bg-[#e14a1f]"
                >
                  <img src="/arrow-right.svg" alt="Next" className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
              </div>
              {/* Decorative icon overlapping bottom-right of the photo */}
              <img
                src="/intro-icon-photo.svg"
                alt="Decorative"
                className="pointer-events-none absolute -bottom-6 sm:-bottom-8 md:-bottom-12 -right-16 sm:-right-24 md:-right-32 w-28 sm:w-32 md:w-32 lg:w-32 h-auto drop-shadow-md transform scale-[1.5] sm:scale-[2] md:scale-[2.5] origin-bottom-right"
              />
            </div>
          </div>

          {/* Mobile: Text content ở dưới ảnh, Desktop: Text bên trái */}
          <div className="lg:col-span-7 lg:mr-16 order-2 lg:order-1">
            {/* H2 ẩn trên mobile */}
            <div className="flex items-center mb-12">
              <img
                src="/star.png"
                alt="Star icon"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-20 lg:h-20 mr-3"
              />
              <h2 className="font-daruma text-2xl sm:text-3xl md:text-4xl text-[#FF5A3C]">
                Khi khác biệt tạo nên gắn kết
              </h2>
            </div>
            
            <div className="space-y-3 lg:space-y-10 text-black lg:text-justify text-center text-[12px] sm:text-sm lg:text-lg leading-6 sm:leading-7 lg:leading-8">
              <p>
                Mỗi WISer như một vì sao mang sắc màu riêng: có  ngôi sao rực rỡ như bình minh, ngôi sao trầm ấm như đêm thu, ngôi sao lấp lánh bởi nét duyên ngầm khó quên. Diversity Days là khoảnh khắc những vì sao ấy cùng hiện diện, cùng tỏa sáng, tạo nên một bầu trời chung rực rỡ, ấm áp và đầy sức sống.              </p>

              <p className="font-daruma text-[#FF5A3C] text-2xl lg:leading-10 text-center lg:text-left">
                "Mỗi WISer là một vì sao với sắc màu và ánh sáng riêng. Diversity Days là khi những vì sao ấy cùng hội tụ, tỏa sáng thành một dải ngân hà rực rỡ – nơi tinh thần Well-being lan tỏa từ cá nhân đến cộng đồng."</p>
            </div>   
          </div>
        </div>

        {/* Feature points - Mobile: 1 point 1 hàng, Desktop: 3 cột */}
        <div className="grid grid-cols-1 gap-4 lg:gap-x-6 lg:gap-y-4 lg:grid-cols-3 mb-12 lg:mb-16 mx-auto lg:mx-0">
          {/* Point 1 */}
          <div className="flex text-base lg:text-lg items-start gap-3 lg:col-start-1 lg:row-start-1 mb-3 lg:mb-6">
            <img src="/intro-icon-1.svg" alt="Icon 1" className="lg:mr-2 h-8 w-8 lg:h-20 lg:w-20 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs lg:text-base text-[#00687F]">Diversity Days - WISer được "Being Me" trọn vẹn</p>
              <p className="text-muted-foreground text-xs lg:text-base">Diễn ra vào mỗi thứ Sáu và những ngày đặc biệt</p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex text-base lg:text-lg items-start gap-3 lg:col-start-2 lg:row-start-1 mb-3 lg:mb-6">
            <img src="/intro-icon-2.svg" alt="Icon 2" className="lg:mr-2 h-8 w-8 lg:h-20 lg:w-20 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs lg:text-base text-[#EF5023]">Tôn vinh sự đa dạng</p>
              <p className="text-muted-foreground text-xs lg:text-base">Tự do sáng tạo trang phục theo chủ đề</p>
            </div>
          </div>

          {/* Placeholder để khuyết cột 3 hàng 1 */}
          <div className="hidden lg:block lg:col-start-3 lg:row-start-1" />

          {/* Point 3 */}
          <div className="flex text-base lg:text-lg items-start gap-3 lg:col-start-1 lg:row-start-2 mb-3 lg:mb-6">
            <img src="/intro-icon-3.svg" alt="Icon 3" className="lg:mr-2 h-8 w-8 lg:h-20 lg:w-20 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs lg:text-base text-[#002855]">Tạo kỷ niệm đáng nhớ</p>
              <p className="text-muted-foreground text-xs lg:text-base">Tham gia chuỗi thử thách "độc đáo"</p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="flex text-base lg:text-lg items-start gap-3 lg:col-start-2 lg:row-start-2 mb-3 lg:mb-6">
            <img src="/intro-icon-4.svg" alt="Icon 4" className="lg:mr-2 h-8 w-8 lg:h-20 lg:w-20 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs lg:text-base text-[#F3A71D]">Kết nối cộng đồng</p>
              <p className="text-muted-foreground text-xs lg:text-base">Niềm vui cùng bạn học, Thầy Cô</p>
            </div>
          </div>

          {/* Point 5 */}
          <div className="flex text-base lg:text-lg items-start gap-3 lg:col-start-3 lg:row-start-2 mb-3 lg:mb-6">
            <img src="/intro-icon-5.svg" alt="Icon 5" className="lg:mr-2 h-8 w-8 lg:h-20 lg:w-20 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs lg:text-base text-[#BFD330]">WISers thấu cảm những điều khác biệt</p>
              <p className="text-muted-foreground text-xs lg:text-base">Yêu thương và tôn trọng nhau</p>
            </div>
          </div>
        </div>
        

        {/* Bottom highlighted quote line */}
        <div className="text-center text-base sm:text-xl lg:text-2xl font-semibold font-daruma text-[#F05023] px-4 mb-6 lg:mb-8">
          "Mỗi WISer là một vì sao với sắc màu và ánh sáng riêng. Diversity Days là khi những vì sao ấy cùng hội tụ, toả sáng thành một dải ngân hà rực rỡ."
        </div>
      </div>
    </section>
  )
}


