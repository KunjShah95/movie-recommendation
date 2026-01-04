import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, Loader2 } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import MovieCard from '@/components/MovieCard'
import type { Movie } from '@/types/recommendation'

export default function CinematicDetective() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Movie | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/research/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: query }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        console.error('Failed to research')
      }
    } catch (error) {
      console.error('Research error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      className="w-full py-20 px-6 border-y border-foreground/5 bg-foreground/[0.02]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Experimental
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic">
            Active <span className="opacity-50">Detective.</span>
          </h2>
          <p className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
            Not in our archives? Type a movie or Indian web series name and I'll scan the web, analyze its emotional arc, and map it in real-time.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/20 group-focus-within:text-primary transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., RRR, Sacred Games, Panchayat..."
              className="h-16 pl-16 pr-32 rounded-full bg-foreground/5 border-foreground/10 text-xl italic"
            />
            <Button
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-6 gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  SCAN <Sparkles className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <span className="text-xs font-mono text-primary/60 uppercase tracking-tighter">
                  Analysis Complete. Profile Mapped.
                </span>
              </div>
              <MovieCard {...result} delay={0} />
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
