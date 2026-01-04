import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

import { useRecommendation } from '@/context/RecommendationContext'

export default function RecommendCTA() {
  const navigate = useNavigate()
  const { mood, intent, context, personality, setRecommendations, setExplanation, setLoading } = useRecommendation()

  const handleRecommend = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/v1/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, intent, context, personality }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations)
        setExplanation(data.explanation)
        navigate('/recommendations')
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
    } finally {
      setLoading(false)
    }
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
            className="relative h-20 px-12 rounded-[2rem] text-2xl font-bold gap-4 bg-primary text-primary-foreground hover:bg-primary/90 italic active:scale-95 transition-all beam-border disabled:opacity-50"
          >
            GET RECOMMENDATIONS
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* ... existing footer text ... */}
      </div>
    </motion.section>
  )
}

