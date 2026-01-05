import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { Sparkles, Lightbulb, Plane, BookOpen, Users } from 'lucide-react'
import { useRecommendation } from '@/context/RecommendationContext'

const intents = [
  { id: 'relax', label: 'Relaxation', desc: 'Unwind & drift.', icon: Sparkles },
  { id: 'inspire', label: 'Inspiration', desc: 'Moved & motivated.', icon: Lightbulb },
  { id: 'escape', label: 'Escapism', desc: 'Beyond reality.', icon: Plane },
  { id: 'learn', label: 'Educational', desc: 'Deep narratives.', icon: BookOpen },
  { id: 'social', label: 'Group Watch', desc: 'Collective pulse.', icon: Users },
]

export default function IntentSelection() {
  const { intent, setIntent } = useRecommendation()

  return (
    <motion.section
      className="w-full py-32 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        INTENT_MAPPING
      </div>

      <div className="max-w-7xl space-y-16">
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
            Step 02
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-none">
            Select your <span className="text-primary italic-none">Vector.</span>
          </h2>
          <p className="text-muted-foreground text-xl italic max-w-xl">
            What is the specific objective of this cinematic experience?
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={staggerContainer}
        >
          {intents.map((item) => {
            const Icon = item.icon
            const isSelected = intent === item.label
            
            return (
              <motion.button
                key={item.id}
                variants={staggerItem}
                onClick={() => setIntent(item.label)}
                className={`relative group p-10 rounded-[2.5rem] border text-left transition-all duration-700 overflow-hidden ${
                  isSelected
                    ? 'bg-primary/[0.08] border-primary/20 ring-1 ring-primary/20'
                    : 'bg-foreground/[0.01] border-foreground/5 hover:border-primary/20 hover:bg-primary/[0.02]'
                }`}
              >
                {/* Visual Glow for Selected */}
                {isSelected && (
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                )}

                <div className={`w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-10 border border-primary/10 transition-all duration-500 scale-100 group-hover:scale-110 ${isSelected ? 'bg-primary/10 border-primary/30' : ''}`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-primary/40 group-hover:text-primary/60'}`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 tracking-tight italic transition-colors ${isSelected ? 'text-foreground' : 'text-foreground/40 group-hover:text-foreground/60'}`}>
                  {item.label}
                </h3>
                <p className={`text-[10px] font-mono uppercase tracking-widest leading-relaxed transition-colors ${isSelected ? 'text-primary/60' : 'text-foreground/20'}`}>
                  {item.desc}
                </p>

                {/* Animated Beam at bottom */}
                <div className={`absolute bottom-0 left-0 h-1 bg-primary/40 transition-all duration-700 ${isSelected ? 'w-full' : 'w-0 group-hover:w-1/2'}`} />
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
