class PostCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || '';
    const content = this.getAttribute('content') || '';
    const likes = this.getAttribute('likes') || '0';
    const comments = this.getAttribute('comments') || '0';
    const date = this.getAttribute('date') || '';

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background: #1a1a1a;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        :host(:hover) {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255, 8, 8, 0.2);
        }

        .post-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .post-content {
          padding: 20px;
        }

        .post-title {
          font-size: 1.3rem;
          margin: 0 0 10px;
          color: #FF0808;
        }

        .post-text {
          color: #CCC;
          line-height: 1.5;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          color: #A4A4A4;
          font-size: 0.9rem;
        }

        .post-stats {
          display: flex;
          gap: 15px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 600px) {
          .post-image {
            height: 150px;
          }
          
          .post-content {
            padding: 15px;
          }
        }
      </style>

      <div class="post-card">
        <img class="post-image" src="${image}" alt="${title}">
        <div class="post-content">
          <h3 class="post-title">${title}</h3>
          <p class="post-text">${content}</p>
          <div class="post-meta">
            <span>${new Date(date).toLocaleDateString()}</span>
            <div class="post-stats">
              <span class="stat">❤️ ${likes}</span>
              <span class="stat">💬 ${comments}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('post-card', PostCard);
export default PostCard;