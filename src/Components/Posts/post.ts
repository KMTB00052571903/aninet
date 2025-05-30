import { database } from "../../firebase/firebase-config";
import { ref, push } from "firebase/database";

class PostCreator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
          font-family: 'Lato', sans-serif;
        }

        .post-creator {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .user-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #FF0808;
          object-fit: cover;
        }

        .post-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .post-input {
          background-color: #2e2e2e;
          color: white;
          border: 2px solid #444;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 10px;
          font-size: 14px;
          resize: none;
          height: 100px;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .file-input {
          color: white;
        }

        .submit-btn {
          background-color: #FF0808;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #e00707;
        }
      </style>

      <div class="post-creator">
        <img class="user-icon" src="https://i.pinimg.com/736x/67/ac/6c/67ac6c6c4a7750e34e17a0586c7e596c.jpg" alt="user">
        <div class="post-content">
          <textarea class="post-input" placeholder="Start posting!"></textarea>
          <div class="controls">
            <input type="file" accept="image/*" class="file-input">
            <button class="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const textarea = this.shadowRoot!.querySelector(".post-input") as HTMLTextAreaElement;
    const fileInput = this.shadowRoot!.querySelector(".file-input") as HTMLInputElement;
    const submitBtn = this.shadowRoot!.querySelector(".submit-btn") as HTMLButtonElement;

    submitBtn.addEventListener("click", () => {
      const content = textarea.value.trim();
      const file = fileInput.files?.[0];

      if (!content && !file) return;

      const savePost = (imageData?: string) => {
        const newPost: any = {
          content,
          createdAt: new Date().toISOString(),
        };
        if (imageData) {
          newPost.image = imageData;
        }

        const postsRef = ref(database, "posts");
        push(postsRef, newPost)
          .then(() => {
            textarea.value = "";
            fileInput.value = "";
          })
          .catch((error) => {
            console.error("Error adding post:", error);
          });
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          savePost(reader.result?.toString());
        };
        reader.readAsDataURL(file);
      } else {
        savePost(); // solo texto
      }
    });
  }
}

customElements.define("post-creator", PostCreator);
export default PostCreator;
