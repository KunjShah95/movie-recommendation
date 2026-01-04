import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { staggerContainer } from '@/lib/animations'
import { ChevronDown, ChevronUp, Brain, Radio } from 'lucide-react'
import { useRecommendation } from '@/context/RecommendationContext'

export default function PersonalitySnapshot() {
  const { setPersonality } = useRecommendation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [pace, setPace] = useState([50])
  const [ending, setEnding] = useState([50])
  const [familiarity, setFamiliarity] = useState([50])

  useEffect(() => {
    const paceLabel = pace[0] < 33 ? 'Slow Burn' : pace[0] < 67 ? 'Balanced' : 'Fast Paced'
    const endingLabel = ending[0] < 33 ? 'Happy' : ending[0] < 67 ? 'Neutral' : 'Somber'
    const familiarityLabel = familiarity[0] < 50 ? 'Classic' : 'Experimental'
    
    setPersonality(`Pace: ${paceLabel}, Ending: ${endingLabel}, Novelty: ${familiarityLabel}`)
  }, [pace, ending, familiarity, setPersonality])

  return (
    <motion.section
      className="w-full py-32 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        04 // PREFERENCE_CALIBRATION
      </div>

      <div className="max-w-7xl">
        <Card className="overflow-hidden bg-foreground/[0.01] border-foreground/5 rounded-[3rem] relative transition-all duration-500 hover:border-primary/5 shadow-2xl shadow-black/20">
          <div
            className="p-12 cursor-pointer flex items-center justify-between hover:bg-foreground/[0.02] transition-all group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-all duration-500 relative">
                <Brain className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
                    Step 04
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10">
                    <Radio className="w-3 h-3 text-foreground/40 animate-pulse" />
                    <span className="text-[10px] font-bold text-foreground/40 uppercase font-mono tracking-widest">OPTIONAL_REFINEMENT</span>
                  </div>
                </div>
                <h3 className="text-4xl font-bold tracking-tighter italic leading-none">
                  Refine <span className="text-primary italic-none">Preferences.</span>
                </h3>
                <p className="text-muted-foreground text-lg italic opacity-60">Fine-tune the recommendation engine's parameters.</p>
              </div>
            </div>
            
            <div className="w-16 h-16 rounded-full bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-foreground/40 group-hover:text-primary transition-colors" />
              ) : (
                <ChevronDown className="w-8 h-8 text-foreground/40 group-hover:text-primary transition-colors" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-12 pt-0 space-y-16 border-t border-foreground/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-16">
                  {/* Pace */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-foreground/30">Temporal Pulse</label>
                        <div className="text-xl font-bold italic tracking-tight">Story Pacing</div>
                      </div>
                      <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-lg">
                        {pace[0] < 33 ? 'Slow Burn' : pace[0] < 67 ? 'Balanced' : 'Fast Paced'}
                      </span>
                    </div>
                    <Slider value={pace} onValueChange={setPace} min={0} max={100} step={1} className="py-2" />
                    <div className="flex justify-between font-mono text-[9px] text-foreground/20 italic uppercase tracking-[0.3em]">
                      <span>STEADY_ENV</span>
                      <span>DYNAMIC_ARC</span>
                    </div>
                  </div>

                  {/* Ending */}
                  <div className="space-y-8">
                     <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-foreground/30">Tonal Resolution</label>
                        <div className="text-xl font-bold italic tracking-tight">Outcome Bias</div>
                      </div>
                      <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-lg">
                        {ending[0] < 33 ? 'Euphoric' : ending[0] < 67 ? 'Ambivalent' : 'Somber'}
                      </span>
                    </div>
                    <Slider value={ending} onValueChange={setEnding} min={0} max={100} step={1} className="py-2" />
                    <div className="flex justify-between font-mono text-[9px] text-foreground/20 italic uppercase tracking-[0.3em]">
                      <span>LIGHT_MAX</span>
                      <span>DARK_ZENITH</span>
                    </div>
                  </div>

                  {/* Familiarity */}
                  <div className="space-y-8">
                     <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-foreground/30">Semantic Novelty</label>
                        <div className="text-xl font-bold italic tracking-tight">Discovery Mod</div>
                      </div>
                      <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-lg">
                        {familiarity[0] < 50 ? 'Established' : 'Experimental'}
                      </span>
                    </div>
                    <Slider value={familiarity} onValueChange={setFamiliarity} min={0} max={100} step={1} className="py-2" />
                    <div className="flex justify-between font-mono text-[9px] text-foreground/20 italic uppercase tracking-[0.3em]">
                      <span>FAMILIAR_NODE</span>
                      <span>NEW_FRONTIER</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.4em] relative z-10">
                    Calibration successful. Indices mapping to final curation report.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </motion.section>
  )
}
