import { cn } from "@/lib/utils"

interface IntroductionSectionProps {
  className?: string
  heightClassName?: string
  onPrevPhoto?: () => void
  onNextPhoto?: () => void
}

export function IntroductionSection({ className, heightClassName, onPrevPhoto, onNextPhoto }: IntroductionSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-cover bg-center",
        // Nếu truyền heightClassName thì dùng class đó; mặc định dùng clamp theo tỉ lệ ảnh
        heightClassName,
        className,
      )}
      style={{
        backgroundImage: 'url(/Introduction-section.webp)',
        // clamp(min, preferred, max) với preferred ≈ 65.1vw theo tỉ lệ 1250/1920
        height: heightClassName ? undefined : 'clamp(420px, 65.1vw, 1250px)'
      }}
      aria-label="Introduction section"
    >
      <div className="absolute inset-0" />

      {/* Content overlay */}
      <div className="relative mx-auto h-full w-full px-36 py-10 sm:py-10 flex flex-col">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 flex-1">
          <div className="lg:col-span-7 lg:mr-24">
            <h2 className="font-daruma text-3xl sm:text-4xl md:text-5xl text-[#FF5A3C] mb-12">
              Khi khác biệt tạo nên gắn kết
            </h2>
            <div className=" space-y-4 text-black text-justify text-xl leading-8">
              <p>
                Mỗi WISer như một vì sao mang sắc màu riêng: có  ngôi sao rực rỡ như bình minh, ngôi sao trầm ấm như đêm thu, ngôi sao lấp lánh bởi nét duyên ngầm khó quên. Diversity Days là khoảnh khắc những vì sao ấy cùng hiện diện, cùng tỏa sáng, tạo nên một bầu trời chung rực rỡ, ấm áp và đầy sức sống.
              </p>
              <p>
                Diễn ra vào mỗi thứ Sáu và những ngày đặc biệt trong năm, Diversity Days là ngày mỗi WISer được “Being Me” trọn vẹn – tự do lựa chọn trang phục theo chủ đề, thể hiện văn hóa, cá tính và sáng tạo của mình. Mỗi bộ trang phục là một câu chuyện: về nơi ta thuộc về, ước mơ ta theo đuổi, và chính con người thật của ta.
              </p>
              <p>
                Khi những sắc màu hòa quyện, điều kỳ diệu xảy ra: chúng không lấn át, mà tôn vinh nhau. Từ sự đa dạng nảy sinh thấu cảm; từ kết nối, hạnh phúc đâm chồi. Đó chính là tinh thần Happy WISers: Being Well-Being Me – khỏe mạnh, trọn vẹn, tỏa sáng cùng nhau trong một cộng đồng biết yêu thương và tôn trọng.
              </p>
            </div>   
          </div>
          {/* Right framed photo placeholder */}
          <div className="lg:col-span-5 hidden lg:block self-center">
            <div className="relative mx-auto w-fit">
              <div className="relative inline-block w-fit rotate-1 rounded bg-white p-10 shadow-xl ring-1 ring-black/5">
                <img
                  src="/Herosection-background.webp"
                  alt="Students"
                  className="block h-[529px] w-[463px] rounded object-cover"
                />
                {/* Prev/Next arrows (inside the white frame) */}
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={onPrevPhoto}
                  className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#F05023] text-white shadow-lg grid place-items-center hover:bg-[#e14a1f]"
                >
                  <span className="text-4xl md:text-5xl">‹</span>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={onNextPhoto}
                  className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#F05023] text-white shadow-lg grid place-items-center hover:bg-[#e14a1f]"
                >
                  <span className="text-4xl md:text-5xl">›</span>
                </button>
              </div>
              {/* Decorative icon overlapping bottom-right of the photo */}
              <img
                src="/intro-icon-photo.svg"
                alt="Decorative"
                className="pointer-events-none absolute -bottom-16 -right-44 w-24 sm:w-28 md:w-32 h-auto drop-shadow-md transform scale-[3] origin-bottom-right"
              />
            </div>
          </div>
        </div>

        {/* Feature points (3 cột trên md): */}
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
              {/* Point 1 */}
              <div className="flex text-xl items-start gap-3 md:col-start-1 md:row-start-1 mb-16">
                <img src="/intro-icon-1.svg" alt="Icon 1" className="mt-1 mr-4 h-16 w-16" />
                <div>
                  <p className="font-semibold">Diversity Days - WISer được “Being Me” trọn vẹn</p>
                  <p className="text-muted-foreground">Diễn ra vào mỗi thứ Sáu và những ngày đặc biệt trong năm</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex text-xl items-start gap-3 md:col-start-2 md:row-start-1">
                <img src="/intro-icon-2.svg" alt="Icon 2" className="mt-1 mr-4 h-16 w-16" />
                <div>
                  <p className="font-semibold">Tôn vinh sự đa dạng</p>
                  <p className="text-muted-foreground">Tự do sáng tạo trang phục theo chủ đề</p>
                </div>
              </div>

              {/* Placeholder để khuyết cột 3 hàng 1 */}
              <div className="hidden md:block md:col-start-3 md:row-start-1" />

              {/* Point 3 */}
              <div className="flex text-xl items-start gap-3 md:col-start-1 md:row-start-2">
                <img src="/intro-icon-3.svg" alt="Icon 3" className="mt-1 mr-4 h-16 w-16" />
                <div>
                  <p className="font-semibold">Tạo kỷ niệm đáng nhớ</p>
                  <p className="text-muted-foreground">Tham gia chuỗi thử thách “độc đáo”</p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex text-xl items-start gap-3 md:col-start-2 md:row-start-2">
                <img src="/intro-icon-4.svg" alt="Icon 4" className="mt-1 mr-4 h-16 w-16" />
                <div>
                  <p className="font-semibold">Kết nối cộng đồng</p>
                  <p className="text-muted-foreground">Niềm vui cùng bạn học, Thầy Cô</p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="flex text-xl items-start gap-3 md:col-start-3 md:row-start-2">
                <img src="/intro-icon-5.svg" alt="Icon 5" className="mt-1 mr-4 h-16 w-16" />
                <div>
                  <p className="font-semibold">WISers thấu cảm những điều khác biệt</p>
                  <p className="text-muted-foreground">Yêu thương và tôn trọng nhau</p>
                </div>
              </div>
            </div>
            

        {/* Bottom highlighted quote line (optional) */}
        <div className="mt-16 text-center text-3xl font-semibold font-daruma text-[#F05023]">
          “Mỗi WISer là một vì sao với sắc màu và ánh sáng riêng. Diversity Days là khi những vì sao ấy cùng hội tụ, toả sáng thành một dải ngân hà rực rỡ - nơi tinh thần Well-being lan toả từ cá nhân đến cộng đồng.”
        </div>
      </div>
    </section>
  )
}


