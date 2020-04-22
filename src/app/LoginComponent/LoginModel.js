import axios from 'axios';

class LoginModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.url = 'http://localhost:5000/auth';
  }

  async submitLogin(username) {
    if (username.length === 0) {
      console.warn('Input cant be empty');
      return;
    }

    try {
      let response = await axios.post(this.url, { username }, this.config);
      localStorage.setItem('username', response.data.user.username);
      return response.data.user;
    } catch (err) {
      throw Error('Something wrong with an API');
    }
  }

  checkForToken() {
    let token = localStorage.getItem('username');
    if (token) {
      return this.submitLogin(token);
    } else {
      return null;
    }
  }

  clearUser() {
    localStorage.removeItem('username');
  }
  // TODO: Also need to disable form submission if user didn't enter anythin in the field
}

export default LoginModel;
