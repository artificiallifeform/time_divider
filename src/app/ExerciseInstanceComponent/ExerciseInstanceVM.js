import '../../styles/exercise.css';
import Timer from '../HelperComponents/Timer';
import ExerciseInstanceModel from './ExerciseInstanceModel';
import ExerciseInstanceView from './ExerciseInstanceView';

class ExerciseInstanceVM {
  constructor(errorHandler, options) {
    this.errorHandler = errorHandler;
    this.options = options;
    this.exerciseTimer = new Timer(this.options.timer);

    this.exerciseInstanceModel = new ExerciseInstanceModel();
    this.exerciseInstanceView = new ExerciseInstanceView(
      {
        inputChange: this.inputChange.bind(this),
        saveBtnClick: this.saveBtnClick.bind(this),
        deleteBtnClick: this.deleteBtnClick.bind(this),
        startBtnClick: this.startBtnClick.bind(this),
        stopBtnClick: this.stopBtnClick.bind(this),
      },
      this.exerciseTimer,
      this.options.input
    );

    // Each Exercise has it's own unique identified
    this.exercise_id = this.options.optionId || null;

    this.exerciseInput = this.options.input || '';
  }

  getMarkup() {
    return this.exerciseInstanceView.createExerciseInstance();
  }

  inputChange(value) {
    this.exerciseInput = value;
  }

  deleteBtnClick(e) {
    // Move up from child to parent to find .exercise-instance class and remove it
    let parentExercise = null;
    let i = 0;
    while (i <= 3) {
      parentExercise = e.target.parentNode;
      const classes = Array.from(parentExercise.classList);
      if (classes.includes('exercise-instance')) {
        break;
      } else {
        parentExercise = parentExercise.parentNode;
        i++;
      }
    }
    parentExercise.parentNode.removeChild(parentExercise);

    if (this.exercise_id) {
      this.exerciseInstanceModel.modelDeleteHandler(this.exercise_id);
    }
  }

  async saveBtnClick() {
    const seconds = this.exerciseTimer.getAllSeconds();
    const response = await this.exerciseInstanceModel.modelSaveHandler(
      this.exerciseInput,
      seconds,
      this.exercise_id
    );

    switch (response.type) {
      case 'success':
        this.exercise_id = response.payload.exercise_id;
        return;
      case 'error':
        // When Error occurs somewhere in Exercise Instance
        // Updating Erorr Obj through Error handler
        // Which was passed down to An ExerciseInstance From Exercise-Parent Component
        return this.errorHandler(response.payload);
    }
  }

  startBtnClick() {
    this.exerciseTimer.startTimer();
    this.exerciseInstanceView.toggleButtonAccess(true);
  }

  stopBtnClick() {
    this.exerciseTimer.stopTimer();
    this.exerciseInstanceView.toggleButtonAccess(false);
  }
}

export default ExerciseInstanceVM;
