export interface StreamingPlatform {
  name: string;
  icon: string;
  url: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  backdrop?: string;
  emotionalTag: string;
  emotionalArc: string;
  type: string;
  trailerUrl?: string;
  streamingPlatforms?: StreamingPlatform[];
  reasons: string[];
  reasoning: string;
}

export interface RecommendationContextType {
  mood: string;
  setMood: (mood: string) => void;
  intent: string;
  setIntent: (intent: string) => void;
  context: Record<string, string | number | boolean>;
  updateContext: (key: string, value: string | number | boolean) => void;
  personality: string;
  setPersonality: (personality: string) => void;
  recommendations: Movie[];
  setRecommendations: (recs: Movie[]) => void;
  explanation: string;
  setExplanation: (explanation: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
