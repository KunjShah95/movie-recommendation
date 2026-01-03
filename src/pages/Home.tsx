import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Play, ChevronRight, Share2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/2 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 mb-8"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium tracking-wider uppercase text-primary/80">Cinematic Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-gradient"
            >
              Cinematic Discovery <br />
              <span className="opacity-50 italic">Redefined.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              CinePulse uses sophisticated contextual mapping to align your mood and personality with the perfect film. Stop searching, start watching.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg font-semibold gap-3 group bg-primary text-primary-foreground hover:bg-primary/90 beam-border"
                onClick={() => navigate('/discovery')}
              >
                <Play className="w-5 h-5 fill-current" />
                EXPLORE NOW
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg font-semibold border-foreground/10 hover:bg-foreground/5"
              >
                HOW IT WORKS
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Display / "The Mockup" Section */}
        <section className="px-6 py-20 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto rounded-[2.5rem] border border-foreground/10 bg-card/30 backdrop-blur-2xl p-4 md:p-8 relative group"
          >
            <div className="absolute inset-0 bg-primary/2 rounded-[2.5rem] group-hover:bg-primary/5 transition-colors pointer-events-none" />
            <div className="aspect-video rounded-[1.5rem] bg-foreground/5 border border-foreground/5 overflow-hidden relative flex items-center justify-center">
              {/* This would be an image or video in production */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 animate-pulse">
                  <Play className="w-8 h-8 text-primary/60 fill-primary/20 ml-1" />
                </div>
                <p className="text-sm font-medium text-primary/40 tracking-widest uppercase italic">Interface Preview</p>
              </div>
              
              {/* Floating UI Elements for aesthetic */}
              <div className="absolute top-8 left-8 p-4 rounded-xl glass border-primary/20 hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground italic">98% Match</div>
                    <div className="text-[10px] text-primary/60 uppercase tracking-tighter italic">Correlation</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-4 rounded-xl glass border-primary/20 hidden md:block animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground italic">Trending</div>
                    <div className="text-[10px] text-primary/60 uppercase tracking-tighter italic">System Pulse</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground italic">Engineered for <br /><span className="opacity-50 NOT-italic">Absolute Precision.</span></h2>
              <p className="text-muted-foreground text-lg max-w-xl italic opacity-60">We've combined behavioral mapping with curated film data to create a discovery engine that understands the nuances of cinema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Cognitive Mapping',
                  desc: 'Detects emotional nuance through intent-based discovery and psychometric profiling.',
                },
                {
                  icon: Share2,
                  title: 'Semantic Context',
                  desc: 'Factors in your environment, time of day, and viewing history for hyper-personalized results.',
                },
                {
                  icon: Info,
                  title: 'Curation Logic',
                  desc: "We don't just recommend; we tell you why a movie fits your current state with detailed insights.",
                }
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] border border-foreground/5 bg-primary/2 hover:bg-primary/5 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feat.icon className={`w-7 h-7 text-primary/60`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 italic">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed italic opacity-60 text-sm">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-32 mb-20 text-center">
          <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-foreground/[0.01] border border-foreground/5 p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-foreground/[0.01] group-hover:bg-foreground/[0.02] transition-colors" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12 italic">Experience <span className="opacity-50">Discovery.</span></h2>
              <Button
                size="lg"
                className="h-20 px-16 rounded-2xl text-xl font-bold gap-4 group bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase active:scale-95 beam-border"
                onClick={() => navigate('/discovery')}
              >
                Launch Interface
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/5 py-12 px-6 bg-background relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight italic text-foreground">CinePulse<span className="opacity-30">.com</span></span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Archive</a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">© 2026 CinePulse Studio.</p>
        </div>
      </footer>
    </div>
  )
}
