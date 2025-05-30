class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Eventos para cada enlace de navegación
        this.shadowRoot!.querySelector('[data-route="home"]')?.addEventListener('click', () => {
            window.location.reload();
        });

        this.shadowRoot!.querySelector('[data-route="watch"]')?.addEventListener('click', () => {
            this.navigateTo('<explore-page></explore-page>');
        });

        this.shadowRoot!.querySelector('[data-route="categories"]')?.addEventListener('click', () => {
            this.navigateTo('<categories-page></categories-page>');
        });

        this.shadowRoot!.querySelector('[data-route="profile"]')?.addEventListener('click', () => {
            this.navigateTo('<profile-page></profile-page>');
        });

        // Event listener para el botón de Sign In - ¡ESTE ES EL IMPORTANTE!
        this.shadowRoot!.querySelector('#login-btn')?.addEventListener('click', (e) => {
            console.log('Botón Sign In clickeado'); // Para debug
            const loginForm = document.createElement('login-form');
            document.body.appendChild(loginForm);
            
            loginForm.addEventListener('login-success', () => {
                this.render(); // Actualizar el header después del login
            });

            // Cerrar el popup al hacer clic en el botón de cerrar
            loginForm.shadowRoot?.querySelector('#close-btn')?.addEventListener('click', () => {
                loginForm.remove();
            });
        });
    }

    navigateTo(content: string) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = content;
        }
    }

    render() {
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

        #login-btn {
            background: linear-gradient(45deg, #ff4500, #ff6a00);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(255, 69, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
          }

          #login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(255, 69, 0, 0.4);
          background: linear-gradient(45deg, #ff6a00, #ff4500);
          }

          #login-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(255, 69, 0, 0.3);
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
      </style>

        <header id="header">
            <logo id="logo">
                <img src="https://i.ibb.co/PG67j7TQ/logo-medium-white.png" alt="Aninet">
            </logo>
            <navbar id="navbar">
                <p class="nav-link" data-route="home">Home</p>
                <p class="nav-link" data-route="watch">Watch</p>
                <p class="nav-link" data-route="categories">Categories</p>
                <p class="nav-link" data-route="profile">Profile</p>
                <button id="login-btn">Sign In</button>
            </navbar>
        </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
export default HeaderComponent;