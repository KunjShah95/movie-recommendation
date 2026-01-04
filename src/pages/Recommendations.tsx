import SummaryBanner from '@/components/sections/SummaryBanner'
import MovieCard from '@/components/MovieCard'
import { useRecommendation } from '@/context/RecommendationContext'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Share2, Check, Loader2, ArrowLeft } from 'lucide-react'
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
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-foreground/[0.03]" />
        <div className="absolute inset-y-0 right-1/4 w-px bg-foreground/[0.03]" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 border border-primary/20 rounded-full animate-ping absolute inset-0" />
            <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
          <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em] animate-pulse text-center max-w-xs">
            Synthesizing cinematic frequency from global archives...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden pb-40 selection:bg-primary/20">
      {/* Architectural Design Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/[0.02]" />
        <div className="absolute left-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute right-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute inset-0 mesh-bg opacity-30" />
        
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/2 rounded-full blur-[120px]" />
      </div>

      <SEO 
        title="Your Recommendations"
        description={`Curated films based on your ${mood} mood and ${intent} intent.`}
      />

      <main className="relative z-10">
        <SummaryBanner />
        
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <section className="relative">
            <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
              02 // CURATED_RESULTS
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              {recommendations.length > 0 ? (
                recommendations.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    delay={index * 0.1}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-8 glass-dark rounded-[3rem] border-foreground/5">
                  <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                    <ArrowLeft className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold italic tracking-tighter">Archive is currently empty.</p>
                    <p className="text-muted-foreground italic font-medium">No resonant frequencies found. Adjust your discovery parameters.</p>
                  </div>
                  <Link to="/discovery">
                    <Button className="rounded-full h-12 px-8 border-primary/20 hover:bg-primary/5 text-foreground italic gap-2 group">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO DISCOVERY
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </section>

          {recommendations.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative pt-32"
            >
              <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
                03 // TRANSMISSION
              </div>

              <div className="flex flex-col items-center gap-8 text-center bg-foreground/[0.02] border border-foreground/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="space-y-2">
                  <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em]">Found a frequency worth sharing?</p>
                  <h2 className="text-3xl md:text-5xl font-bold italic tracking-tighter">Export your curation.</h2>
                </div>

                <Button
                  onClick={handleShare}
                  disabled={sharing}
                  className="h-16 px-12 rounded-full text-xl font-bold italic gap-4 beam-border shadow-2xl shadow-primary/20 transition-all active:scale-95"
                >
                  {shared ? (
                    <>FREQUENCY_COPIED <Check className="w-6 h-6" /></>
                  ) : sharing ? (
                    <>SYNCING_DATA... <Loader2 className="w-6 h-6 animate-spin" /></>
                  ) : (
                    <>SHARE THIS MOOD <Share2 className="w-6 h-6" /></>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground italic font-mono opacity-50">
                  Unique link generated via CinePulse SHA-256 Engine. 
                </p>
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  )
}
