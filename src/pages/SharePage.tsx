import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import MovieCard from '@/components/MovieCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Share2 } from 'lucide-react'
import SEO from '@/components/SEO'

import type { Movie } from '@/types/recommendation'

interface ShareData {
  mood: string
  intent: string
  personality: string
  context: Record<string, string | number | boolean | null>
  movies: Movie[]
}

export default function SharePage() {
  const { shareId } = useParams()
  const [data, setData] = useState<ShareData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/share/${shareId}`)
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error('Error fetching share:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShare()
  }, [shareId])

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
          <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em] animate-pulse">
            Sychronizing Shared Frequency...
          </p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center gap-8 bg-background relative selection:bg-primary/20">
        <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 mb-4">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter italic text-gradient">Link Dissolved.</h2>
          <p className="text-muted-foreground italic font-medium">The cinematic frequency you're looking for has returned to the archive.</p>
        </motion.div>

        <Link to="/">
          <Button variant="outline" className="rounded-full h-12 px-8 group border-primary/20 hover:border-primary/50 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Return to Base
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 relative bg-background selection:bg-primary/20">
      <SEO 
        title={`A Cinematic Gift: ${data.mood} Finds`}
        description={`Explore these movies curated for a ${data.mood} mood. Shared via CinePulse AI.`}
        image={data.movies[0]?.poster}
      />

      {/* Architectural Design Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/[0.02]" />
        <div className="absolute left-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute right-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute inset-0 mesh-bg opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto space-y-32 relative">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
            SHARED_CURATION
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.2em]">Shared Insight</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter italic leading-[0.9]">
                For a <span className="text-primary italic-none">{data.mood}</span> state.
              </motion.h1>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-foreground/5">
              <p className="text-muted-foreground text-xl italic max-w-2xl leading-relaxed">
                A friend has shared their cinematic frequency with you. These stories were precision-matched to their current intent and personality snapshot.
              </p>
              
              <div className="flex flex-col gap-1 items-start md:items-end">
                <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">Share ID</span>
                <span className="font-mono text-xs text-foreground/60">{shareId?.slice(0, 8)}...</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Curation Grid */}
        <section className="relative">
          <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
            CURATED_FILES
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {data.movies.map((movie, index: number) => (
              <motion.div key={movie.id} variants={fadeInUp}>
                <MovieCard
                  {...movie}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative pt-32 group"
        >
          <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
            YOUR_DISCOVERY
          </div>
          
          <div className="glass-dark rounded-[2rem] p-12 md:p-24 overflow-hidden relative border-primary/10">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic">Ready to find your own frequency?</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto italic">
                Experience the precision of human-centric AI movie recommendations. Let's find your next favorite story.
              </p>
              
              <Link to="/" className="pt-4">
                <Button className="rounded-full h-16 px-10 text-xl font-bold italic gap-4 beam-border shadow-2xl shadow-primary/20">
                  START DISCOVERY <Sparkles className="w-6 h-6 animate-pulse" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
