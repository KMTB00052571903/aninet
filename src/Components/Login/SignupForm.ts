import { AuthService } from '../../services/auth-service';

export default class SignupForm extends HTMLElement {
    private authService: AuthService;

    constructor() {
        super();
        this.authService = new AuthService();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    private setupEventListeners() {
        this.querySelector("form")!.addEventListener("submit", this.handleSubmit.bind(this));
        this.querySelector("#login-link")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.navigateToLogin();
        });
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const username = form.username.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (!username || !email || !password || !confirmPassword) {
            this.showError("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            this.showError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await this.authService.signUp(email, password, username);
            this.showSuccess("¡Registro exitoso! Redirigiendo...");
            
            // Redirigir después de registro exitoso
            setTimeout(() => {
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.innerHTML = '<profile-page></profile-page>';
                }
                
                // Actualizar el header
                const header = document.querySelector('header-component');
                if (header) {
                    header.innerHTML = header.innerHTML.replace('Sign In', 'Profile');
                }
            }, 2000);
        } catch (error: any) {
            this.showError(error.message);
        }
    }

    private navigateToLogin() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = '<login-form></login-form>';
        }
    }

    private showError(message: string) {
        const errorElement = this.querySelector('#error-message') as HTMLElement;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            alert(message);
        }
    }

    private showSuccess(message: string) {
        const successElement = this.querySelector('#success-message') as HTMLElement;
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        } else {
            alert(message);
        }
    }

    render() {
        this.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-12">
          <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
            <h2 class="text-2xl font-bold text-center text-gray-800">Crear cuenta</h2>
            
            <!-- Mensajes de error y éxito -->
            <div id="error-message" class="mb-4 p-2 bg-red-600 text-white rounded hidden"></div>
            <div id="success-message" class="mb-4 p-2 bg-green-600 text-white rounded hidden"></div>
            
            <form>
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
            
            <p class="text-center text-gray-600">
              ¿Ya tienes una cuenta? 
              <a href="#" id="login-link" class="text-blue-600 hover:underline">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
      `;
    }
}