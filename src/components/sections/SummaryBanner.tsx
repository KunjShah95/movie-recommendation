import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Activity, Search, Sparkles } from 'lucide-react'
import { useRecommendation } from '@/context/RecommendationContext'

export default function SummaryBanner() {
  const { recommendations, mood, loading } = useRecommendation()
  
  const matchCount = recommendations.length
  const formattedCount = matchCount.toString().padStart(3, '0')

  return (
    <motion.section
      className="w-full pt-32 pb-12 px-6 relative"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto">
        <div className="p-10 md:p-16 rounded-[3rem] glass border-foreground/5 relative overflow-hidden group">
          {/* Status Badge */}
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-md">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-widest">
                {loading ? 'ARCHIVE_SYNCING...' : 'CURATION_LOCKED'}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.2em] font-mono">
                  DISCOVERIES_FOUND: {formattedCount}_MATCHES
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-[0.9]">
                  Your cinematic <br />
                  <span className="text-primary">{mood || 'Discovery'}.</span>
                </h1>
                <p className="text-xl text-muted-foreground italic leading-relaxed max-w-xl">
                  {mood 
                    ? `Our AI engine has mapped your ${mood} frequency to the global cinematic archives. Here are the most resonant stories.`
                    : "We've curated a selection of films based on your unique cinematic DNA and preferences."}
                </p>
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-foreground/5 w-fit">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 backdrop-blur-md ring-1 ring-primary/10"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] leading-tight">
                  THEMATIC_RESONANCE <br />
                  <span className="text-primary/60">ESTABLISHED_98.4%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-primary/5 blur-[100px] absolute inset-0 animate-pulse" />
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[3rem] glass-dark border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Search className="w-20 h-20 text-primary/30 group-hover:text-primary/50 transition-colors" />
                {/* Decorative scanning line */}
                <div className="absolute inset-x-0 h-px bg-primary/20 top-1/2 -translate-y-1/2 w-full animate-scan" style={{ animation: 'scan 4s ease-in-out infinite' }} />
              </div>
            </div>
          </div>

          {/* Background grid refinement */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] flex flex-wrap gap-4 p-4 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>0X_{i.toString(16).toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-40px); opacity: 0; }
          50% { transform: translateY(40px); opacity: 1; }
        }
      `}</style>
    </motion.section>
  )
}

