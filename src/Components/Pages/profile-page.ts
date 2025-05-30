import { logout } from "../../fireBase/auth";

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

        .logout-btn {
          background-color: #FF0808;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 20px;
          width: 100%;
          transition: background-color 0.3s ease;
        }

        .logout-btn:hover {
          background-color: #cc0000;
        }

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
            Currently reading the manga and collecting figures.
          </p>

          <!-- Botón de logout -->
          <button class="logout-btn" id="logout-btn">Cerrar sesión</button>
        </div>
      </div>
    `;

    const logoutBtn = this.shadowRoot!.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logout().then(() => {
          location.reload();
        });
      });
    }
  }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;