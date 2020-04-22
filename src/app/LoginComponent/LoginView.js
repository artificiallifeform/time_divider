import person from '../../fonts/person.svg';

class LoginView {
  constructor(actions) {
    this.loginWrapper = document.querySelector('.login-wrapper');

    this.formSubmit = actions.formSubmit;
    this.inputChange = actions.inputChange;
    this.userLogout = actions.userLogout;
  }

  authSucceed(username) {
    const { loginWrapper: lw } = this;
    lw.removeChild(lw.lastChild);

    const span = document.createElement('span');
    span.innerText = username;

    const btn = document.createElement('button');
    btn.innerText = 'Logout';
    btn.classList.add('btn', 'small', 'logout');
    btn.addEventListener('click', () => {
      this.userLogout();
    });

    const image = document.createElement('img');
    image.src = person;
    image.classList.add('login-icon');

    lw.appendChild(image);
    lw.appendChild(span);
    lw.appendChild(btn);
  }

  authFailed() {
    const { loginWrapper: lw } = this;
    lw.innerHTML = '';

    let form = document.createElement('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.formSubmit();
    });
    form.classList.add('form');

    let input = document.createElement('input');
    input.addEventListener('input', (e) => {
      this.inputChange(e.target.value);
    });
    input.classList.add('input', 'small');

    let btn = document.createElement('input');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('value', 'Login');
    btn.classList.add('btn', 'small');
    btn.innerText = 'login';

    form.appendChild(input);
    form.appendChild(btn);

    this.loginWrapper.appendChild(form);
  }
}

export default LoginView;
