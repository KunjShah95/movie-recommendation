import SummaryBanner from '@/components/sections/SummaryBanner'
import MovieCard from '@/components/MovieCard'
import { useRecommendation } from '@/context/RecommendationContext'
import { Button } from '@/components/ui/button'
import { Share2, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '@/components/SEO'

export default function Recommendations() {
  const { recommendations, loading, mood, intent, personality, context } = useRecommendation()
  const [sharing, setSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    if (sharing || shared) return
    setSharing(true)
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/share/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood,
          intent,
          personality,
          context,
          movie_ids: recommendations.map(m => m.id)
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const shareUrl = `${window.location.origin}${data.url}`
        await navigator.clipboard.writeText(shareUrl)
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      }
    } catch (error) {
      console.error('Failed to share:', error)
    } finally {
      setSharing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-2xl font-mono italic animate-pulse">Consulting the cinematic archives...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden pb-40">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/2 rounded-full blur-[120px]" />
      </div>

      <SEO 
        title="Your Recommendations"
        description={`Curated films based on your ${mood} mood and ${intent} intent.`}
      />
      <main className="relative z-10">
        <SummaryBanner />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            {recommendations.length > 0 ? (
              recommendations.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  delay={index * 0.2}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground italic">No recommendations found yet. Try describing your mood in the Discovery section.</p>
              </div>
            )}
          </motion.div>

          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-20 flex flex-col items-center gap-6"
            >
              <div className="w-12 h-px bg-foreground/10" />
              <p className="text-xs font-mono text-foreground/30 uppercase tracking-[0.3em]">Found a vibe worth sharing?</p>
              <Button
                onClick={handleShare}
                disabled={sharing}
                className="h-14 px-10 rounded-full text-lg font-bold italic gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {shared ? (
                  <>LINK COPIED <Check className="w-5 h-5" /></>
                ) : sharing ? (
                  <>GENERATING... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>SHARE THIS MOOD <Share2 className="w-5 h-5" /></>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

