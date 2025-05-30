// comment.ts (modificado)
import { store } from '../../Flux/Store';

class CommentBoxComponent extends HTMLElement {
  private postId: string | null = null;
  
  static get observedAttributes() {
    return ['post-id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'post-id') {
      this.postId = newValue;
      this.loadComments();
    }
  }

  connectedCallback() {
    store.subscribe(() => this.loadComments());
    this.loadComments();
  }

  loadComments() {
    if (!this.postId) return;
    
    const state = store.getState();
    const comments = state.comments.filter(comment => comment.postId === this.postId);
    this.render(comments);
  }

  render(comments: any) {
    this.shadowRoot!.innerHTML = `
      <style>
        .commentBox {
          background: #1a1a1a;
          border-radius: 15px;
          padding: 15px;
          margin-top: 15px;
        }
        
        .comment {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #333;
        }
        
        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .comment-content {
          flex: 1;
        }
        
        .comment-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        
        .comment-author {
          font-weight: bold;
          font-size: 0.9em;
        }
        
        .comment-time {
          color: #A4A4A4;
          font-size: 0.8em;
        }
        
        .comment-text {
          font-size: 0.9em;
        }
        
        .write-comment {
          margin-top: 15px;
        }
        
        .comment-input {
          width: 100%;
          padding: 10px 15px;
          border-radius: 20px;
          border: none;
          background: #2a2a2a;
          color: white;
          outline: none;
        }
      </style>

      <div class="commentBox">
        <div class="commentList-container">
          ${comments.map((comment: any) => `
            <div class="comment">
              <img class="comment-avatar" src="${comment.icon}" alt="${comment.name}">
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">${comment.name}</span>
                  <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-text">${comment.content}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="write-comment">
          <input 
            class="comment-input" 
            placeholder="Write a comment..." 
            data-post-id="${this.postId}">
        </div>
      </div>
    `;

    // Manejar envío de comentarios
    const input = this.shadowRoot!.querySelector('.comment-input') as HTMLInputElement;
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        store.addComment({
          postId: this.postId!,
          name: "Current User", // Obtener del usuario actual
          icon: "https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg",
          content: input.value.trim(),
        });
        input.value = '';
      }
    });
  }
}

customElements.define('comment-box', CommentBoxComponent);