import axios from 'axios';
import { setJsonStorage, getJsonStorage } from '../utils/storageParser';

class LoginModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.url = 'api/auth/';
  }

  async controlExpiredGoals() {
    // Check if there are any goals deadline run out of time
    // And set their status expired to 1 When user loggs in
    const date = Math.floor(new Date().getTime() / 1000);
    const user_id = getJsonStorage('user').id;

    const url = 'api/goals/expire';
    try {
      await axios.post(url, { date, user_id }, this.config);
    } catch (error) {
      console.error('Error while trying to update expired goals');
    }
  }

  async submitLogin(username) {
    const date = Math.floor(new Date().getTime() / 1000);

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
      await this.controlExpiredGoals(date, response.data.id);
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
