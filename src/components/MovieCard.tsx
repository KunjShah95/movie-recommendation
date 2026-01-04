import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icon } from '@iconify/react'
import { scaleIn } from '@/lib/animations'
import { Star, Play, Info, Bookmark, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import DNAVisualizer from './DNAVisualizer'

interface StreamingPlatform {
  name: string
  icon: string
  url: string
}

interface MovieCardProps {
  id: number
  title: string
  year: number
  poster: string
  backdrop?: string
  emotionalTag: string
  reasons: string[]
  reasoning: string
  type: string
  trailerUrl?: string
  streamingPlatforms?: StreamingPlatform[]
  alignmentScores?: Record<string, number>
  delay?: number
}

export default function MovieCard({
  id,
  title,
  year,
  poster,
  backdrop,
  emotionalTag,
  reasons,
  reasoning,
  type,
  trailerUrl,
  streamingPlatforms = [],
  alignmentScores,
  delay = 0,
}: MovieCardProps) {
  const { token, isAuthenticated } = useAuth()
  
  const [isWatchlisted, setIsWatchlisted] = useState(() => {
    if (typeof window === 'undefined') return false
    const watchlist = JSON.parse(localStorage.getItem('cinepulse_watchlist') || '[]')
    return watchlist.includes(id)
  })



  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Optimistic UI
    const newState = !isWatchlisted
    setIsWatchlisted(newState)
    
    // Update local storage for immediate persistence/guest use
    const watchlist = JSON.parse(localStorage.getItem('cinepulse_watchlist') || '[]')
    let newWatchlist
    if (isWatchlisted) {
      newWatchlist = watchlist.filter((mid: number) => mid !== id)
    } else {
      newWatchlist = [...watchlist, id]
    }
    localStorage.setItem('cinepulse_watchlist', JSON.stringify(newWatchlist))

    // Backend sync if authenticated
    if (isAuthenticated && token) {
      try {
        const method = newState ? 'POST' : 'DELETE'
        await fetch(`http://localhost:8000/api/v1/watchlist/${id}`, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Failed to sync watchlist:', error)
      }
    }
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={scaleIn}
      transition={{ delay }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-card border-foreground/5 rounded-[2rem] aspect-[2/3] transition-all duration-500 hover:border-foreground/20">
        {/* Poster & Backdrop Overlay */}
        <div className="absolute inset-0">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full h-full object-cover transition-property-[opacity,transform] duration-700 group-hover:opacity-0 group-hover:scale-110"
            loading="lazy"
          />
          {backdrop && (
            <img
              src={backdrop}
              alt={`${title} backdrop`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500" />
        </div>

        {/* Top Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
           <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
            {type}
          </Badge>
          <button 
            onClick={toggleWatchlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
              isWatchlisted ? 'bg-primary text-primary-foreground' : 'bg-black/20 backdrop-blur-xl text-white hover:bg-white/20'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
          <div className="space-y-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <div className="flex items-center gap-2">
               <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none px-3 py-0.5 font-mono text-[9px] tracking-[0.2em] uppercase">
                {emotionalTag}
              </Badge>
               {streamingPlatforms.length > 0 && (
                <div className="flex gap-1.5 ml-2 translate-y-[-1px]">
                  {streamingPlatforms.slice(0, 3).map((p, i) => (
                    <a key={i} href={p.url} target="_blank" rel="noreferrer" className="group/p">
                      <img src={p.icon} alt={p.name} className="w-4 h-4 rounded-md filter grayscale group-hover/p:grayscale-0 transition-all border border-white/10" />
                    </a>
                  ))}
                </div>
              )}
             </div>
            <h3 className="text-3xl font-bold tracking-tighter text-white italic leading-none">{title}</h3>
            <div className="flex items-center gap-3 text-white/60 text-[10px] font-mono tracking-widest uppercase">
              <span>{year}</span>
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span>9.2</span>
              </div>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger className="text-primary/80 hover:text-primary hover:no-underline py-2 text-[10px] font-bold uppercase tracking-[0.2em] gap-2">
                  <Info className="w-3 h-3" />
                  AI Logic
                </AccordionTrigger>
                 <AccordionContent className="bg-black/60 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                  <div className="space-y-6">
                    <div className="space-y-4">
                       <p className="text-[11px] text-white/90 italic leading-relaxed font-light">
                        &ldquo;{reasoning}&rdquo;
                      </p>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[9px] text-primary/60 uppercase tracking-widest mb-3 font-bold">Resonance Profile:</p>
                        <ul className="space-y-2 ml-1">
                          {reasons.slice(0, 3).map((reason, index) => (
                            <li key={index} className="flex items-start gap-2 text-[9px] text-white/60 uppercase leading-tight">
                              <div className="w-1 h-1 rounded-full bg-primary/60 mt-1" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {alignmentScores && (
                      <div className="pt-4 border-t border-white/5">
                        <DNAVisualizer scores={alignmentScores} />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex items-center gap-2 mt-1 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
             <button 
              onClick={() => id && window.open(streamingPlatforms[0]?.url || '#', '_blank')}
              className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-2xl shadow-primary/20 active:scale-95"
            >
              <Play className="w-3 h-3 fill-current" />
              {streamingPlatforms.length > 0 ? `Stream on ${streamingPlatforms[0].name}` : 'Stream Now'}
            </button>
            {trailerUrl && (
              <a 
                href={trailerUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Check out ${title} on CinePulse`,
                    text: reasoning,
                    url: window.location.href,
                  })
                }
              }}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            >
              <Icon icon="mdi:share-variant-outline" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
