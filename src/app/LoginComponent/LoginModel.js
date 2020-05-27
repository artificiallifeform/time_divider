import axios from 'axios';
import { setJsonStorage, getJsonStorage } from '../utils/storageParser';

class LoginModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.url = 'http://localhost:5000/auth/';
  }

  async submitLogin(username) {
    if (username.length === 0) {
      console.warn('Input cant be empty');
      return;
    }

    try {
      let response = await axios.post(this.url, { username }, this.config);
      setJsonStorage('user', {
        username: response.data.username,
        id: response.data.id,
      });
      const user = {
        username: response.data.username,
      };
      return user;
    } catch (err) {
      throw Error('Something wrong with an API');
    }
  }

  checkForToken() {
    let token = getJsonStorage('user').username;
    if (token) {
      return this.submitLogin(token);
    } else {
      return null;
    }
  }

  clearUser() {
    localStorage.removeItem('user');
  }
  // TODO: Also need to disable form submission if user didn't enter anythin in the field
}

export default LoginModel;
