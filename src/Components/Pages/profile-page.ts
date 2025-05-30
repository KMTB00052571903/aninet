import { logout } from "../../firebase/auth";

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

        /* Solo estilo esencial incluido, puedes mantener el resto */
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
          location.reload(); // O puedes redirigir a inicio si quieres
        });
      });
    }
  }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;
