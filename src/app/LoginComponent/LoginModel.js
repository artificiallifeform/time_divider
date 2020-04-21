import axios from 'axios';

class LoginModel {
  constructor(value) {
    this.config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    this.url = 'http://localhost:5000/auth';
    this.inputValue = value;
    console.log('Login Model Initialized');
  }

  changeValue(val) {
    this.inputValue = val;
    console.log(this.inputValue);
  }

  async submitLogin(username = this.inputValue) {
    try {
      let response = await axios.post(this.url, { username }, this.config);
      localStorage.setItem('username', response.data.user.username);
      this.signInUser(response.data.user);
    } catch (err) {
      throw Error('Something wrong with an API');
    }
  }

  checkForToken() {
    let token = localStorage.getItem('username');
    if(token) {
      this.submitLogin(token);
      return;
    }
  }
  // TODO: Also need to disable form submission if user didn't enter anythin in the field
  signInUser(user) {
    // It's been executed when user Signs In Frist time, or When he is logging in
    // Doesn't matter
    // When user signs in need to change markup of LOGIN Component to infrom user
    // that he is logged in
    // To hide input element When User is Logged In
    console.log('And now we are singning in user with name' + user.username);
  }
}

export default LoginModel;