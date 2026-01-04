import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  Zap, 
  Cloud, 
  Target,
  Shield,
} from 'lucide-react'

export default function Features() {
  const navigate = useNavigate()
  const capabilities = [
    {
      icon: Cloud,
      title: 'Contextual Calibration',
      description: 'Understanding the physical and temporal environment of your viewing session.',
      details: [
        'Time-weighted suggestions',
        'Device-optimized curation',
        'Social context awareness',
        'Atmospheric matching'
      ]
    },
    {
      icon: Brain,
      title: 'Thematic Mapping',
      description: 'Deep analysis of narrative structures and emotional arcs within cinema.',
      details: [
        'Emotional trajectory mapping',
        'Genre crossover analysis',
        'Dialogue sentiment tracking',
        'Pacing synchronization'
      ]
    },
    {
      icon: Target,
      title: 'Intent Discovery',
      description: 'Differentiating between passive entertainment and active intellectual engagement.',
      details: [
        'Goal-oriented discovery',
        'Cognitive load adjustment',
        'Mood-intent alignment',
        'Behavioral preference loops'
      ]
    },
    {
      icon: Shield,
      title: 'Privacy Persistence',
      description: 'Ensuring your viewing habits and emotional data remain locally encrypted.',
      details: [
        'End-to-end encryption',
        'Local preference weights',
        'Anonymized discovery',
        'Zero-tracking architecture'
      ]
    }
  ]

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">System Capabilities</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Precision Curation.
              <br />
              <span className="opacity-50 italic">Engineered for Cinema.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              Advanced thematic analysis meets human-centric discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="relative py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {capabilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[3rem] bg-foreground/[0.01] border border-foreground/5 hover:bg-foreground/[0.02] transition-colors group"
              >
                <div className="flex flex-col gap-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-primary/60" />
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-4 italic">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-mono tracking-tighter uppercase opacity-60">
                      {item.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {item.details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-primary/40 font-mono uppercase tracking-[0.1em]">
                          <div className="w-1 h-1 rounded-full bg-primary/40" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Section / Pricing */}
      <section className="relative py-32 px-8 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold italic mb-6">Access <span className="opacity-50">Models.</span></h2>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-bold">Select your level of integration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-12 rounded-[3.5rem] bg-primary/2 border border-primary/10 hover:bg-primary/5 transition-colors group">
              <h3 className="text-2xl font-bold mb-2 italic">Standard</h3>
              <p className="text-primary/40 text-sm mb-8 uppercase tracking-widest font-bold">Public discovery engine</p>
              <div className="text-5xl font-bold mb-12 italic tracking-tighter text-primary">$0<span className="text-sm opacity-40 font-normal ml-2 text-foreground">/mo</span></div>
              <ul className="space-y-4 mb-12">
                {['Thematic Mapping', 'Contextual Calibration', 'Global Archive Access'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm italic text-foreground/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors font-bold uppercase tracking-widest text-[10px] text-primary">Initialize</button>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-primary text-black group relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 italic">Professional</h3>
                <p className="text-black/40 text-sm mb-8 uppercase tracking-widest font-bold">Full system integration</p>
                <div className="text-5xl font-bold mb-12 italic tracking-tighter">$19<span className="text-sm opacity-40 font-normal ml-2">/mo</span></div>
                <ul className="space-y-4 mb-12">
                  {['Advanced Psychometrics', 'Zero-Latency Processing', 'Persistent Personalization', 'Priority Execution'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm italic font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl bg-black text-white font-bold uppercase tracking-widest text-[10px] active:scale-95">Upgrade</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Summary Section */}
      <section className="relative py-32 px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[4rem] glass border border-foreground/10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-foreground/[0.01] pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">
              Beyond the <span className="opacity-50">Algorithm.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 italic max-w-2xl mx-auto">
              CinePulse isn't just a recommendation engine. It's an interface between human emotion and the art of cinema.
            </p>
            <button
              onClick={() => navigate('/discovery')}
              className="px-16 py-6 bg-primary text-black rounded-[2rem] font-bold hover:bg-primary/90 transition-all text-xl tracking-widest uppercase active:scale-95 beam-border"
            >
              Initialize Discovery
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
