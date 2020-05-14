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
    this.optionId = this.options.optionId || null;

    // console.log(this.optionId);
    this.exerciseInput = '';
  }

  getMarkup() {
    return this.exerciseInstanceView.createExerciseInstance();
  }

  inputChange(value) {
    this.exerciseInput = value;
  }

  async saveBtnClick() {
    // TODO:
    // TODO:  To Make another method OR to update existing
    // TODO:  For beeing able to save current exercise
    // TODO:  ANd update it in database
    const seconds = this.exerciseTimer.getAllSeconds();
    const response = await this.exerciseInstanceModel.modelSaveHandler(
      this.exerciseInput,
      seconds
    );

    console.log('Ive clicked on exercise with id of: ' + this.optionId);

    if (response) {
      // When Error occurs somewhere in Exercise Instance
      // Updating Erorr Obj through Error handler
      // Which was passed down to An ExerciseInstance From Exercise-Parent Component
      this.errorHandler(response);
    }
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
