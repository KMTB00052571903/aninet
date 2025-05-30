import { AuthService } from '../../services/auth-service';

export default class LoginForm extends HTMLElement {
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
        this.querySelector("#close-btn")?.addEventListener("click", () => {
            this.remove();
        });
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            this.showError("Todos los campos son obligatorios");
            return;
        }

        try {
            await this.authService.signIn(email, password);
            this.showSuccess("¡Bienvenido de nuevo!");
            form.reset();
            
            // Redirigir después de login exitoso
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.innerHTML = '<profile-page></profile-page>';
            }
            
            // Actualizar el header para mostrar "Profile" en lugar de "Sign In"
            const header = document.querySelector('header-component');
            if (header) {
                header.innerHTML = header.innerHTML.replace('Sign In', 'Profile');
            }
        } catch (error: any) {
            this.showError(error.message);
        }
    }

    private showError(message: string) {
        const errorElement = this.querySelector('#error-message') as HTMLElement;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            alert(message); // Fallback si no existe el elemento de error
        }
    }

    private showSuccess(message: string) {
        const successElement = this.querySelector('#success-message') as HTMLElement;
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
            setTimeout(() => successElement.style.display = 'none', 3000);
        } else {
            alert(message); // Fallback si no existe el elemento de éxito
        }
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
            
            <!-- Mensajes de error y éxito -->
            <div id="error-message" class="mb-4 p-2 bg-red-600 text-white rounded hidden"></div>
            <div id="success-message" class="mb-4 p-2 bg-green-600 text-white rounded hidden"></div>
            
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
            
            <p class="text-center mt-4">
              ¿No tienes una cuenta? 
              <a href="#" id="signup-link" class="text-red-500 hover:underline">Regístrate aquí</a>
            </p>
          </div>
        </div>
      `;
    }
}