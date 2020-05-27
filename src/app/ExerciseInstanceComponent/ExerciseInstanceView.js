import save from '../../fonts/save.svg';
import clear from '../../fonts/clear.svg';

class ExerciseInstanceView {
  constructor(actions, exerTimer, inputVal = '') {
    this.timer = exerTimer;

    this.saveIcon = document.createElement('img');
    this.deleteIcon = document.createElement('img');
    this.exerciseWrapper = document.createElement('div');
    this.deleteBtn = document.createElement('div');
    this.saveBtn = document.createElement('div');
    this.input = document.createElement('input');
    this.startBtn = document.createElement('button');
    this.stopBtn = document.createElement('button');

    this.inputChange = actions.inputChange;
    this.saveBtnClick = actions.saveBtnClick;
    this.deleteBtnClick = actions.deleteBtnClick;
    this.startBtnClick = actions.startBtnClick;
    this.stopBtnClick = actions.stopBtnClick;

    this.inputVal = inputVal;
  }

  createExerciseInstance() {
    // this.saveBtn.innerText = 'Save';
    this.startBtn.innerText = 'Start';
    this.stopBtn.innerText = 'Stop';

    this.input.value = this.inputVal;

    this.deleteIcon.src = clear;
    this.deleteIcon.alt = 'Delete';
    this.saveIcon.src = save;
    this.saveIcon.alt = 'Save';

    this.deleteBtn.appendChild(this.deleteIcon);
    this.saveBtn.appendChild(this.saveIcon);
    this.exerciseWrapper.appendChild(this.deleteBtn);
    this.exerciseWrapper.appendChild(this.saveBtn);
    this.exerciseWrapper.appendChild(this.input);
    this.exerciseWrapper.appendChild(this.startBtn);
    this.exerciseWrapper.appendChild(this.stopBtn);
    this.exerciseWrapper.appendChild(this.timer.getTimer());

    this.addClasses();
    this.eventListeners();
    this.toggleButtonAccess();

    return this.exerciseWrapper;
  }

  eventListeners() {
    this.input.addEventListener('input', (e) => {
      this.inputChange(e.target.value);
    });
    this.saveBtn.addEventListener('click', this.saveBtnClick);
    this.deleteBtn.addEventListener('click', this.deleteBtnClick);
    this.startBtn.addEventListener('click', this.startBtnClick);
    this.stopBtn.addEventListener('click', this.stopBtnClick);
  }

  toggleButtonAccess(timerIsRunning = false) {
    // if timerIsRunning false => then disable stop button
    // else disable start button
    if (!timerIsRunning) {
      this.stopBtn.setAttribute('disabled', 'true');
      this.startBtn.removeAttribute('disabled');
    } else {
      this.startBtn.setAttribute('disabled', 'true');
      this.stopBtn.removeAttribute('disabled');
    }
  }

  addClasses() {
    this.exerciseWrapper.classList.add('exercise-instance');
    this.saveIcon.classList.add('icon');
    this.deleteIcon.classList.add('icon');
    this.saveBtn.classList.add('icon-btn');
    this.deleteBtn.classList.add('icon-btn', 'delete');
    this.input.classList.add('exercise-input');
    this.startBtn.classList.add('btn', 'small');
    this.stopBtn.classList.add('btn', 'small', 'danger');
    // this.saveBtn.classList.add('not-saved');
  }
}

export default ExerciseInstanceView;
