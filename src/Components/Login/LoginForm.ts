export default class LoginForm extends HTMLElement {
  constructor() {
    super();
    console.log("✅ LoginForm component constructed");
  }

  connectedCallback() {
    this.render();
    console.log("✅ LoginForm connected to DOM");

    this.shadowRoot!.querySelector("form")!.addEventListener("submit", this.handleSubmit);
    this.shadowRoot!.querySelector("#close-btn")?.addEventListener("click", () => {
      this.remove();
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value;

    if (!email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    console.log("Inicio de sesión:", { email });
    alert("¡Bienvenido de nuevo!");
    form.reset();
  }

  render() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .popup {
          background-color: #1f1f1f;
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          max-width: 400px;
          width: 100%;
          position: relative;
          font-family: sans-serif;
        }

        #close-btn {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          font-size: 1.5rem;
          color: red;
          background: none;
          border: none;
          cursor: pointer;
        }

        input, button {
          width: 100%;
          margin-top: 0.75rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #555;
          background: #000;
          color: white;
        }

        button {
          background-color: red;
          border: none;
          font-weight: bold;
        }

        button:hover {
          background-color: #c00;
        }
      </style>

      <div class="overlay">
        <div class="popup">
          <button id="close-btn">&times;</button>
          <h2>Login</h2>
          <form>
            <input type="email" name="email" placeholder="Correo electrónico" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
