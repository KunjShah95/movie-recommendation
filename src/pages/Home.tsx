import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, TrendingUp, Play, ChevronRight, Info, Sparkles, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden selection:bg-primary/20 font-outfit">
      {/* Architectural Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-foreground/[0.02]" />
        <div className="absolute left-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute right-1/4 h-full w-[1px] bg-foreground/[0.01]" />
        <div className="absolute inset-0 mesh-bg opacity-30" />
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/2 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="absolute top-12 left-6 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
              01 // CORE_SYSTEM
            </div>
            
            <div className="text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-primary/20 backdrop-blur-md"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-primary">Cinematic Intelligence v2.0</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] italic"
              >
                Cinematic <br />
                <span className="text-gradient">Discovery.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic opacity-80"
              >
                CinePulse utilizes sophisticated contextual mapping to align your emotional frequency with the global cinematic archives.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
              >
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-full text-lg font-bold italic gap-4 group bg-primary text-primary-foreground hover:bg-primary/95 beam-border shadow-2xl shadow-primary/20 active:scale-95 transition-all"
                  onClick={() => navigate('/discovery')}
                >
                  LAUNCH INTERFACE
                  <Sparkles className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-full text-lg font-bold italic border-foreground/10 hover:bg-foreground/5 backdrop-blur-sm active:scale-95 transition-all"
                  onClick={() => {
                    document.getElementById('mockup')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  VIEW SYSTEMS
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Display / "The Mockup" Section */}
        <section id="mockup" className="px-6 py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
              02 // INTERFACE_RENDER
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[3rem] border border-foreground/5 bg-card/20 backdrop-blur-3xl p-6 md:p-12 relative group shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="aspect-[16/9] rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 overflow-hidden relative flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50" />
                    <Play className="w-10 h-10 text-primary fill-primary/20 relative z-10 translate-x-1" />
                  </div>
                  <p className="font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">SYSTEM_PREVIEW</p>
                </div>
                
                {/* Float elements for tech aesthetic */}
                <div className="absolute top-12 left-12 p-5 rounded-2xl glass border-primary/10 hidden lg:block animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold italic">Neural Sync</div>
                      <div className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Active_98.2%</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 p-5 rounded-2xl glass border-primary/10 hidden lg:block animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold italic">Processing</div>
                      <div className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Global_Archive</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-32 relative">
          <div className="max-w-7xl mx-auto">
            <div className="absolute -top-12 left-6 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
              03 // CAPABILITIES
            </div>
            
            <div className="mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-none">
                Absolute <br /><span className="text-gradient">Precision.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl italic opacity-60 leading-relaxed font-medium">
                We've combined semantic behavioral mapping with curated metadata to create a discovery engine that understands the architecture of narrative resonance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: Sparkles,
                  title: 'Cognitive Mapping',
                  desc: 'Detects emotional nuance through intent-based discovery and deep psychometric alignment.',
                },
                {
                  icon: TrendingUp,
                  title: 'Semantic Context',
                  desc: 'Factors in environmental triggers, current vibe, and viewing intent for hyper-resonant curation.',
                },
                {
                  icon: Info,
                  title: 'Curation Logic',
                  desc: "Transparent AI. We provide the precise reasoning behind every selection based on your unique DNA.",
                }
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="p-10 rounded-[3rem] border border-foreground/5 bg-foreground/[0.01] hover:bg-primary/[0.02] transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                      <feat.icon className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 italic tracking-tight">{feat.title}</h3>
                    <p className="text-muted-foreground leading-relaxed italic opacity-70 font-medium">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-48 mb-20 text-center">
          <div className="max-w-5xl mx-auto rounded-[4rem] glass-dark border border-primary/10 p-16 md:p-32 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase mb-8">INIT_ENGINE_HANDOFF</div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 italic leading-[0.9]">
                Experience <br /><span className="text-gradient">Resonance.</span>
              </h2>
              <Button
                size="lg"
                className="h-24 px-16 rounded-full text-2xl font-black italic gap-6 group bg-primary text-primary-foreground hover:bg-primary/95 shadow-2xl shadow-primary/30 active:scale-95 transition-all beam-border uppercase tracking-widest"
                onClick={() => navigate('/discovery')}
              >
                Launch Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/5 py-20 px-6 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Cpu className="w-4 h-4 text-primary" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase">CinePulse</span>
              </Link>
              <p className="text-muted-foreground max-w-sm italic opacity-60 leading-relaxed text-sm">
                The absolute standard in AI-driven cinematic discovery. Precision-matched to the human experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-10">
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.4em]">Navigation</h4>
                <div className="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 italic">
                  <Link to="/discovery" className="hover:text-primary transition-colors">Interface</Link>
                  <Link to="/features" className="hover:text-primary transition-colors">Systems</Link>
                  <Link to="/about" className="hover:text-primary transition-colors">Archive</Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.4em]">Connect</h4>
                <div className="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 italic">
                  <Link to="/contact" className="hover:text-primary transition-colors">Station</Link>
                  <a href="#" className="hover:text-primary transition-colors">X_Archive</a>
                  <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-foreground/5">
            <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.4em]">© 2026 CinePulse_Systems // All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] font-mono text-foreground/20 uppercase tracking-[0.4em]">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
