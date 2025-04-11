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
            background: #111111;
            border-radius: 25px;
            padding: 15px;
            margin: 15px 0;
            color: white;
            display:flex;
            flex-direction: column;
            align-items: center;
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
          }
          .image-container {
            width: 975px;
            height: 619px;
            background-color: black;
            border-radius: 35px;
            dispay: flex;
            align-items: center;
            justify-content: center;
          }

          .post-image {           
            width:100%;
            height:100%;
            border-radius: 35px;
            object-fit:scale-down ;
          }

          .post-footer{
            width: fill;
            display:flex;
            justiy-content: center;
            align-items:  center;
            flex-wrap: wrap;
            padding: 12px 67px;

          }
          .post-title-container{
            width: 605px;
            
          }
          .post-title-container h1{
            font-family: lato;
            font-weight: bold;
            font-size: 16px;
          }
          
          .post-actions {
            display: flex;
            
            margin-top: 15px;
            padding-top: 15px;
            border-radius: 5px solidrgb(159, 70, 70);
          }
          .title-tag-container {
            display: flex;
            flex-direction: column;
          
          }
          .tag-container {
            width:114px;
            height:44px;
            justify-content: center;
          }
          .tag {
            background-color: #268774;
            border-radius: 35px;
            text-align: center;
            font-size: 12px;
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
          .action-btn.notliked {
            
            color: white;
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
            <div class="image-container">
            ${post.image ? `<img class="post-image" src="${post.image}" alt="${post.title}">` : ''}
            </div>
            <div class="post-footer">
              <div class= "title-tag-container">
              <div class="post-title-container">
                <h1>${post.title}</h1>
              </div>
              <div class="tag-container">
                <p class="tag">#${post.tag}</p>
              </div>
              </div>
              <div class="post-actions">
                
                <button class="action-btn ${post.liked ? 'notliked' : 'liked'}" data-id="${post.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                </button>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
                </button>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    
          
        `).join('')}
      `;

      
    
      
    const likeButtons = this.shadowRoot.querySelectorAll('.action-btn');

    likeButtons.forEach(button => {
    button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.classList.toggle('notliked');
    });
    });

    }

    
}
  

  
  customElements.define('post-list', PostList);
  export default PostList;