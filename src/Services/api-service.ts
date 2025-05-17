import { Anime } from '../types/types';

export const fetchTopAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=12');
    if (!response.ok) throw new Error('Error fetching anime');
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
};