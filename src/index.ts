import Root from './Root/Root';
import HeaderComponent from './Components/header';
import FooterComponent from './Components/footer';
import PostList from './Components/postlist';
import ProfileComponent from './Components/profile';
import AnimeCatalog from './Components/Anime/AnimeCatalog';
import CategoriesPage from './Pages/categories-page';

customElements.define('app-root', Root);
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
customElements.define('post-list', PostList);
customElements.define('profile-component', ProfileComponent);
customElements.define('anime-catalog', AnimeCatalog);
customElements.define('categories-page', CategoriesPage);

document.body.innerHTML = '<app-root></app-root>';