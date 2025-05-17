import { store } from '../flux/Store';

class Router {
  constructor() {
    window.addEventListener('popstate', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  navigate(path: string) {
    history.pushState({}, '', path);
    this.handleRouteChange();
  }

  private handleRouteChange() {
    const path = window.location.pathname.substring(1) || 'home';
    
    store.dispatch({
      type: 'NAVIGATE',
      payload: path
    });
  }
}

export const router = new Router();