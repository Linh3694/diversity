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
        photoSrc: "/15-08-2025.png",
        variant: "normal",
      },
      { 
        id: "2025-08-29", 
        label: "29/8/2025", 
        photoSrc: "/29-08-2025.png",
        variant: "special", 
      },
      { 
        id: "2025-09-12", 
        label: "12/9/2025", 
        photoSrc: "/12-09-2025.png",
        variant: "normal", 
      },
      { 
        id: "2025-09-26", 
        label: "26/9/2025", 
        photoSrc: "/26-09-2025.png",
        variant: "normal", 
      },
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
      { id: "2025-10-10", label: "10/10/2025", photoSrc: "/Herosection-background.webp", disabled: true },
      { id: "2025-11-07", label: "7/11/2025", photoSrc: "/Herosection-background.webp", disabled: true },
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
      { id: "2025-12-12", label: "12/2025", photoSrc: "/Herosection-background.webp", disabled: true },
      { id: "2026-01-16", label: "1/2026", photoSrc: "/Herosection-background.webp", disabled: true },
    ],
  },
  {
    key: "interested",
    title: "INTERESTED WISers",
    range: "2–3/2026",
    image: "/interested-wisers.png",
    bgClass: "bg-[#BED100]",
    accent: "#BED100",
    months: [
      { id: "2026-02-20", label: "2/2026", photoSrc: "/Herosection-background.webp", disabled: true },
      { id: "2026-03-20", label: "3/2026", photoSrc: "/Herosection-background.webp", disabled: true },
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
      { id: "2026-04-17", label: "4/2026", photoSrc: "/Herosection-background.webp", disabled: true },
      { id: "2026-05-15", label: "5/2026", photoSrc: "/Herosection-background.webp", disabled: true },
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
        "relative w-full overflow-hidden",
        "bg-white",
        className,
      )}
      aria-label="Topics section"
      id="topics"
    >
      {/* Content */}
      <div className="mx-auto w-full max-w-[1100px] px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-daruma text-lg sm:text-2xl md:text-4xl text-slate-900 lg:mb-3">
            Khám phá các chủ đề của Diversity Days
          </h2>
          <p className="font-daruma text-lg sm:text-2xl md:text-4xl text-slate-900 mb-6 lg:mb-16">
            Cộng đồng WISers đa dạng và gắn kết
          </p>
          <p className="text-slate-700 text-base md:text-lg">
            Hãy lưu lại những bức ảnh kỷ niệm và chia sẻ với hashtag <span className="font-semibold">#WellspringDiversityDays</span> để mỗi ngày Diversity Days trở nên thật vui vẻ, khác biệt và nhiều điều bất ngờ nhé!
          </p>
        </div>

        {/* Topic cards in 2 centered rows */}
        <div className="mt-10 flex flex-col items-center gap-10">
          {/* Row 1: mindful - active (mobile) / mindful - active - generous (desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-8 w-full z-20">
            {TOPICS.slice(0, 2).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => t.key === "mindful" ? setActiveTopicKey(t.key) : null}
                className={cn(
                  "relative w-full max-w-[300px] overflow-hidden rounded-[56px] focus:outline-none",
                  t.key !== "mindful" && "opacity-100 cursor-not-allowed"
                )}
                aria-label={t.title}
                disabled={t.key !== "mindful"}
              >
                <img src={t.image} alt={t.title} className="block w-full h-auto" />
              </button>
            ))}
            {/* Third item only visible on desktop */}
            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => null}
                className="relative w-full max-w-[300px] overflow-hidden rounded-[56px] focus:outline-none opacity-100 cursor-not-allowed"
                aria-label={TOPICS[2].title}
                disabled={true}
              >
                <img src={TOPICS[2].image} alt={TOPICS[2].title} className="block w-full h-auto" />
              </button>
            </div>
          </div>

          {/* Details shows right after row 1 if a row-1 topic is active */}
          {activeTopic && activeIndex >= 0 && activeIndex < 3 && (
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

          {/* Row 2: interested - connected */}
          <div className="grid grid-cols-2 place-items-center gap-8 w-full">
            {TOPICS.slice(3, 5).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => null}
                className="relative w-full max-w-[300px] overflow-hidden rounded-[56px] focus:outline-none opacity-100 cursor-not-allowed"
                aria-label={t.title}
                disabled={true}
              >
                <img src={t.image} alt={t.title} className="block w-full h-auto" />
              </button>
            ))}
          </div>

          {/* Row 3: 1 item on mobile only (generous) */}
          <div className="grid grid-cols-1 lg:hidden place-items-center gap-8 w-full z-20">
            {TOPICS.slice(2, 3).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => null}
                className="relative w-full max-w-[200px] overflow-hidden rounded-[56px] focus:outline-none opacity-100 cursor-not-allowed"
                aria-label={t.title}
                disabled={true}
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
      <div className="lg:flex lg:flex-wrap grid-cols-2 grid gap-4 justify-center">
        {months.map((m) => {
          const isActive = m.id === monthActive.id
          const isDisabled = Boolean(m.disabled)
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => { if (!isDisabled) onSelectMonth(m.id) }}
              className={cn(
                "lg:px-12 px-6 py-3 rounded-full lg:text-xl text-base font-extrabold",
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
            dressColors={undefined}
            accent={accent}
          />
        ) : (
          <NormalMonthContent
            monthId={monthActive.id}
            monthLabel={monthActive.label}
            topicTitle={topicTitle}
            language={language}
            photoSrc={monthActive.photoSrc}
                            dressColors={undefined}
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
  const monthI18n = topicsI18n[monthId]
  const preferred = monthI18n?.[language]
  const fallback = language === 'vi' ? monthI18n?.en : monthI18n?.vi
  const localized: LocalizedContent | undefined = (preferred && (preferred.quote || preferred.paragraphs?.length || preferred.bullets?.length || preferred.outro)) ? preferred : fallback
  const finalDressColors = monthI18n?.dressColors || dressColors
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
          <h3 className="text-3xl md:text-5xl text-center lg:text-left font-daruma font-extrabold mb-8" style={{ color: accent }}>{monthLabel}</h3>
           <div className="lg:hidden relative w-[280px] max-h-[420px] mx-auto" style={{ height: matchHeight ?? 900 }}>
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full object-contain object-top  " />
          </div>
          <div className="block lg:hidden">
            <div className="font-semibold mb-3 text-[10px] leading-loose" style={{ color: accent }}>Dress code</div>
            <div className="flex items-center gap-3">
              {finalDressColors?.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-block h-6 w-6 rounded-full border-2" 
                  style={{ 
                    backgroundColor: c, 
                    borderColor: 'rgba(0, 0, 0, 0.2)' 
                  }} 
                  aria-hidden 
                />
              ))}
            </div>
            {finalDressColors?.length ? (
              <div className="mt-2 text-slate-600 text-[10px] leading-loose">{monthI18n?.dressCode?.[language]}</div>
            ) : null}
          </div>
          {localized?.quote && <p className="text-[10px] md:text-[16px] mb-2 font-semibold leading-[2] md:leading-[2.2]" style={{ color: accent }}>{localized.quote}</p>}
          {localized?.paragraphs && (
            <div className="text-[#002855] text-[10px] lg:text-[16px] text-justify whitespace-pre-line leading-[2.0] md:leading-[2.3]">
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
        </div>

        <div className="md:col-span-6">
          <div className="hidden lg:block relative w-[348px] h-[450px] mx-auto">
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full h-full object-contain object-top" />
          </div>
          {/* Dress code moved below the image */}
          <div className="hidden lg:block mt-8">
            <div className="font-semibold mb-3 text-lg leading-loose" style={{ color: accent }}>Dress code</div>
            <div className="flex items-center gap-8">
              {finalDressColors?.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-block h-10 w-10 rounded-full border-2" 
                  style={{ 
                    backgroundColor: c, 
                    borderColor: 'rgba(0, 0, 0, 0.2)' 
                  }} 
                  aria-hidden 
                />
              ))}
            </div>
            {finalDressColors?.length ? (
              <div className="mt-2 text-slate-600 text-lg leading-loose">{monthI18n?.dressCode?.[language]}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecialMonthContent({ monthId, monthLabel, topicTitle, language, photoSrc, dressColors, accent }: MonthContentBaseProps) {
  const monthI18n = topicsI18n[monthId]
  const preferred = monthI18n?.[language]
  const fallback = language === 'vi' ? monthI18n?.en : monthI18n?.vi
  const localized: LocalizedContent | undefined = (preferred && (preferred.quote || preferred.paragraphs?.length || preferred.bullets?.length || preferred.outro)) ? preferred : fallback
  const finalDressColors = monthI18n?.dressColors || dressColors
  const specialColor = '#ED1C24'

  return (
    <div className="relative z-10 rounded-2xl border-2 p-6 md:p-20 bg-[#FFFCFC]" style={{ borderColor: accent }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-6">
          <h3 className="text-3xl md:text-5xl text-center lg:text-left font-daruma font-extrabold mb-8" style={{ color: specialColor }}>{monthLabel}</h3>
          <div className="block lg:hidden relative max-w-[500px] max-h-[350px] mx-auto mb-8">
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full h-fit object-contain object-top" />
          </div>
          <div className="block lg:hidden lg:mb-8 mb-4">
            <div className="font-semibold mb-3 text-[10px] leading-loose" style={{ color: specialColor }}>Dress code</div>
            <div className="flex items-center gap-3">
              {finalDressColors?.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-block h-6 w-6 rounded-full border-2" 
                  style={{ 
                    backgroundColor: c, 
                    borderColor: 'rgba(0, 0, 0, 0.2)' 
                  }} 
                  aria-hidden 
                />
              ))}
            </div>
            {finalDressColors?.length ? (
              <div className="mt-2 text-slate-600 text-[10px] leading-loose">{monthI18n?.dressCode?.[language]}</div>
            ) : null}
          </div>
          {localized?.quote && <p className="text-[10px] md:text-lg lg:mb-4 mb-2 mt-2 lg:mt-0 font-semibold leading-[2] md:leading-[2.2]" style={{ color: specialColor }}>{localized.quote}</p>}
          {localized?.paragraphs && (
            <div className="text-[#002855] text-[10px] md:text-[16px] text-justify leading-[2.0] md:leading-[2.1]">
              {localized.paragraphs.join('\n')}
            </div>
          )}
          {localized?.bullets && (
            <ul className="mt-6 list-disc pl-6 text-slate-800 space-y-3 text-[10px] md:text-lg text-justify leading-loose">
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
        </div>

        <div className="hidden lg:block md:col-span-6">
          <div className="relative w-[400px] h-[500px] mx-auto">
            <img src={topicsI18n[monthId]?.photoSrc || photoSrc} alt={topicTitle} className="block w-full h-full object-contain object-top" />
          </div>
          {/* Dress code moved below the image */}
          <div className="hidden lg:block mt-8">
            <div className="font-semibold mb-3 text-[16px] leading-loose" style={{ color: specialColor }}>Dress code</div>
            <div className="flex items-center gap-8">
              {finalDressColors?.map((c, i) => (
                <span 
                  key={i} 
                  className="inline-block h-10 w-10 rounded-full border-2" 
                  style={{ 
                    backgroundColor: c, 
                    borderColor: 'rgba(0, 0, 0, 0.2)' 
                  }} 
                  aria-hidden 
                />
              ))}
            </div>
            {finalDressColors?.length ? (
              <div className="mt-2 text-slate-600 text-[16px] leading-loose">{monthI18n?.dressCode?.[language]}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}


