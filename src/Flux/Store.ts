import { Action, ActionTypes, Post } from "./Actions";
import { database } from "../firebase/firebase-config";
import { ref, onValue } from "firebase/database";

interface AppState {
  posts: Post[];
}

const initialState: AppState = {
  posts: [],
};

export class Store<T> {
  private state: T;
  private listeners: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = initialState;
    this.initFirebaseListener();
  }

  private initFirebaseListener() {
    const postsRef = ref(database, "posts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const posts: Post[] = data
        ? Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value,
          }))
        : [];
      this.setState({ ...(this.state as object), posts } as T);
    });
  }

  getState() {
    return this.state;
  }

  setState(state: T) {
    this.state = state;
    this.emit();
  }

  subscribe(listener: (state: T) => void) {
    this.listeners.push(listener);
    listener(this.state);
  }

  dispatch(action: Action) {
    switch (action.type) {
      case ActionTypes.ADD_POST:
        // La adición se maneja directamente en el componente
        break;
    }
  }

  private emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const store = new Store<AppState>(initialState);
