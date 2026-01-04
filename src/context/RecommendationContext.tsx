import { createContext, useContext } from 'react';
import type { RecommendationContextType } from '@/types/recommendation';

export const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export function useRecommendation() {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
}
