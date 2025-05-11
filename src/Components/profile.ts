class ProfileComponent extends HTMLElement {
    private profileData: any;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.profileData = {}; // Inicializamos profileData
    }

    async connectedCallback() {
        try {
            const response = await fetch('../Assets/profileData.json');
            const data = await response.json();
            
            // Obtener el ID del perfil de los parámetros de la URL o usar el primero
            const urlParams = new URLSearchParams(window.location.search);
            const profileId = urlParams.get('id') || '1';
            this.profileData = data.profiles.find((p: any) => p.id === profileId) || data.profiles[0];
            
            this.render();
        } catch (error) {
            console.error("Error loading profile data:", error);
            this.profileData = this.getDefaultProfile();
            this.render();
        }
    }

    getDefaultProfile() {
        return {
            id: "0",
            username: "Usuario",
            handle: "@usuario",
            joinDate: "Fecha desconocida",
            bio: "Biografía no disponible",
            avatar: "https://i.pravatar.cc/150?img=0",
            stats: {
                posts: 0,
                followers: 0,
                following: 0
            },
            posts: []
        };
    }

    render() {
        if (!this.profileData) {
            this.profileData = this.getDefaultProfile();
        }

        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    color: white;
                    font-family: Arial, sans-serif;
                    background-color: #111;
                    min-height: calc(100vh - 120px);
                }
                
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                }
                
                .profile-pic {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #FF0808;
                }
                
                .profile-info h2 {
                    margin: 0;
                    font-size: 28px;
                }
                
                .profile-info p {
                    margin: 5px 0;
                    color: #A4A4A4;
                }
                
                .profile-stats {
                    display: flex;
                    gap: 20px;
                    margin: 15px 0;
                }
                
                .stat {
                    text-align: center;
                }
                
                .stat-value {
                    font-weight: bold;
                    color: #FF0808;
                }
                
                .section {
                    margin-bottom: 30px;
                    background: #222;
                    padding: 20px;
                    border-radius: 10px;
                }
                
                .section h3 {
                    border-bottom: 2px solid #FF0808;
                    padding-bottom: 5px;
                    margin-top: 0;
                }
                
                .posts-list {
                    list-style: none;
                    padding: 0;
                }
                
                .post-item {
                    background: #333;
                    padding: 15px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                }
                
                .edit-form {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                label {
                    display: block;
                    margin-bottom: 5px;
                    color: #FF0808;
                }
                
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    background: #333;
                    border: 1px solid #FF0808;
                    border-radius: 4px;
                    color: white;
                }
                
                button {
                    background: #FF0808;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                
                .full-width {
                    grid-column: 1 / -1;
                }
            </style>
            
            <div class="profile-container">
                <div class="profile-header">
                    <img src="${this.profileData.avatar}" alt="Profile picture" class="profile-pic">
                    <div class="profile-info">
                        <h2>${this.profileData.username}</h2>
                        <p>${this.profileData.handle}</p>
                        <p>Miembro desde: ${this.profileData.joinDate}</p>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <div class="stat-value">${this.profileData.stats.posts}</div>
                                <div>Posts</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">${this.profileData.stats.followers}</div>
                                <div>Seguidores</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">${this.profileData.stats.following}</div>
                                <div>Siguiendo</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3>DESCRIPTION</h3>
                    <p>${this.profileData.bio}</p>
                </div>
                
                <div class="section">
                    <h3>POSTS</h3>
                    <ul class="posts-list">
                        ${this.profileData.posts.map((post: any) => `
                            <li class="post-item">
                                <strong>${post.title}</strong>
                                <p>${post.content}</p>
                                <small>${post.date} • ${post.likes} likes</small>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Edit profile</h3>
                    <form class="edit-form" id="profile-form">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" value="${this.profileData.username}">
                        </div>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" value="${this.profileData.handle}">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" value="${this.profileData.email || 'user@example.com'}">
                        </div>
                        <div class="form-group full-width">
                            <label for="bio">Bio</label>
                            <textarea id="bio" rows="4">${this.profileData.bio}</textarea>
                        </div>
                        <div class="form-group full-width">
                            <label>CHANGE YOUR PICTURE</label>
                            <input type="file" id="profile-pic">
                        </div>
                        <div class="form-group full-width">
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.setupForm();
    }

    setupForm() {
        const form = this.shadowRoot?.getElementById('profile-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Profile updated! (This would save to server in a real app)');
        });
    }
}

customElements.define('profile-component', ProfileComponent);
export default ProfileComponent;