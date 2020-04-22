import "regenerator-runtime/runtime.js";
import '../styles/index.css';

import LoginViewModel from './LoginComponent/LoginViewModel';

function init() {
  // Init Login Controller
  new LoginViewModel();
}

init();