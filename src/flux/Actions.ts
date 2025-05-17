import { dispatcher } from './Dispatcher';
import { store } from './Store';
import { fetchTopAnime } from '../Services/api-service';

export const AppActions = {
  navigate: (page: string): void => {
    dispatcher.dispatch({
      type: 'NAVIGATE',
      payload: page
    });
  },

  loadAnimeList: async (): Promise<void> => {
    try {
      const animeList = await fetchTopAnime();
      dispatcher.dispatch({
        type: 'SET_ANIME_LIST',
        payload: animeList
      });
    } catch (error) {
      console.error("Error loading anime list:", error);
    }
  }
};