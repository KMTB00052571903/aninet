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
      this.shadowRoot!.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          const route = (e.target as HTMLElement).getAttribute('data-route');
          if (route === 'watch') {
            this.navigateToExplore();
          }
        });
      });
    }

    navigateToExplore() {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.innerHTML = '<explore-page></explore-page>';
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
                  /* Responsive styles */
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
        </navbar>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
export default HeaderComponent;
  