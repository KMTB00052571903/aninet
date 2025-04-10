export default class LoginForm extends HTMLElement {
    connectedCallback() {
      this.render();
      this.querySelector("form").addEventListener("submit", this.handleSubmit);
      this.querySelector("#close-btn")?.addEventListener("click", () => {
        this.remove(); // o this.style.display = 'none';
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value.trim();
      const password = form.password.value;
  
      if (!email || !password) {
        alert("Todos los campos son obligatorios");
        return;
      }
  
      // Simulación de login (aquí podrías conectar con tu estado global mock)
      console.log("Inicio de sesión:", { email });
      alert("¡Bienvenido de nuevo!");
      form.reset();
    }
  
    render() {
      this.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-12">
          <div class="bg-zinc-900 text-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <button id="close-btn" class="absolute top-4 right-4 text-red-500 text-2xl font-bold hover:scale-125 transition">&times;</button>
            
            <div class="flex justify-center mb-6">
              <div class="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl">
                🔒
              </div>
            </div>
            
            <h2 class="text-center text-2xl font-bold mb-4">Iniciar sesión</h2>
            
            <form class="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                class="bg-black border border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                class="bg-black border border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                class="bg-red-600 hover:bg-red-700 py-2 rounded-md font-semibold transition"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      `;
    }
  }
  