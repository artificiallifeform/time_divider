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
        startBtnClick: this.startBtnClick.bind(this),
        stopBtnClick: this.stopBtnClick.bind(this),
      },
      this.exerciseTimer,
      this.options.input
    );

    // Each Exercise has it's own unique identified
    this.exercise_id = this.options.optionId || null;

    console.log(this.options.input);
    this.exerciseInput = this.options.input || '';
  }

  getMarkup() {
    return this.exerciseInstanceView.createExerciseInstance();
  }

  inputChange(value) {
    this.exerciseInput = value;
    console.log(this.exercise_id);
  }

  async saveBtnClick() {
    console.log(this.exercise_id);
    // TODO:
    // TODO:  To Make another method OR to update existing
    // TODO:  For beeing able to save current exercise
    // TODO:  ANd update it in database
    const seconds = this.exerciseTimer.getAllSeconds();
    const response = await this.exerciseInstanceModel.modelSaveHandler(
      this.exerciseInput,
      seconds,
      this.exercise_id
    );

    switch (response.type) {
      case 'success':
        console.log('Success switch', response);
        this.exercise_id = response.payload.exercise_id;
        return;
      case 'error':
        // When Error occurs somewhere in Exercise Instance
        // Updating Erorr Obj through Error handler
        // Which was passed down to An ExerciseInstance From Exercise-Parent Component
        return this.errorHandler(response.payload);
    }
    console.log('Ive clicked on exercise with id of: ' + this.exercise_id);
  }

  startBtnClick() {
    this.exerciseTimer.startTimer();
    this.exerciseInstanceModel.modelStartHandler();
  }

  stopBtnClick() {
    this.exerciseTimer.stopTimer();
    this.exerciseInstanceModel.modelStopHandler();
  }
}

export default ExerciseInstanceVM;
