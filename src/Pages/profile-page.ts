import '../Components/Posts/PostCard'; 

class ProfilePage extends HTMLElement {
  private profileData: any;
  private currentProfileId: number = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fetchProfileData();
  }

  async fetchProfileData() {
    try {
      const response = await fetch('../src/Assets/profile.json');
      const data = await response.json();
      this.profileData = data.profiles;
      this.render();
      this.setupNavigation();
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  }

  connectedCallback() {
    this.render();
  }

  navigateToProfile(id: number) {
    this.currentProfileId = id;
    this.render();
  }

  setupNavigation() {
    const nextButton = this.shadowRoot?.querySelector('.next-profile');
    const prevButton = this.shadowRoot?.querySelector('.prev-profile');

    nextButton?.addEventListener('click', () => {
      const nextId = this.currentProfileId % this.profileData.length + 1;
      this.navigateToProfile(nextId);
    });

    prevButton?.addEventListener('click', () => {
      const prevId = (this.currentProfileId - 2 + this.profileData.length) % this.profileData.length + 1;
      this.navigateToProfile(prevId);
    });
  }

  render() {
    if (!this.profileData) {
      this.shadowRoot!.innerHTML = `<p>Loading profile...</p>`;
      return;
    }

    const profile = this.profileData.find((p: any) => p.id === this.currentProfileId) || this.profileData[0];

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #111111;
          color: white;
          font-family: 'Lato', sans-serif;
          min-height: 100vh;
        }

        .profile-banner {
          width: 100%;
          height: 300px;
          object-fit: cover;
          position: relative;
        }

        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          padding: 0 20px 40px;
        }

        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -75px;
          position: relative;
          z-index: 2;
        }

        .profile-pic {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #111111;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .username {
          font-size: 2.5rem;
          margin: 20px 0 10px;
          color: #FF0808;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .bio {
          max-width: 600px;
          text-align: center;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #DDD;
        }

        .stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin: 30px 0;
        }

        .stat-item {
          background: #1a1a1a;
          padding: 20px 30px;
          border-radius: 10px;
          min-width: 120px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(255, 8, 8, 0.2);
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: bold;
          color: #FF0808;
        }

        .stat-label {
          font-size: 1rem;
          color: #A4A4A4;
        }

        .interests-section {
          margin: 40px 0;
          text-align: center;
        }

        .section-title {
          font-size: 1.8rem;
          color: #FF0808;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #FF0808;
          border-radius: 3px;
        }

        .interests-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .interest-tag {
          background: #FF0808;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .favorite-anime {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .favorite-item {
          background: #1a1a1a;
          padding: 15px;
          border-radius: 8px;
          transition: transform 0.3s;
        }

        .favorite-item:hover {
          transform: scale(1.05);
        }

        .posts-section {
          margin-top: 50px;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
        }

        .nav-button {
          background: #FF0808;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }

        .nav-button:hover {
          background: #cc0000;
        }

        @media (max-width: 768px) {
          .profile-banner {
            height: 200px;
          }
          
          .profile-header {
            margin-top: -50px;
          }
          
          .profile-pic {
            width: 100px;
            height: 100px;
          }
          
          .username {
            font-size: 1.8rem;
          }
          
          .stats {
            flex-direction: column;
            align-items: center;
          }
          
          .favorite-anime {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
      </style>

      <div class="profile-container">
        <img class="profile-banner" src="${profile.bannerImage}" alt="Banner">
        
        <div class="navigation-buttons">
          <button class="nav-button prev-profile">← Previous Profile</button>
          <button class="nav-button next-profile">Next Profile →</button>
        </div>
        
        <div class="profile-header">
          <img class="profile-pic" src="${profile.profilePic}" alt="Profile">
          <h1 class="username">${profile.username}</h1>
          <p class="bio">${profile.bio}</p>
          
          <div class="stats">
            <div class="stat-item">
              <div class="stat-value">${profile.favoritesCount}</div>
              <div class="stat-label">Favorites</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${profile.watchingCount}</div>
              <div class="stat-label">Watching</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${profile.completedCount}</div>
              <div class="stat-label">Completed</div>
            </div>
          </div>
        </div>
        
        <div class="interests-section">
          <h2 class="section-title">Interests</h2>
          <div class="interests-list">
            ${profile.interests.map((interest: string) => `
              <span class="interest-tag">${interest}</span>
            `).join('')}
          </div>
        </div>
        
        <div class="interests-section">
          <h2 class="section-title">Favorite Anime</h2>
          <div class="favorite-anime">
            ${profile.favoriteAnime.map((anime: string) => `
              <div class="favorite-item">${anime}</div>
            `).join('')}
          </div>
        </div>
        
        <div class="posts-section">
          <h2 class="section-title">Recent Posts</h2>
          <div class="posts-grid">
            ${profile.posts.map((post: any) => `
              <post-card 
                image="${post.image}"
                title="${post.title}"
                content="${post.content}"
                likes="${post.likes}"
                comments="${post.comments}"
                date="${post.date}"
              ></post-card>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.setupNavigation();
  }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;