import { DispatchAction } from '../types/types';

type Callback = (action: DispatchAction) => void;

class Dispatcher {
  private callbacks: Callback[] = [];

  register(callback: Callback): void {
    this.callbacks.push(callback);
  }

  dispatch(action: DispatchAction): void {
    this.callbacks.forEach(callback => {
      callback(action);
    });
  }
}

export const dispatcher = new Dispatcher();