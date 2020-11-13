import filterByInterval from '../utils/filterByInterval';

class StatisticsView {
  constructor(actions) {
    this.statistics = document.createElement('div');
    this.statisticsContent = document.createElement('div');
    this.goalContent = document.createElement('div');

    this.exerciseInfo = document.createElement('div');
    this.exerciseTitle = document.createElement('span');
    this.exerciseTime = document.createElement('span');

    this.timeIntervals = document.createElement('div');
    this.timeIntervalsList = document.createElement('ul');
    // this.timeIntervalsValues = document.create;

    this.exerciseList = document.createElement('ul');

    this.exerciseClick = actions.exerciseClick;
  }

  createStatistics() {
    this.statisticsContent.appendChild(this.exerciseInfo);
    this.statistics.appendChild(this.statisticsContent);
    this.statistics.appendChild(this.goalContent);

    this.addClasses();
    this.eventListeners();

    return this.statistics;
  }

  // Outer component
  renderGoalContent(goalMarkup) {
    // Reset goal content when clicking on another exercise
    this.goalContent.innerHTML = '';
    this.goalContent.appendChild(goalMarkup);
  }

  renderStatisticsContent(title, timeStr) {
    this.exerciseTitle.innerText = title;
    this.exerciseTime.innerText = `Total time: ${timeStr}`;

    this.exerciseInfo.appendChild(this.exerciseTitle);
    this.exerciseInfo.appendChild(this.exerciseTime);

    this.statisticsContent.appendChild(this.exerciseInfo);
  }

  renderExerciseList(exercises) {
    exercises.forEach((exercise) => {
      const listItem = document.createElement('li');
      listItem.innerText = exercise.title;
      this.exerciseList.appendChild(listItem);
    });
    this.statistics.insertAdjacentElement('afterbegin', this.exerciseList);
  }

  renderTimeInterval(statistics) {
    this.timeIntervals.innerHTML = '';
    this.timeIntervalsList.innerHTML = '';
    const intervals = [
      { title: 'Today:', value: 0 },
      { title: 'Yesterday:', value: 1 },
      { title: 'Last 3 days:', value: 3 },
      { title: 'Last week:', value: 7 },
      { title: 'Last 2 weeks:', value: 14 },
      { title: 'Last 30 days:', value: 30 },
    ];

    intervals.forEach((interval) => {
      const time = filterByInterval(interval.value, statistics);
      const item = document.createElement('li');
      const content = document.createElement('div');
      content.classList.add('interval-data');

      const intrTitle = document.createElement('span');
      const timeValue = document.createElement('span');

      intrTitle.innerText = interval.title;
      timeValue.innerText = time ? `${time}` : '0s';

      content.appendChild(intrTitle);
      content.appendChild(timeValue);

      item.appendChild(content);

      intrTitle.setAttribute('data-interval', interval.value);
      this.timeIntervalsList.appendChild(item);
    });

    this.timeIntervals.appendChild(this.timeIntervalsList);
    this.exerciseInfo.appendChild(this.timeIntervals);
  }

  clearMarkup() {
    this.statistics.innerHTML = '';
    this.exerciseList.innerHTML = '';
  }

  eventListeners() {
    this.exerciseList.addEventListener('click', (e) => {
      if (e.srcElement.localName === 'li') {
        this.exerciseList.childNodes.forEach((el) =>
          el.classList.remove('active')
        );
        e.target.classList.add('active');

        this.exerciseClick(e.target.innerText);
      }
    });

    // this.timeIntervals.addEventListener('click', (e) => {
    //   if (e.target.dataset.interval) {
    //     // this.getIntervalData(e.target.dataset.interval);
    //   }
    // });
  }

  addClasses() {
    this.statistics.classList.add('statistics');
    this.statisticsContent.classList.add('statistics-content');
    this.exerciseList.classList.add('statistics-list');

    this.exerciseInfo.classList.add('exercise-info');
    this.timeIntervals.classList.add('time-intervals');
    this.timeIntervalsList.classList.add('time-intervals-list');

    this.goalContent.classList.add('goal-content');
  }
}

export default StatisticsView;
