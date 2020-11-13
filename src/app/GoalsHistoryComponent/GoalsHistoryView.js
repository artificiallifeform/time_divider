import formatSeconds from '../utils/formatSeconds';
import Pagination from '../utils/Pagination';

class GoalsHistoryView {
  constructor(actions) {
    this.goalsHistory = document.createElement('div');
    this.accordion = document.createElement('div');
    this.options = document.createElement('div');

    this.days = ['1 Day', '3 Days', '7 Days', '30 Days', 'More'];
    this.exercises = [];

    this.actions = actions;
  }

  createGoalsHistory() {
    // Render switch options first
    this.createSwitch();

    // **
    this.renderAccordion(this.options.dataset.option, this.days);

    this.renderGoalsHistory();

    this.addClasses();
    return this.goalsHistory;
  }

  createSwitch() {
    const optionSwitch = document.createElement('div');
    const text = document.createElement('span');
    const timeline = document.createElement('div');
    const exercise = document.createElement('div');

    text.innerText = 'Display goals by: ';
    timeline.innerText = 'Timeline';
    exercise.innerText = 'Exercises';

    optionSwitch.classList.add('options-switch');
    this.options.dataset.option = 'timeline';
    timeline.classList.add('timeline', 'opt-instance');
    exercise.classList.add('switch-exercise', 'opt-instance');

    timeline.addEventListener('click', () => {
      // Comparing two states to prevent useless rendering
      if (this.options.dataset.option !== 'timeline') {
        this.renderAccordion('timeline', this.days);
        this.options.dataset.option = 'timeline';
        this.options.classList.remove('second');
        this.options.classList.add('first');
      }
    });

    exercise.addEventListener('click', () => {
      // Comparing two states to prevent useless rendering
      if (this.options.dataset.option !== 'exercises') {
        this.renderAccordion('exercises', this.actions.getExerciseGoalsList());
        this.options.dataset.option = 'exercises';
        this.options.classList.remove('first');
        this.options.classList.add('second');
      }
    });

    this.options.appendChild(timeline);
    this.options.appendChild(exercise);

    optionSwitch.appendChild(text);
    optionSwitch.appendChild(this.options);

    this.goalsHistory.appendChild(optionSwitch);
  }

  createAccordion(source, historyData) {
    for (let el of historyData) {
      const content_box = document.createElement('div');
      const label = document.createElement('div');
      const content = document.createElement('div');

      content_box.classList.add('content-box');
      label.classList.add('label');
      content.classList.add('content');

      label.innerText = el;

      label.addEventListener('click', () => {
        content_box.classList.toggle('active');

        if (content.childNodes.length !== 0) {
          while (content.childNodes.length !== 0) {
            content.removeChild(content.childNodes[0]);
          }
          return;
        }
        // Pass content HTML element and function that renders table content. fetchGoals from GoalsHistoryVM
        // fetches history and also renders content. This control placed there to avoid extra complexity with
        // async function in View
        this.actions.fetchGoals(
          source,
          el,
          content,
          el,
          this.createAccordionContentList
        );
      });

      content_box.appendChild(label);
      content_box.appendChild(content);

      this.accordion.appendChild(content_box);
    }
  }

  createAccordionContentList(elem, goals, label, length) {
    const pagination = new Pagination(length, 10);

    const table = document.createElement('table');
    table.classList.add('table');

    // Fills table with its content
    let history = ``;

    for (let goal of goals) {
      const { title, created_at, goal_time, time_spent, expired } = goal;

      let percent = (time_spent / goal_time) * 100;

      let expiredStyle =
        expired === 1 && time_spent < goal_time
          ? 'style="color: #f32013;"'
          : '';
      history += `
      <tr ${expiredStyle}>
        <td data-label="Title">${title}</td>
        <td data-label="Created at">${created_at.split('T')[0]}</td>
        <td data-label="Goal Time">${formatSeconds(goal_time)}</td>
        <td data-label="Time spent">${formatSeconds(
          time_spent
        )}(${percent.toFixed(2)}%)</td>
        <td data-label="In progress">${expired === 0 ? 'Yes' : 'No'}</td>
      </tr>
      `;
    }

    table.innerHTML = `
    <thead>
      <tr>  
        <th>Title</th>
        <th>Created at</th>
        <th>Goal time</th>
        <th>Time spent</th>
        <th>In Progress</th>
      </tr>
    </thead>
    <tbody>
      ${history}
    </tbody>
    `;

    if (label === 'More') {
      // Sending Table element And goals to external Class
      // It enhances standart table action with pagination
      pagination.set_external_data(table, goals);
      elem.appendChild(pagination.get_table());
      elem.appendChild(pagination.get_widget());
    } else {
      elem.appendChild(table);
    }
  }

  renderAccordion(option, historyData) {
    if (this.accordion.childNodes.length > 0) {
      while (this.accordion.childNodes.length !== 0) {
        this.accordion.removeChild(this.accordion.childNodes[0]);
      }
    }

    this.createAccordion(option, historyData);
  }

  renderGoalsHistory() {
    this.goalsHistory.appendChild(this.accordion);
  }

  clearMarkup() {
    this.goalsHistory.innerHTML = '';
  }

  addClasses() {
    this.goalsHistory.classList.add('goalshistory');
    this.accordion.classList.add('accordion');

    this.options.classList.add('options', 'first');
  }

  addEventListeners() {}
}

export default GoalsHistoryView;
