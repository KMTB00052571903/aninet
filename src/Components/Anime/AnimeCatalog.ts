import { store } from '../../flux/Store';
import { AppActions } from '../../flux/Actions';

class AnimeCatalog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.render.bind(this));
    AppActions.loadAnimeList();
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.render.bind(this));
  }

  render() {
    const animeList = store.getState().animeList;

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 100px 20px 20px;
          color: white;
        }
        
        .page-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #FF0808;
        }
        
        .anime-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
      </style>
      
      <div class="watch-page">
        <h1 class="page-title">Top Anime</h1>
        <div class="anime-grid">
          ${animeList.map(anime => `
            <anime-card data-anime='${JSON.stringify(anime)}'></anime-card>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('anime-catalog', AnimeCatalog);
export default AnimeCatalog;