import { Anime } from '../../types/types';

class AnimeCard extends HTMLElement {
  private anime: Anime | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ['data-anime'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-anime' && newValue) {
      this.anime = JSON.parse(newValue);
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.anime) return;

    this.shadowRoot!.innerHTML = `
      <style>
        .anime-card {
          background: #222;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s;
          cursor: pointer;
        }
        
        .anime-card:hover {
          transform: scale(1.05);
        }
        
        .anime-poster {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        
        .anime-info {
          padding: 10px;
        }
        
        .anime-title {
          font-weight: bold;
          margin: 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: white;
        }
        
        .anime-details {
          font-size: 0.8rem;
          color: #A4A4A4;
        }
      </style>
      
      <div class="anime-card">
        <img class="anime-poster" src="${this.anime.images.jpg.image_url}" alt="${this.anime.title}">
        <div class="anime-info">
          <div class="anime-title">${this.anime.title}</div>
          <div class="anime-details">
            ⭐ ${this.anime.score || 'N/A'} • ${this.anime.episodes || '?'} episodes
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('anime-card', AnimeCard);
export default AnimeCard;