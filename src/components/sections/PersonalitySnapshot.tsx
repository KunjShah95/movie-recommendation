import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { staggerContainer } from '@/lib/animations'
import { ChevronDown, ChevronUp, Brain, Radio } from 'lucide-react'

export default function PersonalitySnapshot() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [pace, setPace] = useState([50])
  const [ending, setEnding] = useState([50])
  const [familiarity, setFamiliarity] = useState([50])

  return (
    <motion.section
      className="w-full py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden bg-foreground/[0.02] border-foreground/5 rounded-[2.5rem] relative">
          <div
            className="p-10 cursor-pointer flex items-center justify-between hover:bg-foreground/[0.04] transition-all group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-primary/60" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.2em]">Step 04</div>
                <h3 className="text-3xl font-bold tracking-tight italic">Refine <span className="opacity-50">Preferences.</span></h3>
                <p className="text-sm text-muted-foreground italic">Fine-tune your results (Optional)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Radio className="w-3 h-3 text-primary/60 animate-pulse" />
                <span className="text-[10px] font-bold text-primary/60 uppercase font-mono">OPTIONAL_REFINEMENT</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-foreground/20" />
              ) : (
                <ChevronDown className="w-6 h-6 text-foreground/20" />
              )}
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-10 pt-0 space-y-12 border-t border-foreground/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
                {/* Pace */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/40">Story Pacing</label>
                    <span className="text-sm font-mono text-primary italic">
                      {pace[0] < 33 ? 'Slow Burn' : pace[0] < 67 ? 'Balanced' : 'Fast Paced'}
                    </span>
                  </div>
                  <Slider value={pace} onValueChange={setPace} min={0} max={100} step={1} className="py-4" />
                  <div className="flex justify-between font-mono text-[10px] text-foreground/20 italic">
                    <span>STEADY</span>
                    <span>DYNAMIC</span>
                  </div>
                </div>

                {/* Ending */}
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/40">Ending Tone</label>
                    <span className="text-sm font-mono text-primary italic">
                      {ending[0] < 33 ? 'Happy' : ending[0] < 67 ? 'Neutral' : 'Somber'}
                    </span>
                  </div>
                  <Slider value={ending} onValueChange={setEnding} min={0} max={100} step={1} className="py-4" />
                  <div className="flex justify-between font-mono text-[10px] text-foreground/20 italic">
                    <span>LIGHT</span>
                    <span>DARK</span>
                  </div>
                </div>

                {/* Familiarity */}
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/40">Novelty</label>
                    <span className="text-sm font-mono text-primary italic">
                      {familiarity[0] < 50 ? 'Classic' : 'Experimental'}
                    </span>
                  </div>
                  <Slider
                    value={familiarity}
                    onValueChange={setFamiliarity}
                    min={0}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-foreground/20 italic">
                    <span>FAMILIAR</span>
                    <span>NEW</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                <p className="text-xs font-mono text-primary/80 uppercase tracking-widest">Preferences will be applied to your final recommendation report.</p>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </motion.section>
  )
}
