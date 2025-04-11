export default class LoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector("form")?.addEventListener("submit", this.handleSubmit);
    this.querySelector("#close-btn")?.addEventListener("click", () => {
      this.remove();
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

    console.log("Inicio de sesión:", { email });
    alert("¡Bienvenido de nuevo!");
    form.reset();
  }

  render() {
    this.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div class="bg-zinc-900 text-white rounded-xl w-full max-w-md mx-auto relative">
          <button id="close-btn" class="absolute top-4 right-4 text-red-500 text-2xl font-bold hover:scale-125 transition">&times;</button>
          
          <div class="p-8">
            <div class="flex justify-center mb-6">
              <div class="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mb-4">
                🔒
              </div>
            </div>
            
            <h2 class="text-center text-2xl font-bold mb-6">Sign in to ANINET</h2>
            
            <div class="flex flex-col gap-3 mb-6">
              <button class="bg-white text-black flex items-center justify-center gap-2 py-2 px-4 rounded-full font-medium">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="20" alt="Google">
                Sign in with Google
              </button>
              
              <button class="bg-black text-white border border-gray-600 flex items-center justify-center gap-2 py-2 px-4 rounded-full font-medium">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width="20" alt="Apple">
                Sign in with Apple
              </button>
            </div>
            
            <div class="relative my-6">
              <div class="border-t border-gray-600"></div>
              <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-gray-400">or</span>
            </div>
            
            <form class="flex flex-col gap-4">
              <input
                type="text"
                name="email"
                placeholder="Phone, email, or username"
                required
                class="bg-black border border-gray-600 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              
              <button
                type="submit"
                class="bg-red-600 hover:bg-red-700 py-3 rounded-full font-semibold transition"
              >
                Next
              </button>
            </form>
            
            <div class="mt-6 text-center text-sm text-gray-400">
              <a href="#" class="text-red-500 hover:underline">Forgot password?</a>
              <p class="mt-2">Don't have an account? <a href="#" class="text-red-500 hover:underline">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}