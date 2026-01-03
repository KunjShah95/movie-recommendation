import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap, ChevronRight } from 'lucide-react'

export default function RecommendCTA() {
  const navigate = useNavigate()

  const handleRecommend = () => {
    navigate('/recommendations')
  }

  return (
    <motion.section
      className="w-full py-24 px-6 mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="relative inline-block group">
          <Button
            size="lg"
            onClick={handleRecommend}
            className="relative h-20 px-12 rounded-[2rem] text-2xl font-bold gap-4 bg-primary text-primary-foreground hover:bg-primary/90 italic active:scale-95 transition-all beam-border"
          >
            GET RECOMMENDATIONS
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-3 h-3 text-primary/60" />
            <span className="text-[10px] font-bold text-primary/60 uppercase font-mono tracking-widest">Preferences Saved</span>
          </div>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-tighter italic">
            Scanning cinematic archives for your perfect match.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
