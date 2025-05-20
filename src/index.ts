
import HeaderComponent from './Components/header';
import FooterComponent from './Components/footer';
import PostList from './Components/Posts/postlist';
import SignupForm from "./Components/Login/SignupForm";
import LoginForm from "./Components/Login/LoginForm";
import PostCreator from './Components/Posts/post';

customElements.define("header-component", HeaderComponent)
customElements.define('footer-component', FooterComponent);
customElements.define('post-list', PostList);;
customElements.define("signup-form", SignupForm);
customElements.define("login-form", LoginForm);    
customElements.define('post-creator', PostCreator);