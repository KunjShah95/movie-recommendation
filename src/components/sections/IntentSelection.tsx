import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { Sparkles, Lightbulb, Plane, BookOpen, Users } from 'lucide-react'

const intents = [
  { id: 'relax', label: 'Relaxation', desc: 'Unwind and drift away.', icon: Sparkles, color: 'text-primary' },
  { id: 'inspire', label: 'Inspiration', desc: 'Feel moved and motivated.', icon: Lightbulb, color: 'text-primary' },
  { id: 'escape', label: 'Escapism', desc: 'Journey to other worlds.', icon: Plane, color: 'text-primary' },
  { id: 'learn', label: 'Educational', desc: 'Deep dive into stories.', icon: BookOpen, color: 'text-primary' },
  { id: 'social', label: 'Group Watch', desc: 'Perfect for sharing.', icon: Users, color: 'text-primary' },
]

export default function IntentSelection() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <motion.section
      className="w-full py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
            Step 02
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic">
            Select your <span className="opacity-50">Goal.</span>
          </h2>
          <p className="text-muted-foreground text-lg italic">
            What kind of experience are you in the mood for?
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={staggerContainer}
        >
          {intents.map((intent) => {
            const Icon = intent.icon
            const isSelected = selected === intent.id
            
            return (
              <motion.button
                key={intent.id}
                variants={staggerItem}
                onClick={() => setSelected(intent.id)}
                className={`relative group p-8 rounded-[2rem] border text-left transition-all duration-500 overflow-hidden ${
                  isSelected
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-primary/2 border-primary/5 hover:border-primary/10'
                }`}
              >
                {/* Background Beam Effect for Selected */}
                {isSelected && (
                  <motion.div
                    layoutId="intent-beam"
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
                  />
                )}

                <div className={`w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                  <Icon className={`w-6 h-6 ${intent.color}`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-foreground' : 'text-foreground/60'}`}>
                  {intent.label}
                </h3>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter leading-relaxed">
                  {intent.desc}
                </p>

                {/* Animated Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary/40"
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
