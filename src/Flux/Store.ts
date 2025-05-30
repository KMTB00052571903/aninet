type Post = {
  id: string;
  name: string;
  icon: string;
  time: string;
  title: string;
  tag: string;
  image?: string;
  liked: boolean;
  content: string;
};

type Comment = {
  id: string;
  postId: string;
  name: string;
  icon: string;
  time: string;
  content: string;
};

type AppState = {
  posts: Post[];
  comments: Comment[];
};

class Store {
  private static instance: Store;
  private state: AppState;
  private subscribers: Array<(state: AppState) => void> = [];

  private constructor() {
    // Cargar del localStorage o inicializar estado vacío
    const savedState = localStorage.getItem('social-app-state');
    this.state = savedState 
      ? JSON.parse(savedState) 
      : { posts: [], comments: [] };
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public getState(): AppState {
    return this.state;
  }

  public subscribe(callback: (state: AppState) => void): void {
    this.subscribers.push(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.state));
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('social-app-state', JSON.stringify(this.state));
  }

  // Actions
  public addPost(post: Omit<Post, 'id' | 'liked' | 'time'>): void {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      liked: false,
      time: new Date().toLocaleString(),
    };

    this.state = {
      ...this.state,
      posts: [newPost, ...this.state.posts],
    };

    this.saveToLocalStorage();
    this.notifySubscribers();
  }

  public toggleLike(postId: string): void {
    this.state = {
      ...this.state,
      posts: this.state.posts.map(post => 
        post.id === postId ? { ...post, liked: !post.liked } : post
      ),
    };

    this.saveToLocalStorage();
    this.notifySubscribers();
  }

  public addComment(comment: Omit<Comment, 'id' | 'time'>): void {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      time: new Date().toLocaleString(),
    };

    this.state = {
      ...this.state,
      comments: [...this.state.comments, newComment],
    };

    this.saveToLocalStorage();
    this.notifySubscribers();
  }
}

export const store = Store.getInstance();