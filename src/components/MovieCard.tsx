import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { scaleIn } from '@/lib/animations'
import { Star, Play, Info } from 'lucide-react'

interface MovieCardProps {
  title: string
  year: number
  poster: string
  emotionalTag: string
  emotionalArc: string
  reasons: string[]
  delay?: number
}

export default function MovieCard({
  title,
  year,
  poster,
  emotionalTag,
  emotionalArc,
  reasons,
  delay = 0,
}: MovieCardProps) {
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
        {/* Poster Image */}
        <div className="absolute inset-0">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
              {emotionalTag}
            </Badge>
            <h3 className="text-3xl font-bold tracking-tighter text-white italic leading-none">{title}</h3>
            <div className="flex items-center gap-3 text-white/80 text-xs font-mono">
              <span>{year}</span>
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span>RATING: 9.2</span>
              </div>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger className="text-primary/80 hover:text-primary hover:no-underline py-2 text-xs font-bold uppercase tracking-[0.2em] gap-2">
                  <Info className="w-3 h-3" />
                  Curation Notes
                </AccordionTrigger>
                <AccordionContent className="bg-background/80 backdrop-blur-xl rounded-2xl p-4 border border-primary/20">
                  <div className="space-y-4">
                    <p className="text-xs text-foreground/80 italic leading-relaxed">
                      {emotionalArc}
                    </p>
                    <ul className="space-y-2">
                      {reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-[10px] text-primary/60 uppercase tracking-tighter">
                          <div className="w-1 h-1 rounded-full bg-primary/40 mt-1" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Play className="w-3 h-3 fill-current" />
              Watch Now
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
