import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Clock, Smartphone, User, Users as UsersIcon, Zap } from 'lucide-react'

import { useRecommendation } from '@/context/RecommendationContext'
import { useEffect } from 'react'

export default function ContextAwareness() {
  const { context: globalContext, updateContext } = useRecommendation()
  
  const [isAlone, setIsAlone] = useState(() => (globalContext.isAlone ?? true) as boolean)
  const [availableTime, setAvailableTime] = useState(() => [(globalContext.max_runtime ?? 120) as number])
  
  useEffect(() => {
    updateContext('isAlone', isAlone)
    updateContext('max_runtime', availableTime[0])
  }, [isAlone, availableTime, updateContext])

  const timeOfDay = (() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    if (hour < 21) return 'Evening'
    return 'Night'
  })

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
            Step 03
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic">
            Calibrate <span className="opacity-50">Context.</span>
          </h2>
          <p className="text-muted-foreground text-lg italic">
            Refine your discovery with environmental details.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Auto-detected context */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.02] border-foreground/5 p-8 rounded-[2rem] space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase font-mono">Synced</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Auto-Detection</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="text-xl font-bold italic">Context Filter</div>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs italic">
                <div className="flex justify-between p-3 rounded-xl bg-foreground/5 border border-foreground/5">
                  <span className="text-foreground/40">CURRENT_TIME:</span>
                  <span className="text-foreground">{timeOfDay()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-foreground/5 border border-foreground/5">
                  <span className="text-foreground/40">DEVICE_TYPE:</span>
                  <span className="text-foreground flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    DESKTOP
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Viewing preference */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.02] border-foreground/5 p-8 rounded-[2rem] space-y-8 relative overflow-hidden group">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Occupancy</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {isAlone ? <User className="w-5 h-5 text-primary/60" /> : <UsersIcon className="w-5 h-5 text-primary/60" />}
                  </div>
                  <div className="text-xl font-bold italic">{isAlone ? 'Solo Session' : 'Group Session'}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-foreground/5">
                <div className="text-sm font-medium text-foreground/50">{isAlone ? 'Watch Alone' : 'Group Session'}</div>
                <Switch 
                  checked={!isAlone} 
                  onCheckedChange={(checked: boolean) => setIsAlone(!checked)} 
                  className="data-[state=checked]:bg-primary/40"
                />
              </div>

              <p className="text-[10px] font-mono text-foreground/20 uppercase leading-relaxed">
                Optimizing results for group viewing sessions.
              </p>
            </Card>
          </motion.div>

          {/* Time available */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bg-foreground/[0.02] border-foreground/5 p-8 rounded-[2rem] space-y-8 relative overflow-hidden group">
               <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Preferred Duration</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="text-xl font-bold italic font-mono text-foreground">{availableTime[0]}m</div>
                </div>
              </div>

              <div className="px-2 pt-6">
                <Slider
                  value={availableTime}
                  onValueChange={setAvailableTime}
                  min={60}
                  max={240}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between font-mono text-[10px] text-foreground/20 italic">
                <span>MIN_60M</span>
                <span>MAX_240M</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
