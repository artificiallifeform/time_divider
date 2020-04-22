import LoginModel from "./LoginModel";
import LoginView from "./LoginView";

class LoginViewModel {
  constructor() {
    this.loginModel = new LoginModel();
    this.loginView = new LoginView({
      inputChange: this.inputChange.bind(this), // This methods are being called in LoginView. When
      formSubmit: this.formSubmit.bind(this),
      userLogout: this.userLogout.bind(this), // using this in View it points oon LoginView component
    }); // However should be pointed an LoginViewModel

    this.loginInput = "";
    // First of all check if the User is Authenticated To Load appropriate component
    this.checkAuthStatus();
  }

  async checkAuthStatus() {
    const { loginModel, loginView } = this;

    const user = await loginModel.checkForToken();
    if (user) {
      loginView.authSucceed(user.username);
    } else {
      loginView.authFailed();
    }
  }

  inputChange(value) {
    this.loginInput = value;
  }

  userLogout() {
    this.loginModel.clearUser();
    this.loginView.authFailed();
  }

  async formSubmit() {
    const user = await this.loginModel.submitLogin(this.loginInput);
    if (user) {
      this.loginView.authSucceed(user.username);
    }
  }
}

export default LoginViewModel;
