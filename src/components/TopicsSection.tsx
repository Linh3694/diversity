import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { topicsI18n, type LocalizedContent } from "@/i18n/topics"

type Language = "en" | "vi"

interface TopicsSectionProps {
  className?: string
  language: Language
}

type TopicKey = "mindful" | "active" | "generous" | "interested" | "connected"

interface TopicMonth {
  id: string
  label: string
  photoSrc: string
  description?: string
  dressColors?: string[]
  variant?: "normal" | "special"
  disabled?: boolean
}

interface TopicConfig {
  key: TopicKey
  title: string
  range: string
  image: string
  bgClass: string
  accent: string
  months: TopicMonth[]
}

const TOPICS: TopicConfig[] = [
  {
    key: "mindful",
    title: "MINDFUL WISers",
    range: "8–9/2025",
    image: "/mindful-wisers.png",
    bgClass: "bg-[#006880]",
    accent: "#006880",
    months: [
      {
        id: "2025-08-15",
        label: "15/8/2025",
        photoSrc: "/Herosection-background.webp",
        description:
          "Mỗi cảm xúc đều có giá trị. Every emotion has value. Every color is a part of who you are.",
        variant: "normal",
        dressColors: ["#FFD54F", "#0F2A44", "#E53935", "#E0E0E0", "#4A2E83"],
      },
        { id: "2025-08-29", label: "29/8/2025", photoSrc: "/Herosection-background.webp", variant: "special" },
        { id: "2025-09-12", label: "12/9/2025", photoSrc: "/Herosection-background.webp", disabled: true },
        { id: "2025-09-26", label: "26/9/2025", photoSrc: "/Herosection-background.webp", disabled: true },
    ],
  },
  {
    key: "active",
    title: "ACTIVE WISers",
    range: "10–11/2025",
    image: "/active-wisers.png",
    bgClass: "bg-[#EA9A20]",
    accent: "#EA9A20",
    months: [
      { id: "2025-10-10", label: "10/10/2025", photoSrc: "/Herosection-background.webp" },
      { id: "2025-11-07", label: "7/11/2025", photoSrc: "/Herosection-background.webp" },
    ],
  },
  {
    key: "generous",
    title: "GENEROUS WISers",
    range: "12/2025 – 1/2026",
    image: "/generous-wisers.png",
    bgClass: "bg-[#0CA58A]",
    accent: "#0CA58A",
    months: [
      { id: "2025-12-12", label: "12/2025", photoSrc: "/Herosection-background.webp" },
      { id: "2026-01-16", label: "1/2026", photoSrc: "/Herosection-background.webp" },
    ],
  },
  {
    key: "interested",
    title: "INTERESTED WISers",
    range: "2–3/2026",
    image: "/interestd-wisers.png",
    bgClass: "bg-[#BED100]",
    accent: "#BED100",
    months: [
      { id: "2026-02-20", label: "2/2026", photoSrc: "/Herosection-background.webp" },
      { id: "2026-03-20", label: "3/2026", photoSrc: "/Herosection-background.webp" },
    ],
  },
  {
    key: "connected",
    title: "CONNECTED WISers",
    range: "4–5/2026",
    image: "/connected-wisers.png",
    bgClass: "bg-[#EB4A25]",
    accent: "#EB4A25",
    months: [
      { id: "2026-04-17", label: "4/2026", photoSrc: "/Herosection-background.webp" },
      { id: "2026-05-15", label: "5/2026", photoSrc: "/Herosection-background.webp" },
    ],
  },
]

// Topics Section – background illustration stays at bottom-right
export function TopicsSection({ className, language }: TopicsSectionProps) {
  const [activeTopicKey, setActiveTopicKey] = useState<TopicKey | null>(null)
  const [activeMonthId, setActiveMonthId] = useState<string | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)

  const activeTopic = useMemo(() => TOPICS.find(t => t.key === activeTopicKey) || null, [activeTopicKey])
  const activeIndex = useMemo(() => TOPICS.findIndex(t => t.key === activeTopicKey), [activeTopicKey])
  // Ghi chú: chi tiết tháng được xử lý trong TopicDetails, không cần tính trước ở đây

  useEffect(() => {
    if (activeTopic && detailsRef.current) {
      // Chọn tháng đầu tiên nếu chưa chọn
      if (!activeMonthId) setActiveMonthId(activeTopic.months[0]?.id ?? null)
      // Scroll tới khu vực chi tiết
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopicKey])

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden mt-44",
        "bg-white",
        className,
      )}
      aria-label="Topics section"
      id="topics"
    >
      {/* Content */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-daruma text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-3">
            Khám phá các chủ đề của Diversity Days
          </h2>
          <p className="font-daruma text-2xl md:text-3xl text-slate-900 mb-6">
            Cộng đồng WISers đa dạng và gắn kết
          </p>
          <p className="text-slate-700 text-lg md:text-xl">
            Hãy lưu lại những bức ảnh kỷ niệm và chia sẻ với hashtag <span className="font-semibold">#WellspringDiversityDays</span> để mỗi ngày Diversity Days trở nên thật vui vẻ, khác biệt và nhiều điều bất ngờ nhé!
          </p>
        </div>

        {/* Topic cards in 2 centered rows */}
        <div className="mt-10 flex flex-col items-center gap-10">
          {/* Row 1: 3 items, centered */}
          <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center gap-8 w-full">
            {TOPICS.slice(0, 3).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTopicKey(t.key)}
                className="relative w-full max-w-[400px] overflow-hidden rounded-[56px] focus:outline-none"
                aria-label={t.title}
              >
                <img src={t.image} alt={t.title} className="block w-full h-auto" />
              </button>
            ))}
          </div>

          {/* Details shows right after row 1 if a row-1 topic is active */}
          {activeTopic && activeIndex > -1 && activeIndex < 3 && (
            <div ref={detailsRef} className="w-full">
              <TopicDetails
                topicTitle={activeTopic.title}
                months={activeTopic.months}
                activeMonthId={activeMonthId}
                onSelectMonth={setActiveMonthId}
                language={language}
                accent={activeTopic.accent}
              />
            </div>
          )}

          {/* Row 2: 2 items, centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8 w-full">
            {TOPICS.slice(3).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTopicKey(t.key)}
                className="relative w-full max-w-[400px] overflow-hidden rounded-[56px] focus:outline-none"
                aria-label={t.title}
              >
                <img src={t.image} alt={t.title} className="block w-full h-auto" />
              </button>
            ))}
          </div>

          {/* Details shows after row 2 if a row-2 topic is active */}
          {activeTopic && activeIndex >= 3 && (
            <div ref={detailsRef} className="w-full">
              <TopicDetails
                topicTitle={activeTopic.title}
                months={activeTopic.months}
                activeMonthId={activeMonthId}
                onSelectMonth={setActiveMonthId}
                language={language}
                accent={activeTopic.accent}
              />
            </div>
          )}
        </div>
      </div>

      {/* Background image fixed at bottom-right of the section */}
      <img
        src="/bg-library.png"
        alt="Library background"
        className={cn(
          "pointer-events-none select-none",
          "absolute bottom-0 right-0",
          "max-w-[55%] sm:max-w-[45%] md:max-w-[38%] lg:max-w-[32%] h-auto",
        )}
        aria-hidden
      />
    </section>
  )
}

export default TopicsSection

// Reusable details block component
interface TopicDetailsProps {
  topicTitle: string
  months: TopicMonth[]
  activeMonthId: string | null
  onSelectMonth: (id: string) => void
  language: Language
  accent: string
}

function TopicDetails({ topicTitle, months, activeMonthId, onSelectMonth, language, accent }: TopicDetailsProps) {
  const monthActive = months.find((m) => m.id === activeMonthId) || months[0]
  return (
    <div className="mt-2">
      {/* Month tabs */}
      <div className="flex flex-wrap gap-4 justify-center">
        {months.map((m) => {
          const isActive = m.id === monthActive.id
          const isDisabled = Boolean(m.disabled)
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => { if (!isDisabled) onSelectMonth(m.id) }}
              className={cn(
                "px-20 py-4 rounded-full text-4xl font-extrabold",
                "transition-colors",
                isActive ? "text-white" : "bg-white text-[#0F2A44] border-2",
                isDisabled && "opacity-40 cursor-not-allowed",
              )}
              style={isActive ? { backgroundColor: accent } : { borderColor: accent, color: accent }}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Active month content */}
      <div className="mt-6">
        { (topicsI18n[monthActive.id]?.variant || monthActive.variant) === 'special' ? (
          <SpecialMonthContent
            monthId={monthActive.id}
            monthLabel={monthActive.label}
            topicTitle={topicTitle}
            language={language}
            photoSrc={monthActive.photoSrc}
            accent={accent}
          />
        ) : (
          <NormalMonthContent
            monthId={monthActive.id}
            monthLabel={monthActive.label}
            topicTitle={topicTitle}
            language={language}
            photoSrc={monthActive.photoSrc}
            dressColors={monthActive.dressColors}
            accent={accent}
          />
        ) }
      </div>
      
    </div>
  )
}


interface MonthContentBaseProps {
  monthId: string
  monthLabel: string
  topicTitle: string
  language: Language
  photoSrc: string
  dressColors?: string[]
  accent: string
}

function NormalMonthContent({ monthId, monthLabel, topicTitle, language, photoSrc, dressColors, accent }: MonthContentBaseProps) {
  const localized: LocalizedContent | undefined = topicsI18n[monthId]?.[language]
  const leftColRef = useRef<HTMLDivElement | null>(null)
  const [matchHeight, setMatchHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!leftColRef.current) return
    const el = leftColRef.current
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect?.height
      if (typeof h === 'number') setMatchHeight(Math.ceil(h))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div className="relative z-10 rounded-2xl border-2 p-6 md:p-20 bg-[#FFFCFC]" style={{ borderColor: accent }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div ref={leftColRef} className="md:col-span-6">
          <h3 className="text-3xl md:text-6xl font-daruma font-extrabold mb-8" style={{ color: accent }}>{monthLabel}</h3>
          {localized?.quote && <p className="text-2xl md:text-3xl mb-8 font-semibold leading-[2] md:leading-[2.2]" style={{ color: accent }}>"{localized.quote}"</p>}
          {localized?.paragraphs && (
            <div className="text-[#002855] text-xl text-justify whitespace-pre-line leading-loose">
              {localized.paragraphs.join('\n')}
            </div>
          )}
          {localized?.bullets && (
            <ul className="mt-6 list-disc pl-6 text-slate-800 space-y-3 text-xl text-justify leading-loose">
              {localized.bullets.map((b, i) => (
                <li key={i}>
                  {b.text}
                  {b.subBullets && (
                    <ul className="list-disc pl-6 mt-2 space-y-2 leading-loose">
                      {b.subBullets.map((sb, j) => (
                        <li key={j}>{sb}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
          {localized?.outro && <p className="mt-6 text-slate-800 text-xl text-justify leading-loose">{localized.outro}</p>}
        </div>

        <div className="md:col-span-6">
          <div className="relative w-[586px] mx-auto rotate-1 bg-white p-6 rounded-xl shadow-xl ring-1 ring-black/5" style={{ height: matchHeight ?? 900 }}>
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full h-full rounded object-cover" />
          </div>
          {/* Dress code moved below the image */}
          <div className="mt-8">
            <div className="font-semibold mb-3 text-xl leading-loose" style={{ color: accent }}>Dress code</div>
            <div className="flex items-center gap-4">
              {dressColors?.map((c, i) => (
                <span key={i} className="inline-block h-12 w-12 rounded-full" style={{ backgroundColor: c }} aria-hidden />
              ))}
            </div>
            {dressColors?.length ? (
              <div className="mt-2 text-slate-600 text-xl leading-loose">Mặc theo tâm trạng hôm đó – có thể cài mood badge</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecialMonthContent({ monthId, monthLabel, topicTitle, language, photoSrc, accent }: MonthContentBaseProps) {
  const localized: LocalizedContent | undefined = topicsI18n[monthId]?.[language]
  return (
    <div className="relative z-10 rounded-2xl border-8 border-[#F05023] p-6 md:p-8 bg-white shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5">
          <h3 className="text-3xl md:text-4xl font-daruma font-extrabold mb-4" style={{ color: '#F05023' }}>{monthLabel}</h3>
          {localized?.quote && <p className="text-3xl font-semibold italic mb-4" style={{ color: accent }}>{localized.quote}</p>}
          {localized?.paragraphs && (
            <div className="space-y-4 text-slate-800 leading-loose text-justify">
              {localized.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {/* Dress code for special month 29/08 */}
          {monthId === '2025-08-29' && (
            <div className="mt-6">
              <div className="font-semibold mb-3 text-xl" style={{ color: accent }}>Dress code</div>
              <div className="flex items-center gap-4">
                <img src="/flag-vi.png" alt="Việt Nam" className="h-10 w-16 rounded-sm" />
                <span className="text-slate-800 text-xl">Trang phục có họa tiết: Cờ đỏ - sao vàng, lễ phục, quần áo bộ đội</span>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-7">
          <div className="relative w-[700px] h-[900px] mx-auto bg-white p-4 rounded-xl ring-1 ring-black/5">
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full h-full rounded object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}


