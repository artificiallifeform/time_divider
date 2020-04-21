import "regenerator-runtime/runtime.js";
import loginController from './LoginComponent/LoginController';

import '../styles/index.css';

const btn = document.createElement('button');
btn.innerText = "Click!!!";
btn.onclick = () => {
  import('./testingComp').then(module => module.default());
}
document.body.appendChild(btn);

function init() {
  // Init Login Controller
  loginController();

}

const par = document.createElement('p');
par.innerText = 'Florrie is veryasdfasdfsdf';
document.body.appendChild(par);

init();