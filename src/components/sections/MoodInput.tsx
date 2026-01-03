import { motion } from 'framer-motion'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const PRESET_MOODS = [
  { label: 'Melancholic', energy: 'Low', color: 'bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10' },
  { label: 'Euphoric', energy: 'High', color: 'bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10' },
  { label: 'Resilient', energy: 'Mid', color: 'bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10' },
  { label: 'Cerebral', energy: 'Low', color: 'bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10' },
  { label: 'Chaotic', energy: 'High', color: 'bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10' },
]

export default function MoodInput() {
  const [mood, setMood] = useState('')
  const maxLength = 300

  return (
    <motion.section
      className="w-full py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Step 01
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic">
            Describe your <span className="opacity-50">Mood.</span>
          </h2>
          <p className="text-muted-foreground text-lg italic">
            What kind of atmosphere are you looking for right now?
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
          {PRESET_MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m.label + ": ")}
              className={`px-6 py-2 rounded-full border text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${m.color}`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative group">
          <div className="relative">
            <Textarea
              value={mood}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMood(e.target.value)}
              placeholder="Start typing..."
              maxLength={maxLength}
              className="min-h-[200px] text-xl p-8 rounded-[2rem] bg-foreground/5 backdrop-blur-xl border-foreground/10 focus-visible:border-primary/20 transition-all resize-none italic placeholder:text-foreground/20"
            />
            <div className="absolute bottom-6 right-8 font-mono text-xs text-primary/40 tracking-widest">
              {mood.length} / {maxLength}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
