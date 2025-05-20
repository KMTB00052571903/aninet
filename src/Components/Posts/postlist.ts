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
    
    render(posts: any) {
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
            height: 619px;
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
            height: 100%;
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
            /* Responsive styles */
          @media (max-width: 1200px) {
            .image-container {
              height: 500px;
            }
            
            .post-footer {
              padding: 12px 25px;
            }
          }
          
          @media (max-width: 992px) {
            .post {
              padding: 12px;
              border-radius: 20px;
            }
            
            .image-container {
              height: 400px;
              border-radius: 25px;
            }
            
            .post-image {
              border-radius: 25px;
            }
            
            .post-actions {
              gap: 8px;
            }
            
            .action-btn {
              padding: 6px 12px;
            }
            
            .action-btn svg {
              width: 20px;
              height: 20px;
            }
          }
          
          @media (max-width: 768px) {
            .image-container {
              height: 350px;
            }
            
            .post-footer {
              flex-direction: column;
              gap: 15px;
            }
            
            .title-tag-container {
              width: 100%;
            }
            
            .post-actions {
              width: 100%;
              justify-content: flex-end;
            }
          }
          
          @media (max-width: 576px) {
            .image-container {
              height: 250px;
              border-radius: 15px;
            }
            
            .post-image {
              border-radius: 15px;
            }
            
            .post-header {
              width: 100%;
            }
            
            .user-icon {
              width: 35px;
              height: 35px;
            }
            
            .tag {
              font-size: 11px;
              padding: 6px 12px;
            }
            
            .comment-input {
              font-size: 16px;
              padding: 10px 12px;
            }
          }
        </style>
        ${posts.map((post: any) => `
          <div class="post">
            <div class="post-header">
              <img class="user-icon" src="${post.icon}" alt="${post.name}">
              <div>
                <strong>${post.name}</strong>
                <div style="color: #A4A4A4; font-size: 0.8em;">${post.time}</div>
              </div>
            </div>
            <div class="image-container">
              ${post.image ? `<img class="post-image" src="${post.image}" alt="${post.title}">` : ''}
            </div>
            <div class="post-footer">
              <div class="title-tag-container">
                <div class="post-title-container">
                  <h1>${post.title}</h1>
                </div>
                <div class="tag-container">
                  <p class="tag">#${post.tag}</p>
                </div>
              </div>
              <div class="post-actions">
                <button class="action-btn ${post.liked ? 'liked' : 'notliked'}" data-id="${post.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                </button>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                  </svg>
                </button>
                <button class="action-btn comment-btn" data-post-id="${post.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="comment-section" id="comment-section-${post.id}">
              <input type="text" class="comment-input" placeholder="Leave your comment...">
            </div>
          </div>
        `).join('')}
      `;

      const likeButtons = this.shadowRoot!.querySelectorAll('.action-btn:not(.comment-btn)');
      likeButtons.forEach(button => {
        button.addEventListener('click', () => {
          button.classList.toggle('liked');
          button.classList.toggle('notliked');
        });
      });

      const commentButtons = this.shadowRoot!.querySelectorAll('.comment-btn');
      commentButtons.forEach(button => {
        button.addEventListener('click', () => {
          const postId = button.getAttribute('data-post-id');
          const commentSection = this.shadowRoot!.querySelector(`#comment-section-${postId}`);
          commentSection?.classList.toggle('visible');
        });
      });
    }
}

customElements.define('post-list', PostList);
export default PostList;