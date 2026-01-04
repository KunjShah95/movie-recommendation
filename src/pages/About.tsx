import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, Zap } from 'lucide-react'

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/2 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">About CinePulse</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Curating Cinematic
              <br />
              <span className="opacity-50 italic">Experiences.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the future of film discovery through contextual intelligence that understands the nuances of cinema.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { value: '10M+', label: 'Films Indexed' },
              { value: '99%', label: 'Curation Rate' },
              { value: '<1s', label: 'Match Time' },
              { value: '50K+', label: 'Active Viewers' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                   {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="opacity-50 italic">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                We believe that finding the perfect film shouldn't be a chore. Traditional algorithms rely on metadata and high-level genres, missing the profound emotional context of cinema.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CinePulse leverages sophisticated mapping to understand not just what you like, but the specific atmosphere you need. We're creating a more intuitive way to discover cinema.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full" />
              <Heart className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Human-Centric Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform doesn't just process data—it interprets the emotional arc of every film. Every match is grounded in the reality of your current state.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Privacy Focus',
                description: 'Your viewing habits and emotional data are yours. We use locally-weighted processing to ensure your preferences stay private.'
              },
              {
                title: 'Explainable Curation',
                description: 'Every recommendation comes with a thematic report. You\'ll always understand the connection between your mood and our selection.'
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-8 rounded-[2rem] bg-primary/2 border border-primary/10 hover:bg-primary/5 transition-colors group"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary/40 mt-2 group-hover:scale-150 transition-transform" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">
              Experience the
              <br />
              <span className="opacity-50">Future of Cinema.</span>
            </h2>
            <button
              onClick={() => navigate('/discovery')}
              className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-opacity text-lg tracking-widest uppercase beam-border"
            >
              Start Discovery
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
