// comment.ts
import { store } from '../../Flux/Store';
import { addComment } from '../../Flux/Actions';

class CommentBoxComponent extends HTMLElement {
  private postId: string = '';
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['post-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'post-id') {
      this.postId = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const comments = store.getState().comments.filter(c => c.postId === this.postId);
    
    this.shadowRoot!.innerHTML = `
      <style>
        .comment-section {
          width: 100%;
          margin-top: 15px;
          padding: 15px;
          background: #1a1a1a;
          border-radius: 15px;
        }
        
        .comment-input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 25px;
          border: none;
          background: #2a2a2a;
          color: white;
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          outline: none;
          margin-bottom: 10px;
        }
        
        .comment-input:focus {
          box-shadow: 0 0 0 2px #268774;
        }
        
        .comment-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .comment-item {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #2a2a2a;
          border-radius: 10px;
        }
        
        .comment-user-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #268774;
        }
        
        .comment-content {
          flex: 1;
        }
        
        .comment-user-name {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .comment-text {
          font-size: 14px;
        }
        
        @media (max-width: 576px) {
          .comment-input {
            font-size: 14px;
            padding: 10px 12px;
          }
        }
      </style>
      
      <div class="comment-section">
        <input 
          type="text" 
          class="comment-input" 
          placeholder="Leave your comment..."
          id="comment-input-${this.postId}">
        
        <div class="comment-list" id="comment-list-${this.postId}">
          ${comments.map(comment => `
            <div class="comment-item">
              <img class="comment-user-icon" src="${comment.userIcon}" alt="${comment.userName}">
              <div class="comment-content">
                <div class="comment-user-name">${comment.userName}</div>
                <div class="comment-text">${comment.content}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const input = this.shadowRoot!.querySelector(`#comment-input-${this.postId}`) as HTMLInputElement;
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const user = store.getState().user || { 
          uid: 'guest', 
          displayName: 'Guest', 
          photoURL: 'https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg' 
        };
        
        const newComment: Comment = {
          id: Date.now().toString(),
          postId: this.postId,
          userId: user?.uid || 'guest',
          userName: user?.displayName || 'Guest',
          userIcon: user?.photoURL || 'https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg',
          content: input.value.trim(),
          timestamp: Date.now()
        };
        
        store.dispatch(addComment(newComment));
        input.value = '';
      }
    });
  }
}

customElements.define('comment-box', CommentBoxComponent);
export default CommentBoxComponent;