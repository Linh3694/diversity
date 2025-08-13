import { useMemo, useRef, useState } from "react"
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
      { offset: 0, color: "#FFE964" },
      { offset: 1, color: "#F6DA5B" },
      { offset: 5, color: "#DCAD42" },
      { offset: 9, color: "#C98D30" },
      { offset: 12, color: "#BE7A25" },
      { offset: 14, color: "#BA7322" },
      { offset: 17, color: "#A96017" },
      { offset: 22, color: "#8B3E04" },
      { offset: 24, color: "#A05A17" },
      { offset: 30, color: "#D3A045" },
      { offset: 34, color: "#F2CB61" },
      { offset: 36, color: "#FFDC6D" },
      { offset: 45, color: "#FFFFB5" },
      { offset: 56, color: "#FCFDF6" },
      { offset: 65, color: "#FFFF9C" },
      { offset: 78, color: "#FDDC53" },
      { offset: 80, color: "#F5CF49" },
      { offset: 84, color: "#E1AD31" },
      { offset: 89, color: "#C07709" },
      { offset: 90, color: "#BB6E03" },
      { offset: 100, color: "#5B1F03" },
    ],
  },
}

const ICON_COUNT = 8 as const

interface StampSectionProps {
  className?: string
}

export function StampSection({ className }: StampSectionProps) {
  const [name, setName] = useState<string>("WSHN")
  const [year, setYear] = useState<string>("2020")
  const [iconIndex, setIconIndex] = useState<number>(1)

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
      // Clone SVG và inline tất cả ảnh vào data URI để tránh CORS/thiếu hình khi export
      const clone = svgRef.current.cloneNode(true) as SVGSVGElement
      const images = Array.from(clone.querySelectorAll("image"))
      await Promise.all(
        images.map(async (img) => {
          const href = img.getAttribute("href") || img.getAttributeNS("http://www.w3.org/1999/xlink", "href")
          if (!href || href.startsWith("data:")) return
          const resp = await fetch(href)
          const blob = await resp.blob()
          const dataUrl: string = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(blob)
          })
          img.setAttribute("href", dataUrl)
          img.removeAttribute("xlink:href")
        })
      )

      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(clone)
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

      const img = new Image()
      img.onload = () => {
        // Xuất độ phân giải cao hơn (3x + theo DPR)
        const baseScale = 3
        const scale = Math.max(2, Math.round((window.devicePixelRatio || 1) * baseScale))
        const canvas = document.createElement("canvas")
        canvas.width = svgDefs.size * scale
        canvas.height = svgDefs.size * scale
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          if (!blob) return
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = `stamp-${year}@${scale}x.png`
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
      }
      img.src = dataUrl
    } catch (error) {
      console.error("Failed to export PNG", error)
    }
  }

  return (
    <section className={cn("relative w-full h-screen mt-24", className)} aria-label="Stamp section">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="text-center font-daruma text-4xl text-[#F05023] mb-4">
          Tạo dấu ấn riêng, lan tỏa sắc màu WISers
        </h2>
        <h2 className="text-center font-daruma text-4xl text-[#F05023] mb-10">
          Design Your Being Me       
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Preview */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-fit rounded-2xl bg-white p-6 ring-1 ring-[#002855] overflow-visible">
              <svg
                ref={svgRef}
                width={svgDefs.size}
                height={svgDefs.size}
                viewBox={`0 0 ${svgDefs.size} ${svgDefs.size}`}
                role="img"
                aria-label="Stamp preview"
              >
                <defs>
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
                  strokeWidth="6"
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
                  x={svgDefs.size * 0.27 - 45}
                  y={svgDefs.size * 0.61 - 30}
                  width="64"
                  height="64"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* NAME tại 1 giờ */}
                <text fill="url(#borderGrad)" fontSize="28" fontWeight={600} textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  <textPath href="#circlePath" startOffset="33.33%">{name}</textPath>
                </text>

                {/* SINCE tại 7 giờ – dùng path đảo chiều (radius nhỏ hơn chút) để tránh dính viền */}
                <text fill="url(#borderGrad)" fontSize="28" fontWeight={600} textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  <textPath href="#circlePathReverseSince" startOffset="66.67%">Since {year}</textPath>
                </text>
              </svg>

              {/* Decor được chuyển ra cấp section để vươn xuống section tiếp theo */}
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Tên của bạn</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên (in trên viền ở góc 1h)"
                  className="w-full rounded-2xl bg-[#F5F5F5] px-4 py-4 outline-none ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Năm gia nhập</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-2xl bg-[#F5F5F5] px-4 py-4 outline-none ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase">Icon lựa chọn</label>
                <div className="grid grid-cols-4 gap-4">
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
                        <img src={`/stamp/icon-${idx}-${band}.svg`} alt={`Icon ${idx}`} className="w-10 h-10" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleDownload} className="w-full h-12 text-base font-semibold">
                  Tải về PNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decor ở cấp section: vươn xuống dưới chồng lên section kế tiếp */}
      <img
        src="/decor-01.svg"
        alt="Decor"
        className="pointer-events-none select-none absolute -bottom-40 left-[195px] z-20 w-[348px] md:w-[348px] h-auto"
        aria-hidden
      />
    </section>
  )
}

export default StampSection


