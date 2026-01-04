import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight, Cpu, Sparkles } from 'lucide-react'
import { useRecommendation } from '@/context/RecommendationContext'

export default function RecommendCTA() {
  const navigate = useNavigate()
  const { mood, intent, context, personality, setRecommendations, setExplanation, setLoading, loading } = useRecommendation()

  const handleRecommend = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/v1/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, intent, context, personality }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations)
        setExplanation(data.explanation)
        navigate('/recommendations')
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      className="w-full py-48 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        06 // EXECUTION_PHASE
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
          Ready for Output
        </div>
        
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter italic leading-[0.85]">
          Synthesize <br /><span className="text-secondary opacity-50 NOT-italic">Results.</span>
        </h2>

        <p className="text-muted-foreground text-xl italic max-w-2xl mx-auto opacity-60">
          Our engine is primed. Click below to initialize the final semantic mapping and generate your custom cinematic report.
        </p>

        <div className="pt-8 relative inline-block group">
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <Button
            size="lg"
            onClick={handleRecommend}
            disabled={loading}
            className="relative h-24 px-16 rounded-full text-2xl font-black italic gap-6 bg-primary text-primary-foreground hover:bg-primary/95 shadow-2xl shadow-primary/30 active:scale-95 transition-all beam-border uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                INITIALIZING...
              </>
            ) : (
              <>
                Initialize Synthesis
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </Button>
        </div>
        
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Latency', value: '0.2s', icon: Cpu },
            { label: 'Precision', value: '98.2%', icon: Sparkles },
            { label: 'Neural Sync', value: 'Active', icon: Cpu },
            { label: 'Status', value: 'Ready', icon: Sparkles }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 space-y-1">
              <div className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">{stat.label}</div>
              <div className="text-xs font-bold italic text-primary/60">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
