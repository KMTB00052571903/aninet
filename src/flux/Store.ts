import { Anime, AppState, DispatchAction } from '../types/types';
import { dispatcher } from './Dispatcher';

class Store {
  private state: AppState;
  private listeners: (() => void)[] = [];

constructor() {
    this.state = {
        currentPage: 'home',
        posts: [],
        profile: null,
        animeList: [],
        categories: [
            'Action', 'Adventure', 'Comedy', 
            'Drama', 'Fantasy', 'Horror',
            'Mystery', 'Romance', 'Sci-Fi'
        ],
        isLoading: false,    
        error: null         
    };

    dispatcher.register(this.handleActions.bind(this));
  }

  private handleActions(action: DispatchAction): void {
    switch (action.type) {
      case 'NAVIGATE':
        this.state = { 
          ...this.state, 
          currentPage: action.payload as string
        };
        break;

      case 'SET_ANIME_LIST':
        this.state = {
          ...this.state,
          animeList: action.payload as Anime[]
        };
        break;

      default:
        return;
    }
    this.notifyListeners();
  }

  public getState(): AppState {
    return this.state;
  }

  public subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  public dispatch(action: DispatchAction): void {
    this.handleActions(action);
  }
}

export const store = new Store();