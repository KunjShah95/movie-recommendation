import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useRecommendation } from '@/context/RecommendationContext'

const PRESET_MOODS = [
  { label: 'Melancholic', energy: 'Low' },
  { label: 'Euphoric', energy: 'High' },
  { label: 'Cerebral', energy: 'Mid' },
  { label: 'Ethereal', energy: 'Low' },
  { label: 'Chaotic', energy: 'High' },
]

export default function MoodInput() {
  const { mood, setMood } = useRecommendation()
  const maxLength = 300

  return (
    <motion.section
      className="w-full py-32 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        MOOD_BASELINE
      </div>

      <div className="max-w-4xl space-y-12">
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
            Step 01
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-none">
            Describe your <span className="text-primary italic-none">State.</span>
          </h2>
          <p className="text-muted-foreground text-xl italic max-w-xl">
            What kind of emotional frequency are you currently projecting?
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
          {PRESET_MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              className={`px-8 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group ${
                mood === m.label 
                  ? 'border-primary text-primary bg-primary/10' 
                  : 'border-foreground/10 text-foreground/40 hover:border-primary/30 hover:text-foreground'
              }`}
            >
              <span className="relative z-10">{m.label}</span>
              {mood === m.label && (
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              )}
            </button>
          ))}
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative group max-w-2xl">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <Textarea
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Start typing your current state..."
              maxLength={maxLength}
              className="relative z-10 min-h-[160px] text-2xl p-8 rounded-[2rem] bg-foreground/[0.02] backdrop-blur-xl border-foreground/5 focus-visible:border-primary/20 transition-all resize-none italic placeholder:text-foreground/10 shadow-inner"
            />
            <div className="absolute bottom-6 right-8 font-mono text-[10px] text-primary/40 tracking-[0.3em] font-bold">
              {mood.length} / {maxLength}_LIMIT
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
