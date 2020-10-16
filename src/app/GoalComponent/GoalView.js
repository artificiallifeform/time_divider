class GoalView {
  constructor(actions) {
    this.goalWidget = document.createElement('div');
    this.addGoalBtn = document.createElement('button');

    this.goalState = document.createElement('div');
    this.goalGraph = document.createElement('div');
    this.progressGraph = document.createElement('div');
    this.timeStatistic = document.createElement('div');

    this.modal = document.createElement('div');
    this.formWrapper = document.createElement('div');

    this.actions = {
      addGoal: actions.addGoal,
    };
  }

  createGoals() {
    this.addClasses();
    this.addEventListeners();

    this.createGoalAdd();
    // this.createGoalGraph();

    this.showModal();

    return this.goalWidget;
  }

  createGoalAdd() {
    this.addGoalBtn.innerText = 'Add Goal';
    this.goalWidget.appendChild(this.addGoalBtn);

    this.addGoalBtn.addEventListener('click', (e) => {
      this.modal.classList.remove('hide');
    });
  }

  showModal() {
    this.formWrapper.classList.add('form-wrapper');

    const markup = `
        <form class="modal-form">
          <input type="text" name="time-hours" placeholder='Goal time...(hours)'/>
          <input type="text" name="time-mins" placeholder='Goal time...(minutes)'/>
          <input type="text" name="deadline" placeholder='Timebound...(hours)'/>
          <input class="btn" type="submit" value="Add" />
        </form>
    `;

    this.formWrapper.innerHTML = markup;

    this.modal.appendChild(this.formWrapper);
    document.body.insertAdjacentElement('afterbegin', this.modal);
  }

  hideModal() {
    this.modal.classList.add('hide');
  }

  createGoalGraph(time_spent, hours, minutes) {
    const goal_state = document.createElement('div');
    const goal_graph = document.createElement('div');
    const progress_graph = document.createElement('div');
    const time_statistic = document.createElement('div');

    goal_state.classList.add('goal-state');
    goal_graph.classList.add('goal-graph');
    progress_graph.classList.add('progress-graph');

    let time_spent_hours = '';
    if (time_spent.hours === 0) {
      time_spent_hours = '';
    } else {
      time_spent_hours = `${time_spent_hours}h `;
    }

    let time_spent_mins = '';
    if (time_spent.mins === 0) {
      time_spent_mins = '0m';
    } else {
      time_spent_mins = `${time_spent.mins}m`;
    }

    const occupancy_graph =
      (100 / (hours * 60 + minutes)) * time_spent.total_mins || 0;
    occupancy_graph.toFixed(1);

    progress_graph.style.width = `${occupancy_graph}%`;

    time_statistic.innerText = `${
      time_spent_hours + time_spent_mins
    }/${hours}h ${minutes}m`;

    goal_state.appendChild(goal_graph);
    goal_state.appendChild(time_statistic);

    goal_graph.appendChild(progress_graph);

    this.goalWidget.appendChild(goal_state);
  }

  clearGoalState() {
    console.log(this.goalWidget.children);

    Array.from(this.goalWidget.children).forEach((el) => {
      if (el.localName !== 'button') {
        el.remove();
      }
    });
  }

  addEventListeners() {
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.value === 'modal') {
        this.hideModal();
      }
    });

    this.formWrapper.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.actions.addGoal({
        timeHours: parseInt(e.target.elements['time-hours'].value) || 0,
        timeMins: parseInt(e.target.elements['time-mins'].value) || 0,
        deadline: parseInt(e.target.elements['deadline'].value),
      });
    });
  }

  addClasses() {
    this.goalWidget.classList.add('goal-widget');

    this.addGoalBtn.classList.add('add-goal', 'btn');

    this.modal.classList.add('modal', 'hide');
  }
}

export default GoalView;
