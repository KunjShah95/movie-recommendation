import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Clock, Smartphone, User, Users as UsersIcon, Zap } from 'lucide-react'
import { useRecommendation } from '@/context/RecommendationContext'

export default function ContextAwareness() {
  const { context: globalContext, updateContext } = useRecommendation()
  
  const [isAlone, setIsAlone] = useState(() => (globalContext.isAlone ?? true) as boolean)
  const [availableTime, setAvailableTime] = useState(() => [(globalContext.max_runtime ?? 120) as number])
  
  // Sync local state to global context when it changes
  useEffect(() => {
    updateContext('isAlone', isAlone)
  }, [isAlone, updateContext])

  useEffect(() => {
    updateContext('max_runtime', availableTime[0])
  }, [availableTime, updateContext])

  const timeOfDay = (() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    if (hour < 21) return 'Evening'
    return 'Night'
  })()

  return (
    <motion.section
      className="w-full py-32 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        CONTEXT_CALIBRATION
      </div>

      <div className="max-w-7xl space-y-16">
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
            Step 03
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-none">
            Refine <span className="text-primary italic-none">Context.</span>
          </h2>
          <p className="text-muted-foreground text-xl italic max-w-xl">
            Synchronize the recommendation engine with your current environment.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Auto-detected context */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.01] border-foreground/5 p-10 rounded-[3rem] space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-widest">Live_Sync</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                    <Zap className="w-6 h-6 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold italic tracking-tight">Auto-Pulse</h3>
                </div>
              </div>

              <div className="space-y-4 font-mono text-[10px] italic">
                <div className="flex justify-between p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 items-center">
                  <span className="text-foreground/30 uppercase tracking-widest">TIME_WINDOW:</span>
                  <span className="text-primary font-bold">{timeOfDay.toUpperCase()}</span>
                </div>
                <div className="flex justify-between p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 items-center">
                  <span className="text-foreground/30 uppercase tracking-widest">DEVICE_NODE:</span>
                  <span className="text-primary font-bold flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5" />
                    DESKTOP_ENV
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Viewing preference */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.01] border-foreground/5 p-10 rounded-[3rem] space-y-10 relative overflow-hidden group">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                    {isAlone ? <User className="w-6 h-6 text-primary/60" /> : <UsersIcon className="w-6 h-6 text-primary/60" />}
                  </div>
                  <h3 className="text-xl font-bold italic tracking-tight">{isAlone ? 'Solo Node' : 'Ensemble'}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/[0.03] border border-foreground/5">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">{isAlone ? 'Solo Watch' : 'Group Session'}</span>
                <Switch 
                  checked={!isAlone} 
                  onCheckedChange={(checked) => setIsAlone(!checked)} 
                  className="data-[state=checked]:bg-primary/40 data-[state=unchecked]:bg-foreground/10"
                />
              </div>

              <p className="text-[10px] font-mono text-foreground/20 uppercase leading-relaxed tracking-wider">
                Recalibrating semantic indexing for {isAlone ? 'singular focus' : 'collective engagement'}.
              </p>
            </Card>
          </motion.div>

          {/* Time available */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.01] border-foreground/5 p-10 rounded-[3rem] space-y-10 relative overflow-hidden group">
               <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                    <Clock className="w-6 h-6 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold italic tracking-tight">Temporal Limit</h3>
                </div>
              </div>

              <div className="px-2 pt-6 pb-2 space-y-6">
                <div className="text-4xl font-black italic font-mono text-foreground tracking-tighter">
                  {availableTime[0]}<span className="text-[0.4em] ml-1 text-primary italic-none font-bold">MIN</span>
                </div>
                <Slider
                  value={availableTime}
                  onValueChange={setAvailableTime}
                  min={60}
                  max={240}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between font-mono text-[9px] text-foreground/20 italic uppercase tracking-[0.2em]">
                <span>T-Min: 60M</span>
                <span>T-Max: 240M</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
