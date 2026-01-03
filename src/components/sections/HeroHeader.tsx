import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Cpu, Globe, Users } from 'lucide-react'

export default function HeroHeader() {
  const stats = [
    { value: '10K+', label: 'Personalized Journeys', icon: Users, color: 'text-primary' },
    { value: '150+', label: 'Film Genres', icon: Globe, color: 'text-primary/60' },
    { value: '0.2s', label: 'Response Time', icon: Cpu, color: 'text-primary/40' }
  ]

  return (
    <section className="relative w-full py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-foreground/5 pb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
              [ Curation Interface ]
            </motion.div>
            <motion.h1 
              variants={fadeInUp} 
              className="text-4xl md:text-7xl font-bold tracking-tighter leading-none mb-6 italic"
            >
              The Science of <br />
              <span className="text-gradient">Human Discovery.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed italic"
            >
              Calibrate your preferences to discover the perfect cinematic match. Our discovery engine analyzes your mood to provide a curated film report.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:block text-right"
          >
            <div className="text-xs font-mono text-primary/40 uppercase tracking-[0.3em] mb-2 font-bold">System Status</div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
              <span className="text-sm font-bold text-primary/60 tracking-wider">INTERFACE ACTIVE</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-8 rounded-[2rem] glass border-foreground/5 hover:bg-foreground/[0.05] transition-all group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity bg-primary`} />
              
              <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              
              <div className="text-4xl font-bold tracking-tighter mb-2 italic">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
