class Router {
  constructor(components) {
    this.components = components; // Receiving Components with Appropriate route
    this.activeLink = null;
    this.workSpace = document.querySelector('.workspace');

    // Path "/" to load default component
    this.path = window.location.pathname;

    // Listeners to Load different components depending on its route
    this.routerLinks = document.querySelectorAll('.router-link');
    this.routerLinks.forEach((el) => {
      const link = el.getAttribute('href');
      if (link === this.path) {
        this.activeLink = el;
        this.activeLink.classList.add('active');
      }
      el.addEventListener('click', (e) => this.linkEvent(e));
    });

    // When users steps back to previous route in history object
    // Load component depending on its route
    window.addEventListener('popstate', (e) => {
      let path = e.state || '/';

      this.routerLinks.forEach((el) => {
        if (el.getAttribute('href') === path) {
          this.highlightActiveLink(el);
        }
      });

      this.renderComponent(path, 'freeze');
    });

    this.renderComponent(this.path, 'freeze');
  }

  linkEvent(e) {
    e.preventDefault();

    this.path = e.target.getAttribute('href');

    this.highlightActiveLink(e.target);

    this.renderComponent(this.path, 'push');
  }

  highlightActiveLink(currentLink) {
    this.activeLink.classList.remove('active');
    currentLink.classList.add('active');
    this.activeLink = currentLink;
  }

  renderComponent(path, action = 'push') {
    // @Screen@ variable stores necessary component and then passes it
    // in Workspace div element
    const { components, workSpace } = this;
    let Screen = null;
    for (let element of components) {
      if (element.path === path) {
        Screen = element.component;
      }
    }
    let screenContent = Screen.getMarkup();

    if (workSpace.childNodes.length !== 0) {
      workSpace.removeChild(workSpace.childNodes[0]);
    }
    workSpace.appendChild(screenContent);
    // Function is beeing called two times. First, when users clicks on link
    // and it's path beeing pushed into history object.
    // When "popstate" calls function, it renders component without pushing state
    action === 'push' && window.history.pushState(path, '', path);
  }
}

export default Router;
