
export default class SignupForm extends HTMLElement {
    connectedCallback() {
      this.render();
      this.querySelector("form")!.addEventListener("submit", this.handleSubmit);
    }
  
    handleSubmit(event:any) {
      event.preventDefault();
      const form = event.target;
      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
  
      if (!username || !email || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
  
      // Aquí podrías guardar el usuario en el estado global simulado
      console.log("Usuario registrado:", { username, email });
  
      alert("¡Registro exitoso!");
      form.reset();
    }
  
    render() {
      this.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-12">
          <form class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
            <h2 class="text-2xl font-bold text-center text-gray-800">Crear cuenta</h2>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input type="text" name="username" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input type="email" name="email" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" name="password" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input type="password" name="confirmPassword" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
  
            <button type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300">
              Registrarse
            </button>
          </form>
        </div>
      `;
    }
  }
  