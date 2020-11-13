import '../../styles/goalshistory.css';

import GoalsHistoryView from './GoalsHistoryView';
import GoalsHistoryModel from './GoalsHistoryModel';

class GoalsHistory {
  constructor() {
    this.goalsHistoryView = new GoalsHistoryView({
      fetchGoals: this.fetchGoals.bind(this),
      getExerciseGoalsList: this.getExerciseGoalsList.bind(this),
    });
    this.goalsHistoryModel = new GoalsHistoryModel();

    this.markup = this.goalsHistoryView.createGoalsHistory();

    this.goalsHistory = {};

    this.goal_exercises_list = [];

    this.more_goals_amount = 0;
  }

  async fetchGoals(option, specifier, contentEl, label, cb) {
    if (specifier === 'More' && !this.goalsHistory['More']) {
      // 1. Fetch amount of goals that are greater than 30 - day interval
      const goals_length = await this.goalsHistoryModel.fetchGoalsLength();
      this.more_goals_amount = goals_length;
      let results = await GoalsHistoryModel.fetchGoalsByPage(1);
      this.goalsHistory['More'] = results;
      cb(contentEl, this.goalsHistory['More'], label, this.more_goals_amount);
      return;
    } else if (specifier === 'More') {
    }

    // Make control. To load data only once
    let spec = null;
    if (parseInt(specifier.split(' ')[0])) {
      spec = specifier.split(' ')[0];
    } else {
      spec = specifier;
    }

    if (spec in this.goalsHistory) {
      cb(contentEl, this.goalsHistory[spec], label, this.more_goals_amount);
      return;
    }

    const result = await this.goalsHistoryModel.fetchGoals(option, spec);
    this.goalsHistory[spec] = result;

    cb(contentEl, result, label, this.more_goals_amount);
  }

  getMarkup() {
    if (this.goal_exercises_list.length === 0) {
      this.goalsHistoryModel.fetchGoalExercises().then((response) => {
        this.goal_exercises_list = response.map((el) => el.title);
      });
    }
    // Put update condition here
    return this.markup;
  }

  getExerciseGoalsList() {
    return this.goal_exercises_list;
  }

  clearGoalsHistory() {
    this.goalsHistoryView.clearMarkup();
  }

  getGoalsHistory() {
    this.goalsHistoryView.renderGoalsHistory();
  }
}

export default GoalsHistory;
