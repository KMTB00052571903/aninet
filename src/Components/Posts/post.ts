class PostCreator extends HTMLElement {
  userIcon: string;
  userName: string;
  private fileInput: HTMLInputElement | null = null;
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.userIcon = "https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg";
    this.userName = "Current User";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #111111;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          font-family: 'Roboto', sans-serif;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .post-input {
          width: auto;
          min-height: auto;
          max-height: auto;
          padding: 15px;
          border: 2px solid #555;
          border-radius: 12px;
          background-color: #2E2E2E;
          color: white;
          font-family: inherit;
          font-size: 16px;
          resize: none;
          transition: border-color 0.3s;
        }
        
        .post-input:focus {
          border-color: #FF0808;
          outline: none;
        }
        
        .post-input::placeholder {
          color: #A4A4A4;
          font-style: italic;
        }
        
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .file-upload {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .file-upload-icon {
          color: #FF0808;
          font-size: 24px;
        }
        
        .file-input {
          display: none;
        }
        
        .preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        
        .image-preview {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .remove-image {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
        }
        
        .submit-btn {
          background-color: #FF0808;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 5px rgba(255, 8, 8, 0.3);
        }
        
        .submit-btn:hover {
          background-color: #E00707;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(255, 8, 8, 0.4);
        }
        
        .submit-btn:active {
          transform: translateY(0);
        }
        
        .submit-btn:disabled {
          background-color: #555;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .submit-icon {
          font-size: 18px;
        }
        
        @media (max-width: 768px) {
          .post-creator {
            flex-direction: column;
            gap: 12px;
          }
          
          .user-icon {
            width: 40px;
            height: 40px;
            align-self: flex-start;
          }
          
          .post-input {
            min-height: auto;
            font-size: 15px;
          }
          
          .controls {
            flex-direction: column-reverse;
            align-items: flex-end;
          }
          
          .file-upload {
            align-self: flex-start;
          }
        }
        
        @media (max-width: 480px) {
          :host {
            padding: 15px;
            border-radius: 12px;
          }
          
          .post-input {
            padding: 12px;
            font-size: 14px;
          }
          
          .submit-btn {
            padding: 8px 20px;
            font-size: 14px;
          }
          
          .image-preview {
            width: 60px;
            height: 60px;
          }
        }
      </style>
      
      <div class="post-creator">
        <img class="user-icon" src="${this.userIcon}" alt="User profile">
        <div class="post-content">
          <textarea 
            class="post-input" 
            placeholder="Start posting!"></textarea>
          
          <div class="preview-container" id="preview-container"></div>
          
          <div class="controls">
            <label class="file-upload">
              <svg class="file-upload-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
              </svg>
              <span>Add image</span>
              <input type="file" class="file-input" accept="image/*" multiple>
            </label>
            
            <button class="submit-btn" disabled>
              <svg class="submit-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.5.5 0 0 1-.93.008L5.354 9.586l-4.69-4.69a.5.5 0 1 1 .708-.708L5.793 8.45l5.242-6.146a.5.5 0 0 1 .54-.11z"/>
              </svg>
              Post
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const textarea = this.shadowRoot!.querySelector('.post-input') as HTMLTextAreaElement;
    const button = this.shadowRoot!.querySelector('.submit-btn') as HTMLButtonElement;
    this.fileInput = this.shadowRoot!.querySelector('.file-input') as HTMLInputElement;
    const previewContainer = this.shadowRoot!.querySelector('#preview-container') as HTMLElement;

    textarea.addEventListener('input', () => {
      button.disabled = textarea.value.trim() === '';
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!button.disabled) {
          this.handleSubmit(textarea, previewContainer);
        }
      }
    });

    button.addEventListener('click', () => {
      this.handleSubmit(textarea, previewContainer);
    });

    this.fileInput!.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.displayImagePreviews(files, previewContainer);
      }
    });
  }

  handleSubmit(textarea: HTMLTextAreaElement, previewContainer: HTMLElement) {
    const content = textarea.value.trim();
    if (content) {

      textarea.value = '';
      previewContainer.innerHTML = '';
      if (this.fileInput) {
        this.fileInput.value = '';
      }
      
      this.dispatchEvent(new CustomEvent('post-submitted', {
        detail: { content },
        bubbles: true,
        composed: true
      }));
    }
  }

  displayImagePreviews(files: FileList, container: HTMLElement) {
    container.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
      if (!file.type.match('image.*')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
          <img src="${e.target!.result}" alt="Preview ${index + 1}">
          <button class="remove-image" data-index="${index}">×</button>
        `;
        container.appendChild(preview);
        
        preview.querySelector('.remove-image')!.addEventListener('click', () => {
          this.removeImage(index, container);
        });
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number, container: HTMLElement) {
    const preview = container.querySelector(`.image-preview [data-index="${index}"]`)?.parentElement;
    if (preview) {
      preview.remove();
    }
  }
}

customElements.define('post-creator', PostCreator);
export default PostCreator;