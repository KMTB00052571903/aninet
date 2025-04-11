export default class UploadPost extends HTMLElement {
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.querySelector('#close-btn').addEventListener('click', () => {
        this.remove();
      });
      
      this.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const content = this.querySelector('#post-content').value;
        // Aquí iría la lógica para subir el post
        alert(`Post created: ${content}`);
        this.remove();
      });
    }
  
    render() {
      this.innerHTML = `
        <style>
          .upload-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .upload-container {
            background-color: #2E2E2E;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
          }
          .upload-title {
            color: white;
            margin-bottom: 20px;
            text-align: center;
          }
          textarea {
            width: 100%;
            min-height: 150px;
            background-color: #444;
            border: none;
            border-radius: 5px;
            padding: 10px;
            color: white;
            margin-bottom: 15px;
            resize: vertical;
          }
          .upload-actions {
            display: flex;
            justify-content: space-between;
          }
          .upload-btn {
            background-color: #FF0808;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
  
        <div class="upload-modal">
          <div class="upload-container">
            <button class="close-btn" id="close-btn">×</button>
            <h2 class="upload-title">Create New Post</h2>
            <form>
              <textarea id="post-content" placeholder="What's on your mind?"></textarea>
              <div class="upload-actions">
                <button type="button" class="upload-btn" id="upload-media">Add Media</button>
                <button type="submit" class="upload-btn">Post</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }