import { store } from '../flux/Store';

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        #header {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 20px 150px;
          background: linear-gradient(#111111, transparent);
          position: fixed;
          top: 0;
          z-index: 1000;
        }
        
        img {
          width: 200px;
          cursor: pointer;
        }
        
        #navbar {
          display: flex;
          align-items: center;
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

  setupEventListeners() {
    const currentPage = store.getState().currentPage;
    this.updateActiveLink(currentPage);

    store.subscribe(() => {
      const newPage = store.getState().currentPage;
      this.updateActiveLink(newPage);
    });

    this.shadowRoot!.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const route = link.getAttribute('data-route');
        if (route) {
          store.dispatch({
            type: 'NAVIGATE',
            payload: route
          });
          
          history.pushState({}, '', route);
        }
      });
    });

    this.shadowRoot!.querySelector('#logo img')?.addEventListener('click', () => {
      store.dispatch({
        type: 'NAVIGATE',
        payload: 'home'
      });
      history.pushState({}, '', 'home');
    });
  }

  updateActiveLink(currentPage: string) {
    this.shadowRoot!.querySelectorAll('.nav-link').forEach(link => {
      const route = link.getAttribute('data-route');
      if (route === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

customElements.define('header-component', HeaderComponent);
export default HeaderComponent;