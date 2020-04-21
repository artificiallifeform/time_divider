import '../../styles/onemore.css';
import { input, loginForm } from './loginSelectors';
import LoginModel from './LoginModel';
import initLoginView from './LoginView';


function initLoginController() {
  // Initialize View Component and A Model compnent
  // Then initialize Controller in index.js
  const loginModel = new LoginModel();
  initLoginView();
  loginModel.checkForToken();

  input.addEventListener('input', e => {
    loginModel.changeValue(e.target.value);
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginModel.submitLogin();
  });
}

export default initLoginController;
