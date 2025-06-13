import './Components/Login/SignupForm';
import './Components/Login/LoginForm';
import './Components/header';
import './Components/footer';
import './Components/Posts/postlist';
import './Components/Posts/post';
import './Components/Pages/explore-page';
import './Components/Pages/categories-page';
import './Components/Pages/profile-page';
import { store } from './Flux/Store';


import { initAuth } from "./fireBase/auth";

initAuth(() => {
  const header = document.querySelector('header-component');
  if (header) {
    header.dispatchEvent(new Event('auth-changed'));
  }
});
