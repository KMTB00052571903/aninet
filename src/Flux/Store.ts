// src/Flux/Store.ts
import Dispatcher from './Dispatcher';
import {ActionTypes} from './Actions';

interface State {
  user: firebase.User | null;
}

class Store {
  private state: State;
  private listeners: Array<() => void>;

  constructor() {
    this.state = {
      user: null,
    };
    this.listeners = [];

    Dispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action: any) {
    switch (action.type) {
      case ActionTypes.SET_USER:
        this.state.user = action.payload;
        this.emitChange();
        break;
      case ActionTypes.LOGOUT_USER:
        this.state.user = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  getState(): State {
    return this.state;
  }

  addChangeListener(listener: () => void) {
    this.listeners.push(listener);
  }

  removeChangeListener(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  emitChange() {
    this.listeners.forEach((listener) => listener());
  }
}

export default new Store();
