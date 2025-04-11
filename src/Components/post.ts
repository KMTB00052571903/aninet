class PostCreator extends HTMLElement {
  userIcon:any
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.userIcon = "https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg"; 
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot!.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: #3E3E3E;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            font-family: 'Roboto', sans-serif;
          }
          
          .post-creator {
            display: flex;
            gap: 15px;
          }
          
          .user-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #FF0808;
            flex-shrink: 0;
          }
          
          .post-content {
            flex: 0.9;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .post-input {
            width: 100%;
            height: 80px;
            padding: 20px;
            margin: 10px;
            border: 2px solid #555;
            border-radius: 12px;
            background-color: #2E2E2E;
            color: white;
            font-family: inherit;
            font-size: 16px;
          }
          
          .post-input:focus {
            border-color: #FF0808;
          }
          
          .post-input::placeholder {
            color: #A4A4A4;
            font-style: italic;
          }
          
          .submit-btn {
            align-self: flex-end;
            background-color: #FF0808;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .submit-btn:hover {
            background-color: #E00707;
            transform: translateY(-1px);
          }
          
          .submit-btn:active {
            transform: translateY(0);
          }
        </style>
        
        <div class="post-creator">
          <img class="user-icon" src="${this.userIcon}" alt="User profile">
          <div class="post-content">
            <textarea 
              class="post-input" 
              placeholder="Start posting!"></textarea>
            <button class="submit-btn">Submit</button>
          </div>
        </div>
      `;
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      const textarea = this.shadowRoot!.querySelector('.post-input') as HTMLInputElement;
      const button = this.shadowRoot!.querySelector('.submit-btn');
      
      button!.addEventListener('click', () => {
        const content = textarea!.value.trim();
        if (content) {
          this.dispatchEvent(new CustomEvent('post-submitted', {
            detail: { content },
            bubbles: true,
            composed: true
          }));
          textarea!.value = '';
        }
      });
    }
  }
  
  customElements.define('post-creator', PostCreator);
  export default PostCreator;