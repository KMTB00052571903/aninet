export interface Anime {
  mal_id: number;
  title: string;
  type?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  episodes: number;
  synopsis: string;
  genres: Array<{
    name: string;
  }>;
  // Otras propiedades 
  aired?: {
    from?: string;
  };
  rating?: string;
  source?: string;
  status?: string;
}

export interface AppState {
  currentPage: string;
  posts: any[];
  profile: any;
  animeList: Anime[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

export type DispatchAction = {
  type: string;
  payload?: any;
};