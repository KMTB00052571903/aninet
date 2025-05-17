import { store } from '../flux/Store';

class CategoriesPage extends HTMLElement {
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
    const categories = store.getState().categories;

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
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .category-card {
          background: #222;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s;
        }
        
        .category-card:hover {
          background: #FF0808;
          transform: scale(1.05);
        }
      </style>
      
      <div class="categories-page">
        <h1 class="page-title">Categories</h1>
        <div class="categories-grid">
          ${categories.map(category => `
            <div class="category-card">
              <h3>${category}</h3>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('categories-page', CategoriesPage);
export default CategoriesPage;