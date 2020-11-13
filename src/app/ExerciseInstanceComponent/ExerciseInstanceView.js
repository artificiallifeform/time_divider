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

    this.list = document.createElement('ul');

    this.dropdownContainer = document.createElement('div');
    this.dropdownContent = document.createElement('div');

    this.setInput = actions.setInput;
    this.saveBtnClick = actions.saveBtnClick;
    this.deleteBtnClick = actions.deleteBtnClick;
    this.startBtnClick = actions.startBtnClick;
    this.stopBtnClick = actions.stopBtnClick;
    this.fetchTitles = actions.fetchTitles;

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

    this.dropdownContainer.append(this.input);
    this.dropdownContainer.append(this.dropdownContent);

    this.deleteBtn.appendChild(this.deleteIcon);
    this.saveBtn.appendChild(this.saveIcon);
    this.exerciseWrapper.appendChild(this.deleteBtn);
    this.exerciseWrapper.appendChild(this.saveBtn);
    this.exerciseWrapper.appendChild(this.dropdownContainer);
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
      this.list.innerHTML = '';
      this.setInput(e.target.value, 'complex');
    });

    this.saveBtn.addEventListener('click', this.saveBtnClick);
    this.deleteBtn.addEventListener('click', this.deleteBtnClick);
    this.startBtn.addEventListener('click', this.startBtnClick);
    this.stopBtn.addEventListener('click', this.stopBtnClick);

    this.dropdownContainer.addEventListener('click', (e) => {
      // Hide dropdown on other instance before creating new one
      // To prevent a few dropdowns on a screen
      // this.hideDropDown();
      e.stopPropagation();
      this.dropdownContent.appendChild(this.createTitleList());
      this.showDropDown();
    });

    this.dropdownContainer.addEventListener('focusin', (e) => {
      e.stopPropagation();
      this.fetchTitles();
    });

    this.dropdownContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.list.addEventListener('click', (e) => {
      // Check wether clicked element is button
      if (e.srcElement.localName === 'button') {
        this.setInput(e.target.innerText);
        this.input.value = e.target.innerText;
        this.hideDropDown();
      }
    });
  }

  createTitleList(titles = []) {
    this.showDropDown();
    titles.forEach((title) => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.innerText = title.title;
      listItem.appendChild(button);
      this.list.appendChild(listItem);
    });

    return this.list;
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

  showDropDown() {
    this.dropdownContent.classList.add('active');
  }

  hideDropDown() {
    this.list.innerHTML = '';
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach((dropdown) => dropdown.classList.remove('active'));
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
    this.dropdownContainer.classList.add('dropdown');
    this.dropdownContent.classList.add('dropdown-content');
    this.list.classList.add('dd-list');
  }
}

export default ExerciseInstanceView;
