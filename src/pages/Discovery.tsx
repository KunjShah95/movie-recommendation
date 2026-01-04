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
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden pt-20">
      <SEO 
        title="Discovery | Map Your Cinematic Mood"
        description="Select your mood, intent, and personality to receive highly personalized AI movie recommendations."
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/2 rounded-full blur-[140px]" />
      </div>

      <main className="relative z-10 px-6">
        <HeroHeader />
        <div className="space-y-0 pb-32">
          <MoodInput />
          <IntentSelection />
          <ContextAwareness />
          <PersonalitySnapshot />
          <CinematicDetective />
          <RecommendCTA />
        </div>
      </main>
    </div>
  )
}

