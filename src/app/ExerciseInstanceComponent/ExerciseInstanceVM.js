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
        setInput: this.setInput.bind(this),
        saveBtnClick: this.saveBtnClick.bind(this),
        deleteBtnClick: this.deleteBtnClick.bind(this),
        startBtnClick: this.startBtnClick.bind(this),
        stopBtnClick: this.stopBtnClick.bind(this),
        fetchTitles: this.fetchTitles.bind(this),
      },
      this.exerciseTimer,
      this.options.input
    );

    // Each Exercise has it's own unique identified
    this.exercise_id = this.options.optionId || null;

    this.exerciseInput = this.options.input || '';

    this.exerciseUpdated = this.options.exerciseUpdated;

    this.fetchedTitles = [];
  }

  getMarkup() {
    return this.exerciseInstanceView.createExerciseInstance();
  }

  async setInput(value, action = 'plain') {
    // Initially set fetchedTitles to empty array to load new titles from server
    this.fetchedTitles = [];
    if (action !== 'plain') {
      this.exerciseInput = value;
      await this.fetchTitles(value);
    } else {
      this.exerciseInput = value;
    }
  }

  async fetchTitles(inpVal) {
    // FetchTitles beeing called in two cases. First => When input changes *setInput* func executes => fetchTitles with inpVal
    // Second => When input beeing focused, *fetchTitles* beeing invoked without parameter, to fetch 5 most common exercises
    // onFocus need to retrieve data only once.
    // In other cases retrieving will be dealt by SetInput func
    if (this.fetchedTitles.length === 0) {
      if (inpVal) {
        this.fetchedTitles = await this.exerciseInstanceModel.fetchTitles(
          inpVal
        );
        this.exerciseInstanceView.createTitleList(this.fetchedTitles.titles);
        return;
      }
      this.fetchedTitles = await this.exerciseInstanceModel.fetchTitles();
      this.exerciseInstanceView.createTitleList(this.fetchedTitles.titles);
    }
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
    // Messages Exercise Component When Save button of any instance was pressed
    // and sends to it corresponding title
    this.options.exerciseUpdated(this.exerciseInput);
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
