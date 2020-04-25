class Router {
  constructor(components) {
    this.components = components; // Receiving Components with Appropriate route

    this.workSpace = document.querySelector('.workspace');
    // Listeners to Load different components depending on its route
    this.routerLink = document.querySelectorAll('.router-link');
    this.routerLink.forEach((el) =>
      el.addEventListener('click', this.linkEvent)
    );

    // When users steps back to previous route in history object
    // Load component depending on its route
    window.addEventListener('popstate', (e) => {
      let path = e.state || '/';
      this.renderComponent(path, 'freeze');
    });

    // Path "/" to load default component
    this.path = window.location.pathname;
    this.renderComponent(this.path, 'freeze');
  }

  linkEvent = (e) => {
    e.preventDefault();
    this.path = e.target.getAttribute('href');
    this.renderComponent(this.path, 'push');
  };

  renderComponent(path, action = 'push') {
    // @Screen@ variable stores necessary component and then passes it
    // in Workspace div element
    const { components, workSpace } = this;
    let Screen = null;
    for (let element of components) {
      if (element.path === path) Screen = new element.component();
    }
    console.log(Screen);
    let screenContent = Screen.getMarkup();
    workSpace.removeChild(workSpace.childNodes[0]);
    workSpace.appendChild(screenContent);
    // Function is beeing called two times. First, when users clicks on link
    // and it's path beeing pushed into history object.
    // When "popstate" calls function, it renders component without pushing state
    action === 'push' && window.history.pushState(path, '', path);
  }
}

export default Router;
