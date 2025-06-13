import { Action, ActionTypes } from './Actions';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userIcon: string;
  content: string;
  timestamp: number;
}

export interface AppState {
  user: any;
  posts: any[];
  comments: Comment[];
}

export class Store {
  private state: AppState;
  private listeners: ((state: AppState) => void)[] = [];

  constructor(initialState: AppState) {
    this.state = initialState;
    this.loadFromLocalStorage();
  }

  getState(): AppState {
    return this.state;
  }

  setState(newState: AppState): void {
    this.state = newState;
    this.saveToLocalStorage();
    this.emit();
  }

  dispatch(action: Action): void {
    switch (action.type) {
      case ActionTypes.ADD_COMMENT:
        const newComment = action.payload as Comment;
        this.setState({
          ...this.state,
          comments: [...this.state.comments, newComment]
        });
        break;
      default:
        break;
    }
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private emit(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  private loadFromLocalStorage(): void {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }
}

const initialState: AppState = {
  user: null,
  posts: [],
  comments: []
};

export const store = new Store(initialState);