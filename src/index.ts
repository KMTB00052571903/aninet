import HeaderComponent from './Components/header';
import FooterComponent from './Components/footer';
import PostList from './Components/Posts/postlist';
import PostCreator from './Components/Posts/post';
import ExplorePage from './Components/Pages/explore-page';
import CategoriesPage from './Components/Pages/categories-page';
import ProfilePage from './Components/Pages/profile-page';
import LoginForm from './Components/Login/Login-Form';


customElements.define("header-component", HeaderComponent);
customElements.define('footer-component', FooterComponent);
customElements.define('post-list', PostList);
customElements.define('post-creator', PostCreator);
customElements.define('explore-page', ExplorePage);
customElements.define('categories-page', CategoriesPage);
customElements.define('profile-page', ProfilePage);
customElements.define('login-form', LoginForm);