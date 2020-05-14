import save from '../../fonts/save.svg';

class ExerciseInstanceView {
  constructor(actions, exerTimer, inputVal = '') {
    this.timer = exerTimer;

    this.saveIcon = document.createElement('img');
    this.exerciseWrapper = document.createElement('div');
    this.saveBtn = document.createElement('div');
    this.input = document.createElement('input');
    this.startBtn = document.createElement('button');
    this.stopBtn = document.createElement('button');

    this.inputChange = actions.inputChange;
    this.saveBtnClick = actions.saveBtnClick;
    this.startBtnClick = actions.startBtnClick;
    this.stopBtnClick = actions.stopBtnClick;

    this.inputVal = inputVal;
  }

  createExerciseInstance() {
    // this.saveBtn.innerText = 'Save';
    this.startBtn.innerText = 'Start';
    this.stopBtn.innerText = 'Stop';

    this.input.value = this.inputVal;

    this.saveIcon.src = save;
    this.saveIcon.alt = 'Save';
    this.saveBtn.appendChild(this.saveIcon);
    this.exerciseWrapper.appendChild(this.saveBtn);
    this.exerciseWrapper.appendChild(this.input);
    this.exerciseWrapper.appendChild(this.startBtn);
    this.exerciseWrapper.appendChild(this.stopBtn);
    this.exerciseWrapper.appendChild(this.timer.getTimer());

    this.addClasses();
    this.eventListeners();

    return this.exerciseWrapper;
  }

  eventListeners() {
    this.input.addEventListener('input', (e) => {
      this.inputChange(e.target.value);
    });
    this.saveBtn.addEventListener('click', this.saveBtnClick);
    this.startBtn.addEventListener('click', this.startBtnClick);
    this.stopBtn.addEventListener('click', this.stopBtnClick);
  }

  addClasses() {
    this.exerciseWrapper.classList.add('exercise-instance');
    this.saveIcon.classList.add('save-i');
    this.saveBtn.classList.add('save-btn');
    this.input.classList.add('exercise-input');
    this.startBtn.classList.add('btn', 'small');
    this.stopBtn.classList.add('btn', 'small', 'danger');
    // this.saveBtn.classList.add('not-saved');
  }
}

export default ExerciseInstanceView;
