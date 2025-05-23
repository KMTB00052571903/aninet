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
                    padding: 20px;
                    background-color: #111111;
                    color: white;
                    font-family: 'Lato', sans-serif;
                    min-height: 70vh;
                }

                .profile-container {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                }

                .profile-pic {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #FF0808;
                    margin-bottom: 20px;
                }

                .username {
                    font-size: 2rem;
                    margin: 10px 0;
                    color: #FF0808;
                }

                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin: 30px 0;
                }

                .stat-item {
                    background: #1a1a1a;
                    padding: 15px 25px;
                    border-radius: 10px;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #FF0808;
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: #A4A4A4;
                }
            </style>

            <div class="profile-container">
                <img class="profile-pic" src="" alt="Profile">
                <h1 class="username">Username</h1>
                <p>Anime enthusiast | 250 completed</p>
                
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">150</div>
                        <div class="stat-label">Favorites</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">85</div>
                        <div class="stat-label">Watching</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">250</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;