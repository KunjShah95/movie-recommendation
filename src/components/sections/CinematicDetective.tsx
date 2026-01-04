import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, Send, User, Bot, Film } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import SEO from '@/components/SEO'

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
          // Merge unique movies or keep latest
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
      className="w-full py-16 md:py-24 px-4 md:px-6 border-y border-foreground/5 bg-foreground/[0.01] relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <SEO 
        title="Cinematic Detective | Chat with the Archivist"
        description="Speak with our AI Archivist to find movies that match your deepest emotional frequencies."
      />
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Chat Area */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 flex flex-col h-[500px] md:h-[600px]">
          <motion.div variants={fadeInUp} className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              Advanced AI Archivist
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter italic">
              Cinematic <span className="text-primary">Detective.</span>
            </h2>
          </motion.div>

          {/* Chat Bubble Container */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-foreground/5 hover:scrollbar-thumb-foreground/10 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
                    msg.role === 'user' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-foreground/5 border-foreground/10 text-foreground/40'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[85%] md:max-w-[80%] px-4 md:px-5 py-3 md:py-4 rounded-2xl md:rounded-3xl text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground font-medium rounded-tr-none' 
                      : 'bg-foreground/5 border border-foreground/5 text-foreground/80 italic rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-foreground/5 border border-foreground/10 text-foreground/40">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex gap-1 items-center px-4 py-3 bg-foreground/5 rounded-2xl">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <motion.form 
            variants={fadeInUp} 
            onSubmit={handleSend}
            className="relative group pt-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Tell me a feeling, a plot point, or a movie name..."
              className="h-14 pl-6 pr-16 rounded-2xl bg-foreground/5 border-foreground/10 focus:border-primary/50 transition-all text-sm italic shadow-2xl"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-1 top-[1.25rem] rounded-xl w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-primary-foreground active:scale-90 transition-transform"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.form>
        </div>

        {/* Right Column: Extracted Findings / Discovery */}
        <div className="space-y-6">
           <div className="p-1 rounded-2xl bg-foreground/5 border border-foreground/10">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Film className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">Scanned Profiles</h3>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {suggestedMovies.length > 0 ? (
                      suggestedMovies.map((movie) => (
                        <motion.div
                          key={movie.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group relative h-24 rounded-2xl border border-foreground/5 bg-foreground/5 overflow-hidden flex cursor-pointer hover:border-primary/40 transition-colors"
                        >
                          {movie.poster && (
                            <img src={movie.poster} alt={movie.title} className="w-16 h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          )}
                          <div className="p-3 flex flex-col justify-center">
                            <span className="text-xs font-bold italic line-clamp-1">{movie.title}</span>
                            <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{movie.year || 'TBA'}</span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="py-12 text-center space-y-2 opacity-20">
                        <Search className="w-8 h-8 mx-auto stroke-1" />
                        <p className="text-[10px] font-mono uppercase tracking-widest">Awaiting titles...</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-foreground/5">
                   <p className="text-[10px] italic text-foreground/40 leading-relaxed">
                    Mention a movie in the chat to see its profile automatically extracted and mapped here.
                   </p>
                </div>
              </div>
           </div>
           
           <div className="px-6 py-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-pulse" />
                <Bot className="w-4 h-4 text-primary relative" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-primary/80">Archivist is thinking in real-time</span>
           </div>
        </div>

      </div>
    </motion.section>
  )
}
