class CommentBoxComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
    
      async connectedCallback() {
        const comments = await this.fetchPosts();
        this.render(comments);
      }
      async fetchPosts() {
        try {
          const response = await fetch('../src/Assets/commentList.json');
          return await response.json();
        } catch (error) {
          console.error('Error loading posts:', error);
          return [];
        }
      }

      render(comments:any) {
        this.shadowRoot!.innerHTML = `
        <style>
        
        
        </style>

        ${comments.map((com:any) =>`
            <div class="commentBox">
                <div class="commentBox-header">
                
                </div>
                <div class="commentList-container">
                    <div class="commentList">
                        <div class="comment-header">
                        </div>
                        <div class="comment-text&like">
                            <div class="comment-text"></div>
                        </div>
                        
                    </div>

                </div>
                <div class="write-comment">
                </div>
            </div>
            
            `).join('')}

        `

      }

}