import { store } from "../flux/Store";
import { AppActions } from "../flux/Actions";

class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.render.bind(this));
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.render.bind(this));
  }

  render() {
    const currentPage = store.getState().currentPage;
    
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          min-height: 100vh;
          background-color: #111;
        }
        
        main {
          padding-top: 80px;
        }
      </style>
      
      <header-component></header-component>
      <main>
        ${this.getPageContent(currentPage)}
      </main>
      <footer-component></footer-component>
    `;
  }

  private getPageContent(page: string): string {
    switch (page) {
      case 'home':
        return '<post-list></post-list>';
      case 'watch':
        return '<anime-catalog></anime-catalog>';
      case 'categories':
        return '<categories-page></categories-page>';
      case 'profile':
        return '<profile-component></profile-component>';
      default:
        return '<post-list></post-list>';
    }
  }
}

customElements.define('app-root', Root);
export default Root;