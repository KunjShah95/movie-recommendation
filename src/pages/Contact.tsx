import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Message received. Our curation team will review your inquiry.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const faqs = [
    {
      question: 'How does the recommendation system function?',
      answer: 'CinePulse utilizes a proprietary thematic mapping engine that analyzes the emotional arc, pacing, and narrative structure of films to match them with your current state.'
    },
    {
      question: 'Is my viewing experience private?',
      answer: 'Confidentiality is a core principle. Your viewing preferences and environmental data are encrypted and never distributed to third-party entities.'
    },
    {
      question: 'Can I use CinePulse without an account?',
      answer: 'Yes. Discovery is available to all users. Creating a profile simply allows the system to remember your long-term cinematic preferences.'
    },
    {
      question: 'How does this differ from traditional platforms?',
      answer: 'Most platforms rely on static metadata. CinePulse understands the atmospheric intent of cinema, providing matches based on the actual feeling of a film.'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">Inquiries</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Connect with
              <br />
              <span className="opacity-50 italic">CinePulse.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              For technical support, cinematic inquiries, or partnership discussions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-12 italic">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-foreground/40 focus:outline-none transition-colors text-foreground italic"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-foreground/40 focus:outline-none transition-colors text-foreground italic"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-foreground/40 focus:outline-none transition-colors text-foreground italic"
                    placeholder="Subject line"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-foreground/40 focus:outline-none transition-colors text-foreground min-h-[150px] resize-y italic"
                    placeholder="Enter message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-6 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-opacity flex items-center justify-center gap-3 tracking-[0.2em] uppercase beam-border"
                >
                  <Send className="w-4 h-4" />
                  Transmit
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 italic">Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 italic">
                  Our team typically responds to all inquiries within 24 working hours.
                </p>
              </div>

              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Mail className="w-5 h-5 text-primary/60" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Email</h3>
                    <a href="mailto:hello@cinepulse.com" className="text-lg font-bold italic hover:text-primary transition-colors">
                      hello@cinepulse.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <MessageSquare className="w-5 h-5 text-primary/60" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Social</h3>
                    <p className="text-lg font-bold italic">
                      @cinepulse_world
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-12 rounded-[2rem] bg-primary/5 border border-primary/10">
                <h3 className="font-bold mb-4 uppercase tracking-[0.2em] text-[10px] text-primary/60">Collaborations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  For exhibition, press, or collaborative opportunities, please contact our business director.
                </p>
                <a href="mailto:business@cinepulse.com" className="text-foreground hover:underline italic font-bold">
                  business@cinepulse.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">
              Common <span className="opacity-50">Inquiries.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 rounded-[2.5rem] bg-primary/2 border border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 italic text-primary/90">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12 italic">
              Still have <span className="opacity-50">Questions?</span>
            </h2>
            <button
              onClick={() => window.location.href = '/discovery'}
              className="px-12 py-5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-opacity text-lg tracking-widest uppercase active:scale-95 beam-border"
            >
              Consult the Engine
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
