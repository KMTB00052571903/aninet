import { store } from '../flux/Store';
import { AppActions } from '../flux/Actions';

class WatchPage extends HTMLElement {
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
    const { animeList, isLoading, error } = store.getState();

    if (isLoading) {
      this.shadowRoot!.innerHTML = `<p>Loading...</p>`;
      return;
    }

    if (error) {
      this.shadowRoot!.innerHTML = `<p>Error: ${error}</p>`;
      return;
    }

    this.shadowRoot!.innerHTML = `
      <style>
        /* Tus estilos aquí */
      </style>
      <div class="watch-page">
        <h1>Top Anime</h1>
        <div class="anime-grid">
          ${animeList.map(anime => `
            <div class="anime-card">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
              <h3>${anime.title}</h3>
              ${anime.type ? `<p>Type: ${anime.type}</p>` : ''}
              <p>Score: ${anime.score || 'N/A'}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('watch-page', WatchPage);
export default WatchPage;