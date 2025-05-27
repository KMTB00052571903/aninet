import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default class SignupForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector("form")!.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = (form.username as HTMLInputElement).value.trim();
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value;
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value;

    if (!username || !email || !password || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      alert("¡Registro exitoso!");
      form.reset();
      window.location.href = "/"; // redirige si quieres
    } catch (error: any) {
      alert("Error al registrarse: " + error.message);
    }
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
