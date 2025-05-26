class ProfilePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Lato', sans-serif;
                    background-color: #111111;
                    color: white;
                    min-height: 100vh;
                }

                /* Banner y foto de perfil */
                .profile-header {
                    position: relative;
                    margin-bottom: 100px;
                }

                .banner {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    background-color: #1a1a1a;
                }

                .profile-pic-container {
                    position: absolute;
                    bottom: -75px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .profile-pic {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid #FF0808;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                    transition: all 0.3s ease;
                }

                .profile-pic:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(255, 8, 8, 0.4);
                }

                /* Contenido principal */
                .profile-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    gap: 30px;
                }

                @media (max-width: 768px) {
                    .profile-content {
                        grid-template-columns: 1fr;
                    }
                }

                /* Información del usuario */
                .user-info {
                    background: #1a1a1a;
                    border-radius: 10px;
                    padding: 20px;
                    position: sticky;
                    top: 20px;
                }

                .username {
                    font-size: 1.8rem;
                    margin: 20px 0 5px;
                    color: #FF0808;
                    text-align: center;
                }

                .user-title {
                    color: #FFA500;
                    font-size: 1rem;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .user-bio {
                    font-size: 0.9rem;
                    line-height: 1.5;
                    color: #ccc;
                    margin-bottom: 20px;
                }

                .user-stats {
                    margin-top: 20px;
                }

                .stat-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #333;
                }

                .stat-label {
                    color: #A4A4A4;
                }

                .stat-value {
                    color: #FFA500;
                    font-weight: bold;
                }

                /* Contenido principal */
                .main-content {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                /* Pestañas */
                .tabs {
                    display: flex;
                    border-bottom: 2px solid #333;
                    margin-bottom: 20px;
                }

                .tab {
                    padding: 10px 20px;
                    cursor: pointer;
                    color: #A4A4A4;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .tab:hover {
                    color: white;
                }

                .tab.active {
                    color: #FF0808;
                }

                .tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #FF0808;
                }

                /* Posts */
                .post {
                    background: #1a1a1a;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;
                }

                .post:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .post-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .post-user-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                .post-user-info {
                    flex-grow: 1;
                }

                .post-username {
                    font-weight: bold;
                    color: #FFA500;
                }

                .post-time {
                    font-size: 0.8rem;
                    color: #A4A4A4;
                }

                .post-content {
                    margin-bottom: 15px;
                    line-height: 1.5;
                }

                .post-image {
                    width: 100%;
                    border-radius: 8px;
                    margin-bottom: 15px;
                    max-height: 400px;
                    object-fit: cover;
                }

                .post-footer {
                    display: flex;
                    align-items: center;
                    color: #A4A4A4;
                    font-size: 0.9rem;
                }

                .post-action {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .post-action:hover {
                    color: #FF0808;
                }

                .post-action i {
                    margin-right: 5px;
                }

                /* Botones */
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #FF0808;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    text-align: center;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                    width: 100%;
                }

                .btn:hover {
                    background-color: #ff3333;
                    transform: translateY(-2px);
                }

                .btn-secondary {
                    background-color: transparent;
                    border: 1px solid #FF0808;
                    color: #FF0808;
                }

                .btn-secondary:hover {
                    background-color: rgba(255, 8, 8, 0.1);
                }

                /* Sección de comentarios */
                .comment {
                    display: flex;
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #333;
                }

                .comment-user-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 15px;
                }

                .comment-content {
                    flex-grow: 1;
                }

                .comment-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                }

                .comment-username {
                    font-weight: bold;
                    color: #FFA500;
                    margin-right: 10px;
                }

                .comment-time {
                    font-size: 0.8rem;
                    color: #A4A4A4;
                }

                .comment-text {
                    line-height: 1.5;
                    font-size: 0.9rem;
                }

                .comment-actions {
                    display: flex;
                    margin-top: 10px;
                    font-size: 0.8rem;
                }

                .comment-action {
                    margin-right: 15px;
                    cursor: pointer;
                    color: #A4A4A4;
                    transition: color 0.2s ease;
                }

                .comment-action:hover {
                    color: #FF0808;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .profile-pic {
                        width: 120px;
                        height: 120px;
                    }

                    .profile-pic-container {
                        bottom: -60px;
                    }

                    .banner {
                        height: 200px;
                    }

                    .tabs {
                        overflow-x: auto;
                        white-space: nowrap;
                    }
                }
            </style>

            <div class="profile-header">
                <div class="banner"></div>
                <div class="profile-pic-container">
                    <img class="profile-pic" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222585/wp13059119_lmbkte.webp" alt="Profile Picture">
                </div>
            </div>

            <div class="profile-content">
                <div class="user-info">
                    <h1 class="username">RandomFan</h1>
                    <p class="user-title">Chainsaw Man Fan | Anime in General Fan</p>
                    <p class="user-bio">
                        Biggest Chainsaw Man fan ever! Love Denji, Power and Makima.
                        Currently reading the manga and collecting figures. Let's talk about the latest chapters!
                    </p>

                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-label">Posts</span>
                            <span class="stat-value">156</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Comments</span>
                            <span class="stat-value">842</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Following</span>
                            <span class="stat-value">127</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Followers</span>
                            <span class="stat-value">589</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Joined</span>
                            <span class="stat-value">2 years ago</span>
                        </div>
                    </div>

                    <button class="btn">Edit Profile</button>
                    <button class="btn btn-secondary">Message</button>
                </div>

                <div class="main-content">
                    <div class="tabs">
                        <div class="tab active">Posts</div>
                        <div class="tab">Comments</div>
                        <div class="tab">Favorites</div>
                        <div class="tab">Media</div>
                        <div class="tab">About</div>
                    </div>

                    <div class="post">
                        <div class="post-header">
                            <img class="post-user-img" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222585/wp13059119_lmbkte.webp" alt="User">
                            <div class="post-user-info">
                                <div class="post-username">DenjiFan</div>
                                <div class="post-time">2 days ago</div>
                            </div>
                        </div>
                        <div class="post-content">
                            I can't believe the real demon of death is this bitch jsjsjsj, it even took me by surprise!
                        </div>
                        <img class="post-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222836/afa8b843-7ab4-4ee8-a9a1-13b3b67ac31f_y7vkz5.avif" alt="Chainsaw Man Manga">
                        <div class="post-footer">
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg></i> 124 Likes
                            </div>
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
</svg></i> 32 Comments
                            </div>
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
</svg></i> Share
                            </div>
                        </div>
                    </div>

                    <div class="post">
                        <div class="post-header">
                            <img class="post-user-img" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222585/wp13059119_lmbkte.webp" alt="User">
                            <div class="post-user-info">
                                <div class="post-username">DenjiFan</div>
                                <div class="post-time">1 week ago</div>
                            </div>
                        </div>
                        <div class="post-content">
                            Theory about the latest chapter: I think Pochita is actually... (spoilers ahead)
                        </div>
                        <div class="post-footer">
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg></i> 89 Likes
                            </div>
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
</svg></i> 45 Comments
                            </div>
                            <div class="post-action">
                                <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
</svg></i> Share
                            </div>
                        </div>
                    </div>

                    <h3>Recent Comments</h3>
                    <div class="comment">
                        <img class="comment-user-img" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222585/wp13059119_lmbkte.webp" alt="User">
                        <div class="comment-content">
                            <div class="comment-header">
                                <div class="comment-username">DenjiFan</div>
                                <div class="comment-time">3 hours ago</div>
                            </div>
                            <div class="comment-text">
                                I totally agree! The character development in this arc has been phenomenal.
                            </div>
                            <div class="comment-actions">
                                <div class="comment-action">Like</div>
                                <div class="comment-action">Reply</div>
                            </div>
                        </div>
                    </div>

                    <div class="comment">
                        <img class="comment-user-img" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748222585/wp13059119_lmbkte.webp" alt="User">
                        <div class="comment-content">
                            <div class="comment-header">
                                <div class="comment-username">DenjiFan</div>
                                <div class="comment-time">1 day ago</div>
                            </div>
                            <div class="comment-text">
                                That's an interesting perspective. I never thought about it that way before!
                            </div>
                            <div class="comment-actions">
                                <div class="comment-action">Like</div>
                                <div class="comment-action">Reply</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;