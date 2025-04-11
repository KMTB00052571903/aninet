class PostCreator extends HTMLElement {
    private shadow: ShadowRoot;
    private userIcon: string;
    private selectedImage: string | null;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.userIcon = "https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg";
        this.selectedImage = null;
    }

    connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadow.innerHTML = `
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
            resize: none;
          }
          
          .post-input:focus {
            border-color: #FF0808;
            outline: none;
          }
          
          .post-input::placeholder {
            color: #A4A4A4;
            font-style: italic;
          }

          .post-actions {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 0 10px;
          }

          .action-button {
            background: none;
            border: none;
            color: #A4A4A4;
            font-size: 20px;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
          }

          .action-button:hover {
            background-color: #4E4E4E;
            color: white;
          }
          
          .action-button i {
            font-size: 1.2rem;
          }
          
          .submit-btn {
            margin-left: auto;
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

          .image-preview {
            max-width: 100%;
            max-height: 300px;
            margin-top: 10px;
            border-radius: 8px;
            display: none;
          }

          .image-preview.visible {
            display: block;
          }

          .file-input {
            display: none;
          }

          .remove-image {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            display: none;
          }

          .preview-container {
            position: relative;
          }

          .preview-container:hover .remove-image {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
        
        <div class="post-creator">
          <img class="user-icon" src="${this.userIcon}" alt="User profile">
          <div class="post-content">
            <textarea 
              class="post-input" 
              placeholder="Start posting!"></textarea>
            <div class="preview-container">
              <img class="image-preview" src="" alt="Preview">
              <button class="remove-image" title="Remove image">×</button>
            </div>
            <div class="post-actions">
              <button class="action-button" title="Add emoji">
                <i class="bi bi-emoji-smile"></i>
              </button>
              <input type="file" class="file-input" accept="image/*">
              <button class="action-button" title="Add image">
                <i class="bi bi-image"></i>
              </button>
              <button class="action-button" title="Upload">
                <i class="bi bi-upload"></i>
              </button>
              <button class="action-button" title="Text format">
                <i class="bi bi-type-bold"></i>
              </button>
              <button class="submit-btn">Submit</button>
            </div>
          </div>
        </div>
      `;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const textarea = this.shadow.querySelector<HTMLTextAreaElement>('.post-input');
        const submitButton = this.shadow.querySelector<HTMLButtonElement>('.submit-btn');
        const actionButtons = this.shadow.querySelectorAll<HTMLButtonElement>('.action-button');
        const fileInput = this.shadow.querySelector<HTMLInputElement>('.file-input');
        const imagePreview = this.shadow.querySelector<HTMLImageElement>('.image-preview');
        const removeImageButton = this.shadow.querySelector<HTMLButtonElement>('.remove-image');

        if (!textarea || !submitButton || !fileInput || !imagePreview || !removeImageButton) return;

        submitButton.addEventListener('click', () => {
            const content = textarea.value.trim();
            if (content || this.selectedImage) {
                this.dispatchEvent(new CustomEvent('post-submitted', {
                    detail: {
                        content,
                        image: this.selectedImage
                    },
                    bubbles: true,
                    composed: true
                }));
                textarea.value = '';
                this.selectedImage = null;
                imagePreview.src = '';
                imagePreview.classList.remove('visible');
            }
        });

        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.title;
                console.log(`Acción seleccionada: ${action}`);

                switch (action) {
                    case 'Add image':
                        fileInput.click();
                        break;
                    case 'Add emoji':
                        // Implementar selector de emojis
                        break;
                    case 'Upload':
                        // Implementar subida de archivos
                        break;
                    case 'Text format':
                        // Implementar formato de texto
                        break;
                }
            });
        });

        fileInput.addEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files[0] && files[0].type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.selectedImage = event.target?.result as string;
                    if (imagePreview) {
                        imagePreview.src = this.selectedImage;
                        imagePreview.classList.add('visible');
                    }
                };
                reader.readAsDataURL(files[0]);
            }
        });

        removeImageButton.addEventListener('click', () => {
            this.selectedImage = null;
            if (imagePreview) {
                imagePreview.src = '';
                imagePreview.classList.remove('visible');
            }
            if (fileInput) {
                fileInput.value = '';
            }
        });
    }
}

customElements.define('post-creator', PostCreator);
export default PostCreator;