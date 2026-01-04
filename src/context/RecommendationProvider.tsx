import { useState, type ReactNode } from 'react';
import { RecommendationContext } from './RecommendationContext';
import type { Movie } from '@/types/recommendation';

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState('');
  const [intent, setIntent] = useState('');
  const [context, setContext] = useState<Record<string, string | number | boolean>>({});
  const [personality, setPersonality] = useState('');
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const updateContext = (key: string, value: string | number | boolean) => {
    setContext(prev => ({ ...prev, [key]: value }));
  };

  return (
    <RecommendationContext.Provider
      value={{
        mood, setMood,
        intent, setIntent,
        context, updateContext,
        personality, setPersonality,
        recommendations, setRecommendations,
        explanation, setExplanation,
        loading, setLoading
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
}
