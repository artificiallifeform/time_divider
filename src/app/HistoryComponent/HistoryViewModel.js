class HistoryViewModel {
  constructor() {}

  getMarkup() {
    const div = document.createElement('div');
    div.innerText = 'Hello Dear History';
    return div;
  }
}

export default HistoryViewModel;
