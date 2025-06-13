import { getPostList } from '../../firebase/data-service';

class PostList extends HTMLElement {
  posts: any[] = [];

  async connectedCallback() {
    this.posts = await getPostList();
    this.render();
  }

  render() {
    this.innerHTML = this.posts.map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <img src="${post.image}" alt="${post.title}" />
      </div>
    `).join('');
  }
}

customElements.define('post-list', PostList);
