class ErrorMsg {
  constructor() {
    this.error = document.createElement('div');
    this.error.classList.add('error');

    this.timeout;

    this.hideError = () => {
      clearTimeout(this.timeout);
      this.error.removeEventListener('click', this.hideError);
      this.error.classList.remove('show');
      this.error.innerText = '';
    };
  }

  showError(message) {
    console.log('Show Error Executed');
    this.error.classList.add('show');
    this.error.innerText = message;

    this.error.addEventListener('click', this.hideError);

    this.timeout = setTimeout(() => {
      this.hideError();
    }, 4000);
  }

  getErrorMessage() {
    return this.error;
  }
}

export default ErrorMsg;
