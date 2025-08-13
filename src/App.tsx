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

  return (
    <div>
      <Header language={lang} onToggleLanguage={setLang} />
      <HeroSection onExploreClick={() => console.log('Explore clicked')} />
      <IntroductionSection />
      <StampSection />
      <TopicsSection language={lang} />
      <MomentSection />
      <MessageSection />
      <img src="/Footer-diversity.png" alt="Footer Diversity" className="block w-full h-auto" />
      
    </div>
  )
}

export default App
