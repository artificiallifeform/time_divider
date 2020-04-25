class PlanViewModel {
  constructor() {}
  getMarkup() {
    const div = document.createElement('div');
    div.innerText = 'Hello Dear Plan';
    return div;
  }
}

export default PlanViewModel;
