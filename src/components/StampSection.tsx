import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BandKey = "1" | "2" | "3"

const THEMES: Record<BandKey, {
  label: string
  strokeStart: string
  strokeEnd: string
  textColor: string
  logoSrc: string
  gradientStops?: { offset: number; color: string }[]
}> = {
  // Ghi chú: màu/gradient và logo sẽ được cập nhật sau theo guideline chính thức
  "1": {
    label: "Mốc 1",
    strokeStart: "#F05023",
    strokeEnd: "#1F3A93",
    textColor: "#1F3A93",
    logoSrc: "/stamp/logo-1.png",
    // Gradient mốc 1: trái → phải theo thông số cung cấp
    gradientStops: [
      { offset: 0, color: "#220600" },
      { offset: 37, color: "#AA7D5A" },
      { offset: 47, color: "#FAC2A7" },
      { offset: 58, color: "#FAC2A7" },
      { offset: 70, color: "#B17B60" },
      { offset: 79, color: "#75492E" },
      { offset: 100, color: "#3C1401" },
    ],
  },
  "2": {
    label: "Mốc 2",
    strokeStart: "#24C6DC",
    strokeEnd: "#514A9D",
    textColor: "#2D3A8C",
    logoSrc: "/stamp/logo-2.png",
    gradientStops: [
      { offset: 0, color: "#CBD1D6" },
      { offset: 9, color: "#C7CDD2" },
      { offset: 17, color: "#BCC2C7" },
      { offset: 25, color: "#AAB1B5" },
      { offset: 29, color: "#CAD1D4" },
      { offset: 33, color: "#E1E8EB" },
      { offset: 37, color: "#EFF6F9" },
      { offset: 40, color: "#F4FBFE" },
      { offset: 55, color: "#B0B7BC" },
      { offset: 58, color: "#A9B0B4" },
      { offset: 68, color: "#9BA1A6" },
      { offset: 100, color: "#9BA1A6" },
    ],
  },
  "3": {
    label: "Mốc 3",
    strokeStart: "#FF5A3C",
    strokeEnd: "#FFD166",
    textColor: "#0F172A",
    logoSrc: "/stamp/logo-3.png",
    gradientStops: [
      { offset: 0, color: "#F7D864" },
      { offset: 21, color: "#C69119" },
      { offset: 46, color: "#D5A731" },
      { offset: 54, color: "#E5BE49" },
      { offset: 63, color: "#F0CE59" },
      { offset: 72, color: "#F6D763" },
      { offset: 84, color: "#F9DB67" },
      { offset: 100, color: "#EDCA56" },
    ],
  },
}

const ICON_COUNT = 8 as const

interface StampSectionProps {
  className?: string
}

export function StampSection({ className }: StampSectionProps) {
  const [name, setName] = useState<string>("WELLSPRING HÀ NỘI")
  const [year, setYear] = useState<string>("2009")
  const [iconIndex, setIconIndex] = useState<number>(1)
  const [fontLoaded, setFontLoaded] = useState<boolean>(false)

  // Safari font loading fix
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isSafari && !fontLoaded) {
      console.log('Safari detected, forcing font reload...')

      // Try FontFace API first (modern browsers)
      if ('fonts' in document) {
        const font = new FontFace('DFVN Darumadrop One', 'url(/fonts/DFVNDarumadropOne/DFVN-DarumadropOne.woff2) format("woff2")')
        font.load().then(() => {
          document.fonts.add(font)
          console.log('Font loaded via FontFace API')
          setFontLoaded(true)
        }).catch((error) => {
          console.warn('FontFace API failed:', error)
          // Fallback to CSS injection
          forceFontReload()
        })
      } else {
        // Fallback for older Safari versions
        forceFontReload()
      }

      // Fallback timeout - force render anyway after 1 second
      const fallbackTimer = setTimeout(() => {
        if (!fontLoaded) {
          console.log('Fallback timeout reached, forcing render')
          setFontLoaded(true)
        }
      }, 1000)

      return () => clearTimeout(fallbackTimer)
    }

    function forceFontReload() {
      console.log('Using CSS injection fallback for font loading')

      // Force font reload by creating a temporary style
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: 'DFVN Darumadrop One Force';
          src: url('/fonts/DFVNDarumadropOne/DFVN-DarumadropOne.woff2') format('woff2'),
               url('/fonts/DFVNDarumadropOne/DFVN-DarumadropOne.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }
        .font-daruma { font-family: 'DFVN Darumadrop One Force', 'Mulish', sans-serif !important; }
      `
      document.head.appendChild(style)

      // Force re-render after font should be loaded
      setTimeout(() => {
        console.log('CSS injection font loading completed')
        setFontLoaded(true)
        // Keep the style to ensure font is available
      }, 200)
    }
  }, [fontLoaded])

  const band: BandKey = useMemo(() => {
    const y = parseInt(year || "0", 10)
    const now = new Date().getFullYear()
    const diff = Math.max(0, now - (isNaN(y) ? now : y))
    if (diff <= 3) return "1"
    if (diff <= 5) return "2"
    return "3"
  }, [year])

  const theme = THEMES[band]

  const svgDefs = useMemo(() => {
    const size = 584
    const cx = size / 2
    const cy = size / 2
    const outerR = 250
    const innerR = 200
    // Đẩy chữ dịch vào trong để tránh dính viền ngoài
    const textR = (outerR + innerR) / 2 - 12

    const circleD = `M ${cx},${cy} m -${textR},0 a ${textR},${textR} 0 1,1 ${
      textR * 2
    },0 a ${textR},${textR} 0 1,1 -${textR * 2},0`

    // Path đảo chiều để chữ ở nửa dưới vẫn đứng thẳng
    const circleDReverse = `M ${cx},${cy} m ${textR},0 a ${textR},${textR} 0 1,0 -${
      textR * 2
    },0 a ${textR},${textR} 0 1,0 ${textR * 2},0`

    // Đường tròn đảo chiều nhỏ hơn để dán chữ "SINCE" tránh dính viền ngoài
    const sinceR = textR + 20
    const circleDReverseSince = `M ${cx},${cy} m ${sinceR},0 a ${sinceR},${sinceR} 0 1,0 -${
      sinceR * 2
    },0 a ${sinceR},${sinceR} 0 1,0 ${sinceR * 2},0`

    // Tạo thông số đứt đoạn cho vòng trong – 2 khoảng hở đối diện nhau
    const innerCircumference = 2 * Math.PI * innerR
    const gapDegrees = 30 // độ rộng mỗi khoảng hở (theo độ)
    const gapLength = innerCircumference * (gapDegrees / 360)
    // Mẫu [segment, gap] lặp lại; để có đúng 2 gaps, tổng một chu kỳ = C/2
    const segmentLength = innerCircumference / 2 - gapLength
    const dashArrayTwoGaps = `${segmentLength} ${gapLength}`
    // Canh giữa khoảng hở thứ nhất ở góc chỉ định (gần chữ N)
    const breakAtDegrees = 290
    const desiredCenter = innerCircumference * (breakAtDegrees / 360)
    const firstGapCenterFromStart = segmentLength + gapLength / 2
    let dashOffset = desiredCenter - firstGapCenterFromStart
    dashOffset = ((dashOffset % innerCircumference) + innerCircumference) % innerCircumference

    return {
      size,
      cx,
      cy,
      outerR,
      innerR,
      textR,
      circleD,
      circleDReverse,
      circleDReverseSince,
      innerDashArray: dashArrayTwoGaps,
      innerDashOffset: dashOffset,
    }
  }, [])

  const svgRef = useRef<SVGSVGElement | null>(null)

  async function handleDownload() {
    if (!svgRef.current) return

    try {
      console.log("Starting download process...")

      // Clone SVG và inline tất cả ảnh vào data URI để tránh CORS/thiếu hình khi export
      const clone = svgRef.current.cloneNode(true) as SVGSVGElement
      const images = Array.from(clone.querySelectorAll("image"))

      console.log(`Processing ${images.length} images...`)

      // Xử lý từng hình ảnh với error handling và retry
      for (const img of images) {
        const href = img.getAttribute("href") || img.getAttributeNS("http://www.w3.org/1999/xlink", "href")
        if (!href || href.startsWith("data:")) continue

        try {
          console.log(`Fetching image: ${href}`)
          const resp = await fetch(href, {
            mode: 'cors',
            cache: 'default'
          })

          if (!resp.ok) {
            console.warn(`Failed to fetch ${href}: ${resp.status}`)
            continue
          }

          const blob = await resp.blob()
          const dataUrl: string = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error(`Failed to read ${href}`))
            reader.readAsDataURL(blob)
          })

          img.setAttribute("href", dataUrl)
          img.removeAttribute("xlink:href")
          console.log(`Successfully processed ${href}`)
        } catch (imageError) {
          console.error(`Error processing image ${href}:`, imageError)
          // Fallback: giữ nguyên href gốc nếu không thể inline
        }
      }

      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(clone)
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

      console.log("SVG serialized, creating image...")

      const img = new Image()
      img.onload = () => {
        console.log("Image loaded, creating canvas...")

        try {
          // Xuất độ phân giải cao hơn (3x + theo DPR)
          const baseScale = 3
          const scale = Math.max(2, Math.round((window.devicePixelRatio || 1) * baseScale))
          const canvas = document.createElement("canvas")
          canvas.width = svgDefs.size * scale
          canvas.height = svgDefs.size * scale
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            throw new Error("Could not get 2D context from canvas")
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Check if toBlob is supported
          if (typeof canvas.toBlob === 'function') {
            canvas.toBlob((blob) => {
              if (!blob) {
                console.error("Canvas toBlob returned null")
                fallbackDownload(dataUrl, scale)
                return
              }

              try {
                const link = document.createElement("a")
                const blobUrl = URL.createObjectURL(blob)
                link.href = blobUrl
                link.download = `stamp-${year}@${scale}x.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                // Clean up blob URL after download
                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)

                console.log("Download completed successfully")
              } catch (blobError) {
                console.error("Blob URL creation failed:", blobError)
                fallbackDownload(dataUrl, scale)
              }
            })
          } else {
            console.warn("Canvas.toBlob not supported, using fallback")
            fallbackDownload(dataUrl, scale)
          }
        } catch (canvasError) {
          console.error("Canvas processing failed:", canvasError)
          fallbackDownload(dataUrl, 2)
        }
      }

      img.onerror = () => {
        console.error("Failed to load SVG image")
        fallbackDownload(dataUrl, 2)
      }

      img.src = dataUrl
    } catch (error) {
      console.error("Failed to export PNG:", error)
      alert("Có lỗi xảy ra khi tải về. Vui lòng thử lại hoặc liên hệ hỗ trợ.")
    }
  }

  // Fallback download method using data URL directly
  function fallbackDownload(dataUrl: string, scale: number) {
    try {
      console.log("Using fallback download method")

      // Check if we're in a webview that might not support downloads
      const isWebView = /FBAN|FBAV|FB_IAB|FB4A|FBMD|FBSV|FBSS|FBCR|FBID|FBLC|FBOP|FBRV|FBSN|FB_UA|FBSF|FBPN|FBLC/i.test(navigator.userAgent) ||
                       /Zalo/i.test(navigator.userAgent) ||
                       (navigator as any).standalone ||
                       window.matchMedia('(display-mode: standalone)').matches

      if (isWebView) {
        console.log("Detected webview, trying alternative approach")

        // For webviews, try to open in new tab/window first
        const newWindow = window.open(dataUrl, '_blank')
        if (newWindow) {
          console.log("Opened in new window/tab")
          return
        }
      }

      // Standard download approach
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `stamp-${year}@${scale}x.svg`

      // For iOS Safari and some webviews
      if (/Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) {
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
      }

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("Fallback download initiated")
    } catch (fallbackError) {
      console.error("Fallback download failed:", fallbackError)

      // Last resort: try to copy to clipboard or show data URL
      try {
        // Try to copy data URL to clipboard as last resort
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(dataUrl).then(() => {
            alert("Không thể tải về tự động. Data URL đã được sao chép vào clipboard. Vui lòng dán vào trình duyệt để tải về.")
          }).catch(() => {
            alert("Không thể tải về file. Vui lòng thử lại với trình duyệt khác hoặc liên hệ hỗ trợ.")
          })
        } else {
          alert("Không thể tải về file. Vui lòng thử lại với trình duyệt khác hoặc liên hệ hỗ trợ.")
        }
      } catch (clipboardError) {
        console.error("Clipboard fallback failed:", clipboardError)
        alert("Không thể tải về file. Vui lòng thử lại với trình duyệt khác hoặc liên hệ hỗ trợ.")
      }
    }
  }

  return (
    <section
      id="stamp-section"
      className={cn(
        "relative w-full min-h-screen py-10",
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
          ? (fontLoaded ? "font-loaded" : "font-loading")
          : "",
        className
      )}
      aria-label="Stamp section"
    >
      <div className="mx-auto w-full h-full max-w-7xl px-6">
        <h2 className="text-center font-daruma text-3xl sm:text-4xl text-[#00687F] mb-4">
          Tạo dấu ấn riêng, lan tỏa sắc màu WISers
        </h2>
        <div className="flex items-center justify-center mb-10">
          <h2 className="font-daruma text-3xl sm:text-4xl text-[#00687F] mr-3">
            Design Your "Being Me"
          </h2>
          <img
            src="/star.png"
            alt="Star icon"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-20 lg:h-20"
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-start">
          {/* Preview - Mobile: trên cùng, Desktop: bên trái */}
          <div className="w-full lg:col-span-7 order-1 lg:order-1">
            <div className="relative mx-auto w-fit rounded-2xl bg-white p-4 sm:p-6 ring-1 ring-[#002855] overflow-visible">
              <svg
                ref={svgRef}
                width={svgDefs.size}
                height={svgDefs.size}
                viewBox={`0 0 ${svgDefs.size} ${svgDefs.size}`}
                role="img"
                aria-label="Stamp preview"
                className="w-full h-auto max-w-full"
              >
                <defs>
                  <style>
                    {`
                      @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap');
                      .stamp-text { font-family: 'Mulish', 'Arial', 'Helvetica', sans-serif; }
                    `}
                  </style>
                  <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    {theme.gradientStops ? (
                      theme.gradientStops.map((s, i) => (
                        <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
                      ))
                    ) : (
                      <>
                        <stop offset="0%" stopColor={theme.strokeStart} />
                        <stop offset="100%" stopColor={theme.strokeEnd} />
                      </>
                    )}
                  </linearGradient>
                  <path id="circlePath" d={svgDefs.circleD} />
                  <path id="circlePathReverse" d={svgDefs.circleDReverse} />
                  <path id="circlePathReverseSince" d={svgDefs.circleDReverseSince} />
                </defs>

                {/* Outer ring */}
                <circle
                  cx={svgDefs.cx}
                  cy={svgDefs.cy}
                  r={svgDefs.outerR}
                  fill="#ffffff"
                  stroke="url(#borderGrad)"
                  strokeWidth="4"
                />
                {/* Inner thin ring */}
                <circle
                  cx={svgDefs.cx}
                  cy={svgDefs.cy}
                  r={svgDefs.innerR}
                  fill="none"
                  stroke="url(#borderGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={svgDefs.innerDashArray}
                  strokeDashoffset={svgDefs.innerDashOffset}
                />

                {/* Center logo (thay đổi theo mốc) */}
                <image
                  href={theme.logoSrc}
                  x={svgDefs.cx - 180}
                  y={svgDefs.cy - 170}
                  width="350"
                  height="350"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Icon người dùng chọn (đưa vào SVG để export đúng) */}
                <image
                  href={`/stamp/icon-${iconIndex}-${band}.svg`}
                  x={svgDefs.size * 0.27 - 35}
                  y={svgDefs.size * 0.61 - 30}
                  width="64"
                  height="64"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* NAME tại 1 giờ */}
                <text 
                  fill={band === "1" ? "#75492E" : band === "2" ? "#979DA1" : "#B57900"} 
                  fontSize="28" 
                  fontWeight={700} 
                  textAnchor="middle" 
                  className="stamp-text"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}
                >
                  <textPath href="#circlePath" startOffset="33.33%">{name}</textPath>
                </text>

                {/* SINCE tại 7 giờ – dùng path đảo chiều (radius nhỏ hơn chút) để tránh dính viền */}
                <text 
                  fill={band === "1" ? "#75492E" : band === "2" ? "#979DA1" : "#B57900"} 
                  fontSize="28" 
                  fontWeight={700} 
                  textAnchor="middle" 
                  className="stamp-text"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}
                >
                  <textPath href="#circlePathReverseSince" startOffset="66.67%">Since {year}</textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Controls - Mobile: dưới cùng, Desktop: bên phải */}
          <div className="w-full lg:col-span-5 order-2 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">TÊN CỦA BẠN</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 20) {
                        setName(value);
                      }
                    }}
                    placeholder="Tối đa 20 ký tự"
                    maxLength={20}
                    className="w-full rounded-2xl bg-[#F5F5F5] px-4 py-4 outline-none ring-0 pr-16 relative z-10"
                  />
                  <img
                    src="/Stamp-name-icon.svg"
                    alt="Stamp icon"
                    className="absolute right-4 -top-10 w-16 h-16 sm:w-20 sm:h-20 z-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Năm gia nhập</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 4) {
                      setYear(value);
                    }
                  }}
                  placeholder="2013"
                  maxLength={4}
                  className="w-full rounded-2xl bg-[#F5F5F5] px-4 py-4 outline-none ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase">Icon lựa chọn</label>
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {Array.from({ length: ICON_COUNT }, (_, i) => i + 1).map((idx) => {
                    const active = iconIndex === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setIconIndex(idx)}
                        className={cn(
                          "aspect-square rounded-2xl grid place-items-center border overflow-hidden",
                          active ? "border-[#F05023] bg-[#F05023]/10" : "border-slate-200 bg-white hover:bg-slate-50"
                        )}
                        aria-label={`Chọn icon ${idx}`}
                      >
                        <img src={`/stamp/icon-${idx}-${band}.svg`} alt={`Icon ${idx}`} className="w-8 h-8 sm:w-10 sm:h-10" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleDownload} className="w-full h-12 text-base font-semibold">
                  Tải về
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stamp sample image */}
        <div className="mt-16 text-center">
          {/* Desktop image */}
          <img
            src="/stamp-sample.png"
            alt="Mẫu stamp Wellspring"
            className="hidden md:block mx-auto max-w-full h-auto"
          />
          {/* Mobile image */}
          <img
            src="/stamp-sample-mobile.png"
            alt="Mẫu stamp Wellspring"
            className="block md:hidden mx-auto max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default StampSection


