import { store } from "../../Flux/Store";
import { database } from "../../firebase/firebase-config";

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
          background-color: #1a1a1a;
          margin: 15px 0;
          padding: 20px;
          border-radius: 12px;
          color: white;
        }

        .post img {
          max-width: 100%;
          border-radius: 8px;
          margin-top: 10px;
        }

        .post-time {
          font-size: 0.8rem;
          color: #999;
        }
      </style>

      ${posts
        .map(
          (post) => `
        <div class="post">
          <div>${post.content}</div>
          ${post.image ? `<img src="${post.image}" alt="post image">` : ""}
          <div class="post-time">${new Date(post.createdAt).toLocaleString()}</div>
        </div>
      `
        )
        .join("")}
    `;
  }
}

customElements.define("post-list", PostList);
export default PostList;
