import ExerciseView from './ExerciseView';
import ExerciseModel from './ExerciseModel';

import ExerciseInstanceVM from '../ExerciseInstanceComponent/ExerciseInstanceVM';
import ErrorMsg from '../HelperComponents/Error';

class ExerciseViewModel {
  constructor() {
    this.errorInst = new ErrorMsg();
    this.exerciseView = new ExerciseView(
      {
        addBtnClick: this.addBtnClick.bind(this),
      },
      this.errorInst
    );

    this.exerciseModel = new ExerciseModel();

    // this.newInstance = new ExerciseInstanceVM();
    // this.exerciseView.addExerciseInstance(this.newInstance.getMarkup());
    this.markup = this.exerciseView.createExercise();
    this.getExercises();
  }

  getMarkup() {
    return this.markup;
  }

  addBtnClick() {
    this.createExerciseInstance();
  }

  handleError(message) {
    this.errorInst.showError(message);
  }

  async getExercises() {
    this.exercises = await this.exerciseModel.fetchExercise();
    if (!this.exercises) return;

    this.exercises.forEach((exercise) => {
      this.createExerciseInstance({
        input: exercise.title,
        timer: exercise.seconds,
        optionId: exercise.id,
      });
    });
  }

  clearExercises() {
    this.exerciseView.clearExercises();
  }

  createExerciseInstance(options = {}) {
    let newInstance = new ExerciseInstanceVM(
      this.handleError.bind(this),
      options
    );
    this.exerciseView.addExerciseInstance(newInstance.getMarkup());
  }
}

export default ExerciseViewModel;
