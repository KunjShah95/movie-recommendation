import HeroHeader from '@/components/sections/HeroHeader'
import MoodInput from '@/components/sections/MoodInput'
import IntentSelection from '@/components/sections/IntentSelection'
import ContextAwareness from '@/components/sections/ContextAwareness'
import PersonalitySnapshot from '@/components/sections/PersonalitySnapshot'
import CinematicDetective from '@/components/sections/CinematicDetective'
import RecommendCTA from '@/components/sections/RecommendCTA'
import SEO from '@/components/SEO'

export default function Discovery() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden pt-20 selection:bg-primary/20">
      <SEO 
        title="Discovery Interface | CinePulse"
        description="Select your mood, intent, and personality to receive highly personalized AI movie recommendations."
      />
      
      {/* Architectural Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/[0.02]" />
        <div className="absolute left-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute right-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute inset-0 mesh-bg opacity-30" />
        
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/2 rounded-full blur-[140px]" />
      </div>

      <main className="relative z-10">
        <HeroHeader />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-0 pb-40">
            <div className="relative">
              <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-px bg-foreground/[0.03]" />
              
              <MoodInput />
              <IntentSelection />
              <ContextAwareness />
              <PersonalitySnapshot />
              <CinematicDetective />
              <RecommendCTA />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
