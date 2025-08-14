import { useState } from 'react'
import './App.css'
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { IntroductionSection } from "@/components/IntroductionSection"
import { StampSection } from "@/components/StampSection"
import { TopicsSection } from "@/components/TopicsSection"
import { MomentSection } from "@/components/MomentSection"
import { MessageSection } from "@/components/MessageSection"

function App() {

  const [lang, setLang] = useState<'en' | 'vi'>('en')

  const scrollToStampSection = () => {
    const stampSection = document.getElementById('stamp-section')
    if (stampSection) {
      stampSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <Header language={lang} onToggleLanguage={setLang} />
      <HeroSection onExploreClick={scrollToStampSection} />
      <IntroductionSection />
      <StampSection />
      <TopicsSection language={lang} />
      <MomentSection />
      <MessageSection />
      {/* Footer - Desktop */}
      <img src="/Footer-diversity.png" alt="Footer Diversity" className="hidden md:block w-full h-auto" />
      {/* Footer - Mobile */}
      <img src="/Footer-diversity-mobile.png" alt="Footer Diversity Mobile" className="block md:hidden w-full h-auto" />
      
    </div>
  )
}

export default App
