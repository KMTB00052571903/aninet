import { store } from "../../Flux/Store";

class PostList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(() => this.render());
    this.render();
  }

  render() {
    const posts = store.getState().posts;

    this.shadowRoot!.innerHTML = `
      <style>
        .post {
          background: #111111;
          border-radius: 25px;
          padding: 15px;
          margin: 15px 0;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }
        
        .post:hover {
          transform: translateY(-5px);
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          width: 95%;
        }

        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #268774;
        }

        .image-container {
          width: 100%;
          max-width: 975px;
          height: auto;
          background-color: black;
          border-radius: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .post-image {
          width: 100%;
          max-height: 619px;
          border-radius: 35px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .post-image:hover {
          transform: scale(1.03);
        }

        .post-footer {
          width: 100%;
          max-width: 975px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 12px 35px;
        }

        .post-title-container {
          width: 100%;
          max-width: 605px;
          margin-bottom: 10px;
        }

        .post-title-container h1 {
          font-family: 'Lato', sans-serif;
          font-weight: bold;
          font-size: 16px;
          margin: 0;
        }

        .title-tag-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 200px;
        }

        .tag-container {
          width: 114px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tag {
          background-color: #268774;
          border-radius: 35px;
          text-align: center;
          font-size: 12px;
          padding: 8px 15px;
          margin: 5px 0;
        }

        .post-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .action-btn {
          background: none;
          border: none;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 15px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(255, 8, 8, 0.1);
          color: #FF0808;
        }

        .action-btn.liked {
          color: #FF0808;
        }

        .action-btn svg {
          transition: transform 0.2s ease;
        }

        .action-btn:hover svg {
          transform: scale(1.1);
        }

        .comment-section {
          width: 100%;
          margin-top: 15px;
          display: none;
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
          font-size: 20px;
          outline: none;
        }

        .comment-input:focus {
          box-shadow: 0 0 0 2px #268774;
        }

        .visible {
          display: block;
        }
      </style>

      ${posts.map((post: any) => `
        <div class="post">
          <div class="post-header">
            <img class="user-icon" src="${post.icon || "https://i.pinimg.com/736x/2c/0a/6c/2c0a6cd623e11a173e3c34a3bee29bec.jpg"}" alt="${post.name || "User"}">
            <div>
              <strong>${post.name || "User"}</strong>
              <div style="color: #A4A4A4; font-size: 0.8em;">${new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
          ${post.image ? `
          <div class="image-container">
            <img class="post-image" src="${post.image}" alt="post image">
          </div>
          ` : ''}
          <div class="post-footer">
            <div class="title-tag-container">
              <div class="post-title-container">
                <h1>${post.title || ""}</h1>
              </div>
              <div class="tag-container">
                <p class="tag">#${post.tag || "General"}</p>
              </div>
            </div>
            <div class="post-actions">
              <button class="action-btn ${post.liked ? "liked" : "notliked"}" data-id="${post.id || ""}">
                ❤️
              </button>
              <button class="action-btn comment-btn" data-post-id="${post.id || ""}">
                💬
              </button>
            </div>
          </div>
          <div class="comment-section" id="comment-section-${post.id || ""}">
            <input type="text" class="comment-input" placeholder="Leave your comment...">
          </div>
        </div>
      `).join("")}
    `;

    this.setupEvents();
  }

  setupEvents() {
    const likeButtons = this.shadowRoot!.querySelectorAll(".action-btn:not(.comment-btn)");
    likeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("liked");
        btn.classList.toggle("notliked");
      });
    });

    const commentBtns = this.shadowRoot!.querySelectorAll(".comment-btn");
    commentBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-post-id");
        const section = this.shadowRoot!.querySelector(`#comment-section-${id}`);
        section?.classList.toggle("visible");
      });
    });
  }
}

customElements.define("post-list", PostList);
export default PostList;
