import SummaryBanner from '@/components/sections/SummaryBanner'
import MovieCard from '@/components/MovieCard'
import { motion } from 'framer-motion'
import { useRecommendation } from '@/context/RecommendationContext'

export default function Recommendations() {
  const { recommendations, loading } = useRecommendation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-2xl font-mono italic animate-pulse">Consulting the cinematic archives...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden pb-40">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/2 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10">
        <SummaryBanner />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            {recommendations.length > 0 ? (
              recommendations.map((movie, index) => (
                <MovieCard
                  key={movie.title}
                  {...movie}
                  delay={index * 0.2}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground italic">No recommendations found yet. Try describing your mood in the Discovery section.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

