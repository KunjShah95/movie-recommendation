import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Activity, Search } from 'lucide-react'

export default function SummaryBanner() {
  return (
    <motion.section
      className="w-full pt-32 pb-12 px-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto">
        <div className="p-12 rounded-[3rem] glass border-foreground/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase font-mono tracking-widest">Curation Ready</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
                DISCOVERIES_FOUND: 003_MATCHES
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter italic">
                Your cinematic <span className="opacity-50">Discovery.</span>
              </h1>
              <p className="text-lg text-muted-foreground italic leading-relaxed">
                We've curated a selection of films that align with your current mood and viewing preferences.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 backdrop-blur-md" />
                  ))}
                </div>
                <div className="text-xs font-mono text-primary/40 uppercase tracking-widest">
                  Matching thematic <br /> resonance...
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <div className="w-64 h-64 rounded-full bg-primary/10 blur-[80px] absolute inset-0" />
              <div className="relative w-48 h-48 rounded-[2.5rem] bg-primary/5 border border-primary/20 flex items-center justify-center backdrop-blur-3xl group-hover:scale-105 transition-transform duration-500">
                <Search className="w-16 h-16 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

