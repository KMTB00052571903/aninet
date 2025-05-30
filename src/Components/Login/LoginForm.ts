import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("LoginForm component constructed");
  }

  connectedCallback() {
    this.render();
    console.log("LoginForm connected to DOM");

    this.shadowRoot?.querySelector("form")?.addEventListener("submit", this.handleSubmit.bind(this));
    this.shadowRoot?.querySelector("#close-btn")?.addEventListener("click", () => this.remove());
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value;

    if (!email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Bienvenido de nuevo!");
      document.querySelector("main")!.innerHTML = "<profile-page></profile-page>";
      document.querySelector("header-component")?.dispatchEvent(new Event("auth-changed"));
      this.remove();
    } catch (error: any) {
      alert("Error al iniciar sesión: " + error.message);
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal {
          background-color: #1a1a1a;
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          max-width: 400px;
          width: 100%;
          position: relative;
        }

        .modal h2 {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .close-btn {
          position: absolute;
          top: 10px; right: 15px;
          background: none;
          border: none;
          color: red;
          font-size: 1.5rem;
          cursor: pointer;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        input {
          padding: 0.6rem 1rem;
          border: 1px solid #333;
          background: black;
          color: white;
          border-radius: 0.5rem;
        }

        button[type="submit"] {
          background-color: red;
          border: none;
          padding: 0.7rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        button[type="submit"]:hover {
          background-color: #cc0000;
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <button class="close-btn" id="close-btn">&times;</button>
          <h2>Login</h2>
          <form>
            <input name="email" type="email" placeholder="Correo electrónico" required />
            <input name="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
