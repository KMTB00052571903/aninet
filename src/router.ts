import { getCurrentUser } from './FireBase/auth';

const routes = {
  '/': 'explore-page',
  '/login': 'login-form',
  '/signup': 'signup-form',
  '/profile': 'profile-page',
  '/categories': 'categories-page',
  '/create-post': 'post-creator',
};

const privateRoutes = ['/profile', '/create-post'];

export function router() {
  const path = location.hash.slice(1) || '/';
  const isPrivate = privateRoutes.includes(path);

  // Proteger ruta si es privada
  if (isPrivate && !getCurrentUser()) {
    location.hash = '/login';
    return;
  }

const tagName = routes[path as keyof typeof routes] || 'explore-page';

  const main = document.getElementById('app');
  if (main) {
    main.innerHTML = `<${tagName}></${tagName}>`;
  }
}
