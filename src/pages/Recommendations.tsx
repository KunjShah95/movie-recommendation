import SummaryBanner from '@/components/sections/SummaryBanner'
import MovieCard from '@/components/MovieCard'
import { motion } from 'framer-motion'

// Mock data - in a real app, this would come from an API
const mockMovies = [
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=1200&fit=crop',
    emotionalTag: 'Resilience',
    emotionalArc: 'Begins with despair and isolation, gradually builds hope through friendship, culminates in triumphant freedom and redemption.',
    reasons: [
      'Matches your preference for thoughtful, slow-burn storytelling',
      'Features strong themes of resilience and hope',
      'Perfect for solo viewing with full attention',
      'Runtime fits your available time window',
    ],
  },
  {
    title: 'Eternal Sunshine',
    year: 2004,
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop',
    emotionalTag: 'Introspective',
    emotionalArc: 'Explores the complexity of memories and relationships through a non-linear emotional journey that balances heartbreak with beauty.',
    reasons: [
      'Offers profound insights into human relationships',
      'Unique narrative structure rewards focused viewing',
      'Emotional depth aligns with your introspective state',
      'Leaves you with meaningful questions to contemplate',
    ],
  },
  {
    title: 'Inception',
    year: 2010,
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&h=1200&fit=crop',
    emotionalTag: 'Intellectual',
    emotionalArc: 'A high-stakes descent into the subconscious that challenges reality and emotional anchoring.',
    reasons: [
      'Complexity matches your desire for intellectual stimulation',
      'Atmospheric intensity provides total immersion',
      'Visual storytelling pushes the boundaries of perception',
      'Thematic depth encourages post-viewing analysis',
    ],
  },
]

export default function Recommendations() {
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
            {mockMovies.map((movie, index) => (
              <MovieCard
                key={movie.title}
                {...movie}
                delay={index * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
