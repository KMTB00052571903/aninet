import { AuthService } from '../../services/auth-service';

export class LoginForm extends HTMLElement {
    private authService: AuthService;
    private isLogin = true;
    private failedAttempts = 0;
    private lastAttemptTime = 0;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.authService = new AuthService();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.checkAuthState();
    }

    private checkAuthState() {
        this.authService.onAuthStateChanged((user) => {
            if (user) {
                this.dispatchEvent(new CustomEvent('login-success'));
                this.remove();
            }
        });
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const emailInput = form.querySelector('#email') as HTMLInputElement;
        const passwordInput = form.querySelector('#password') as HTMLInputElement;
        const usernameInput = form.querySelector('#username') as HTMLInputElement;
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const errorElement = form.querySelector('.error-message') as HTMLDivElement;
        const now = Date.now();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const username = usernameInput?.value.trim();

        // Rate limiting
        if (this.failedAttempts >= 3 && now - this.lastAttemptTime < 30000) {
            const timeLeft = Math.ceil((30000 - (now - this.lastAttemptTime)) / 1000);
            if (errorElement) {
                errorElement.textContent = `Too many attempts. Please try again in ${timeLeft} seconds.`;
                errorElement.style.display = 'block';
            }
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
                </svg>
                ${this.isLogin ? 'Signing in...' : 'Creating account...'}
            `;

            if (this.isLogin) {
                await this.authService.signIn(email, password);
                this.failedAttempts = 0;
            } else {
                if (!username) {
                    throw new Error('Username is required');
                }
                await this.authService.signUp(email, password, username);
            }
        } catch (error: any) {
            this.lastAttemptTime = now;
            this.failedAttempts++;
            if (errorElement) {
                let errorMessage = error.message;
                
                if (error.message.includes('user-not-found')) {
                    errorMessage = 'No account found with this email. Would you like to create one?';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('wrong-password')) {
                    errorMessage = `Incorrect password. ${3 - this.failedAttempts} attempts remaining.`;
                    passwordInput.classList.add('error');
                    passwordInput.focus();
                    passwordInput.value = '';
                } else if (error.message.includes('email-already-in-use')) {
                    errorMessage = 'This email is already registered. Please sign in instead.';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('invalid-email')) {
                    errorMessage = 'Please enter a valid email address (e.g., user@example.com)';
                    emailInput.classList.add('error');
                    emailInput.focus();
                } else if (error.message.includes('weak-password')) {
                    errorMessage = 'Password must be at least 6 characters and include both letters and numbers';
                    passwordInput.classList.add('error');
                    passwordInput.focus();
                } else if (error.message.includes('Username is required')) {
                    errorMessage = 'Please enter a username';
                    usernameInput?.classList.add('error');
                    usernameInput?.focus();
                }

                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                errorElement.classList.add('shake');
                setTimeout(() => {
                    errorElement.classList.remove('shake');
                }, 500);
            }
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = this.isLogin ? 'Sign In' : 'Sign Up';
        }
    }

    private toggleMode() {
        this.isLogin = !this.isLogin;
        this.render();
    }

    private setupEventListeners() {
        const form = this.shadowRoot?.querySelector('form');
        const toggleBtn = this.shadowRoot?.querySelector('.toggle-btn');

        form?.addEventListener('submit', this.handleSubmit.bind(this));
        toggleBtn?.addEventListener('click', this.toggleMode.bind(this));
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }

                .auth-container {
                    background: #111;
                    padding: 2.5rem;
                    border-radius: 10px;
                    box-shadow: 0 8px 24px rgba(255, 69, 0, 0.3);
                    width: 100%;
                    max-width: 420px;
                    transition: all 0.3s ease;
                    border: 2px solid #ff4500;
                    position: relative;
                }

                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #ff4500;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .close-btn:hover {
                    color: #ff6a00;
                    transform: scale(1.1);
                }

                h2 {
                    text-align: center;
                    color: #ff4500;
                    margin: 0 0 1.5rem;
                    font-size: 1.75rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #ff6a00;
                    font-size: 0.875rem;
                }

                input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ff4500;
                    border-radius: 5px;
                    background: #222;
                    color: white;
                    font-size: 1rem;
                }

                input:focus {
                    outline: none;
                    border-color: #ff6a00;
                    box-shadow: 0 0 0 2px rgba(255, 106, 0, 0.3);
                }

                button[type="submit"] {
                    width: 100%;
                    padding: 0.75rem;
                    background: #ff4500;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-top: 1rem;
                }

                button[type="submit"]:hover {
                    background: #ff6a00;
                }

                .toggle-btn {
                    width: 100%;
                    padding: 0.75rem;
                    background: transparent;
                    color: #ff4500;
                    border: 1px solid #ff4500;
                    border-radius: 5px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-top: 1rem;
                }

                .toggle-btn:hover {
                    background: rgba(255, 69, 0, 0.1);
                }

                .error-message {
                    color: white;
                    background: #ff4500;
                    padding: 0.75rem;
                    border-radius: 5px;
                    margin-top: 1rem;
                    display: none;
                    text-align: center;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                    border: 2px solid white;
                    border-top-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 8px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 480px) {
                    .auth-container {
                        padding: 1.5rem;
                        margin: 0 1rem;
                    }
                }
            </style>

            <div class="auth-container">
                <button class="close-btn" id="close-btn">&times;</button>
                <h2>${this.isLogin ? 'Sign In' : 'Sign Up'}</h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="your@email.com">
                    </div>
                    
                    ${!this.isLogin ? `
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" required placeholder="Choose a username">
                        </div>
                    ` : ''}
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required placeholder="Your password">
                    </div>
                    
                    <button type="submit">${this.isLogin ? 'Sign In' : 'Sign Up'}</button>
                    <div class="error-message"></div>
                </form>
                
                <button class="toggle-btn">
                    ${this.isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </button>
            </div>
        `;
    }
}

export default LoginForm;
customElements.define('login-form', LoginForm);