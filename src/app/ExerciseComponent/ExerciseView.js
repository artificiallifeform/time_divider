class ExerciseView {
  constructor(actions, errorInst) {
    this.errorInst = errorInst;

    this.addBtnClick = actions.addBtnClick;

    this.addButton = document.createElement('button');
    this.exercise = document.createElement('div');
  }

  createExercise() {
    this.addButton.innerText = 'Add';

    this.exercise.appendChild(this.addButton);
    this.exercise.appendChild(this.errorInst.getErrorMessage());

    this.eventListeners();
    this.addClasses();

    return this.exercise;
  }

  addExerciseInstance(instance) {
    this.exercise.appendChild(instance);
  }

  clearExercises() {
    document
      .querySelectorAll('.exercise-instance')
      .forEach((el) => el.remove());
  }

  eventListeners() {
    this.addButton.addEventListener('click', this.addBtnClick);
  }

  addClasses() {
    this.exercise.classList.add('exercise');
    this.addButton.classList.add('btn', 'big');
  }
}

export default ExerciseView;
