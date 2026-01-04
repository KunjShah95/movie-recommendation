import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import MovieCard from '@/components/MovieCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
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
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-mono text-foreground/40 uppercase tracking-widest">Retrieving Shared Frequency...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold tracking-tighter italic">Share Not Found.</h2>
        <p className="text-muted-foreground italic">The cinematic link has dissolved into the archives.</p>
        <Link to="/">
          <Button variant="outline" className="rounded-full gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title={`A Cinematic Gift: ${data.mood} Finds`}
        description={`Explore these movies curated for a ${data.mood} mood. Shared via CinePulse AI.`}
        image={data.movies[0]?.poster}
      />
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-4 text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Shared Recommendation
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter italic">
            Found for a <span className="text-primary">{data.mood}</span> mood.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
            A friend shared this cinematic frequency with you. Explore the stories that matched their current state.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.movies.map((movie, index: number) => (
            <MovieCard
              key={movie.id}
              {...movie}
              delay={index * 0.2}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-6 pt-12 border-t border-foreground/5"
        >
          <p className="text-sm font-mono text-foreground/40 uppercase tracking-widest">Your turn to find a story?</p>
          <Link to="/">
            <Button className="rounded-full h-14 px-8 text-lg font-bold italic gap-3">
              START YOUR DISCOVERY <Sparkles className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
