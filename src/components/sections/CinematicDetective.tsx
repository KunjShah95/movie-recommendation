import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, Send, User, Bot, Film } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SuggestedMovie {
  id: number
  title: string
  poster: string | null
  year: string | null
}

export default function CinematicDetective() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Greeting, seeker of stories. I am your Cinematic Archivist. Which film or series shall we dissect today? Or perhaps you seek a path into the unknown?' }
  ])
  const [loading, setLoading] = useState(false)
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: { platform: 'web', mode: 'cinematic_detective' }
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, data.message])
        if (data.suggested_movies?.length > 0) {
          setSuggestedMovies(prev => [...data.suggested_movies, ...prev].slice(0, 3))
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "The archives are momentarily veiled in fog. Please try speaking again." }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our connection to the cinematic mind has been severed. Check your signal." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      id="detective"
      className="w-full py-32 px-6 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <div className="absolute top-12 left-0 font-mono text-[10px] text-primary/40 tracking-[0.4em] uppercase">
        COGNITIVE_ANALYSIS
      </div>

      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Context Area */}
        <div className="lg:col-span-5 space-y-8">
           <motion.div variants={fadeInUp} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
                Step 05 [AI]
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic leading-none">
                Speak to the <span className="text-primary italic-none">Archivist.</span>
              </h2>
              <p className="text-muted-foreground text-xl italic max-w-xl">
                Our AI model can extract granular emotional data from your natural language. Describe anything.
              </p>
            </motion.div>

            <div className="space-y-6">
              <div className="p-1 rounded-[2.5rem] bg-foreground/[0.01] border border-foreground/5 overflow-hidden">
                  <div className="p-8 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Film className="w-5 h-5 text-primary/60" />
                      </div>
                      <h3 className="text-sm font-bold font-mono uppercase tracking-[0.3em] text-foreground/40">Scanned_Profiles</h3>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {suggestedMovies.length > 0 ? (
                          suggestedMovies.map((movie) => (
                            <motion.div
                              key={movie.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="group relative h-24 rounded-2xl border border-foreground/5 bg-foreground/[0.02] overflow-hidden flex cursor-pointer hover:border-primary/40 transition-all duration-500"
                            >
                              {movie.poster && (
                                <img src={movie.poster} alt={movie.title} className="w-16 h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              )}
                              <div className="p-4 flex flex-col justify-center">
                                <span className="text-sm font-bold italic line-clamp-1">{movie.title}</span>
                                <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">{movie.year || 'TBA'}</span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="py-12 text-center space-y-4 opacity-20 border border-dashed border-foreground/10 rounded-2xl">
                            <Search className="w-10 h-10 mx-auto stroke-1" />
                            <p className="text-[10px] font-mono uppercase tracking-[0.4em]">Awaiting_Semantic_Input</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
              </div>
              
              <div className="px-8 py-4 rounded-full bg-primary/5 border border-primary/10 flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-md rounded-full animate-pulse" />
                    <Bot className="w-5 h-5 text-primary relative" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/80">Archivist ACTIVE_SESSION</span>
              </div>
            </div>
        </div>
        
        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-7 flex flex-col h-[500px] md:h-[700px] rounded-[3rem] bg-foreground/[0.01] border border-foreground/5 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 mesh-bg opacity-10 pointer-events-none" />
          
          <div className="p-8 border-b border-foreground/5 bg-background/50 backdrop-blur-md flex items-center justify-between relative z-10">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold italic">Cinematic Detective</div>
                  <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest leading-none mt-0.5">Neural_Interface_v4.2</div>
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none relative z-10">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-500 scale-100 group-hover:scale-110 ${
                    msg.role === 'user' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-foreground/5 border-foreground/10 text-foreground/40'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[85%] px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground font-medium rounded-tr-none' 
                      : 'bg-background/80 border border-foreground/5 text-foreground/80 italic rounded-tl-none backdrop-blur-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-foreground/5 border border-foreground/10 text-foreground/40">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex gap-1.5 items-center px-6 py-4 bg-background/50 rounded-[1.5rem] border border-foreground/5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-8 bg-background/50 backdrop-blur-md border-t border-foreground/5 relative z-10">
            <motion.form 
              onSubmit={handleSend}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-primary/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Dissect a feeling or ask for a path..."
                className="relative z-10 h-16 pl-8 pr-20 rounded-2xl bg-foreground/[0.03] border-foreground/10 focus-visible:border-primary/30 transition-all text-sm italic placeholder:text-foreground/10 shadow-inner"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 z-20 rounded-xl w-12 h-12 p-0 bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <Send className="w-5 h-5" />
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
