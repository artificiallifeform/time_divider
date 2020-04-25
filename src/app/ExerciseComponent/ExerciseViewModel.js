class ExerciseViewModel {
  constructor() {}

  getMarkup() {
    const div = document.createElement('div');
    div.innerText = 'Hello Dear Exercise';
    return div;
  }
}

export default ExerciseViewModel;
