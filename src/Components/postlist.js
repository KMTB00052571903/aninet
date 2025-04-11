class PostList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const posts = await this.fetchPosts();
      this.render(posts);
    }
  
    async fetchPosts() {
      try {
        const response = await fetch('../src/Assets/postList.json');
        return await response.json();
      } catch (error) {
        console.error('Error loading posts:', error);
        return [];
      }
    }
  
    render(posts) {
      this.shadowRoot.innerHTML = `
        <style>
          .post {
            background: #3E3E3E;
            border-radius: 25px;
            padding: 15px;
            margin: 15px 0;
            color: white;
          }
          .post-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }
          .user-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
          .post-image {
            width: 100%;
            border-radius: 5px;
            margin: 10px 0;
            max-height: 400px;
            object-fit: contain;
          }
          .post-actions {
            border-radius: 25px;
          }
          .post-image {
            width: 100%;
            border-radius: 20px;
            margin: 20px 0;
            display: block;
            max-height: 500px;
            object-fit: cover;
          }
          .post-actions {
            display: flex;
            justify-content: space-around;
            margin-top: 15px;
            padding-top: 15px;
            border-radius: 5px solidrgb(159, 70, 70);
          }
          .action-btn {
            background: none;
            border: none;
            color:rgb(255, 255, 255);
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            padding: 6px 12px;
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
          
          .action-btn .icon {
            font-size: 20px;
          }
        </style>
        ${posts.map(post => `
          <div class="post">
            <div class="post-header">
              <img class="user-icon" src="${post.icon}" alt="${post.name}">
              <div>
                <strong>${post.name}</strong>
                <div style="color: #A4A4A4; font-size: 0.8em;">${post.time}</div>
              </div>
            </div>
            <div>${post.title}</div>
            ${post.image ? `<img class="post-image" src="${post.image}" alt="${post.title}">` : ''}
            <div style="color: #FF0808; margin-top: 10px;">${post.tag}</div>
            <div class="post-actions">
            <button class="action-btn ${post.liked ? 'liked' : ''}">
              ❤️ Like
            </button>
            <button class="action-btn">
              ⬇ Download
            </button>
            <button class="action-btn">
              💬 Comment
            </button>
          </div>
        </div>
          </div>
    
          
        `).join('')}
      `;
    }
  }
  
  customElements.define('post-list', PostList);
  export default PostList;