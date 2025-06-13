import { getCurrentUser } from "../firebase/auth";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addNavListeners();
    this.addLoginHandler();
    this.addProfileHandler();
    this.addEventListener("auth-changed", () => {
      this.render();
      this.addNavListeners();
      this.addLoginHandler();
      this.addProfileHandler();
    });
  }

  addNavListeners() {
    const shadow = this.shadowRoot!;
    shadow.querySelector('[data-route="home"]')?.addEventListener("click", () => {
      window.location.reload();
    });

    shadow.querySelector('[data-route="watch"]')?.addEventListener("click", () => {
      this.navigateTo('<explore-page></explore-page>');
    });

    shadow.querySelector('[data-route="categories"]')?.addEventListener("click", () => {
      this.navigateTo('<categories-page></categories-page>');
    });
  }

 addLoginHandler() {
  const loginBtn = this.shadowRoot!.querySelector('[data-route="login"]');
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      console.log("✅ Log In button clicked"); // <- mensaje en consola

      // Login 
      if (!document.querySelector("login-form")) {
        const login = document.createElement("login-form");
        document.body.appendChild(login);
      }
    });
  }
}


  addProfileHandler() {
    const profileBtn = this.shadowRoot!.querySelector('[data-route="profile"]');
    if (profileBtn) {
      profileBtn.addEventListener("click", () => {
        this.navigateTo('<profile-page></profile-page>');
      });
    }
  }

  navigateTo(content: string) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = content;
    }
  }

  render() {
    const user = getCurrentUser();
    const isLoggedIn = !!user;

    this.shadowRoot!.innerHTML = `
      <style>
        #header {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          padding: 35px;
          padding-left: 150px;
          padding-right: 150px;
          margin-left: -100px;
          background: linear-gradient(#111111, transparent)
        }
        img {
          width: 335px;
        }
        #navbar {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 810px;
          gap: 48px;
        }
        .nav-link {
          font-size: 18px;
          color: white;
          cursor: pointer;
          margin: 0;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          position: relative;
        }
        .nav-link:hover {
          color: #FF0808;
        }
        .nav-link.active {
          color: #FF0808;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #FF0808;
        }
        @media (max-width: 1200px) {
          #header {
            padding-left: 50px;
            padding-right: 50px;
            margin-left: 0;
          }
          img {
            width: 280px;
          }
          #navbar {
            width: 650px;
            gap: 30px;
          }
        }
        @media (max-width: 992px) {
          #header {
            flex-direction: column;
            gap: 20px;
            padding: 25px 20px;
          }
          #navbar {
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .nav-link {
            font-size: 16px;
          }
        }
        @media (max-width: 576px) {
          img {
            width: 220px;
          }
          .nav-link {
            font-size: 14px;
            letter-spacing: 0.5px;
          }
        }
      </style>

      <header id="header">
        <logo id="logo">
          <img src="https://i.ibb.co/PG67j7TQ/logo-medium-white.png" alt="Aninet">
        </logo>
        <navbar id="navbar">
          <p class="nav-link" data-route="home">Home</p>
          <p class="nav-link" data-route="watch">Watch</p>
          <p class="nav-link" data-route="categories">Categories</p>
          ${
            isLoggedIn
              ? `<p class="nav-link" data-route="profile">Profile</p>`
              : `<p class="nav-link" data-route="login">Log In</p>`
          }
        </navbar>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
export default HeaderComponent;
