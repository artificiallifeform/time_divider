import '../../styles/goal.css';

import GoalModel from './GoalModel';
import GoalView from './GoalView';

import format_secs from '../utils/timeFromSecs';

// TODO: this.goals stores all goals. Implement deleting

class GoalViewModel {
  constructor() {
    this.goalModel = new GoalModel();
    this.goalView = new GoalView({
      addGoal: this.addGoal.bind(this),
      delGoal: this.delGoal.bind(this),
      infoGoal: this.infoGoal.bind(this),
    });

    this.markup = this.goalView.createGoals();
    this.goals = [];

    this.currentExercise = '';

    this.externalMethods = {};
  }

  async addGoal(data) {
    const goal_id = await this.goalModel.postGoal({
      ...data,
      title: this.currentExercise,
    });

    if (goal_id) {
      this.goalView.createGoalGraph(
        { hours: 0, mins: 0 },
        data.timeHours,
        data.timeMins,
        goal_id.goal_id
      );
    }

    this.externalMethods.fetchGoals();
  }

  infoGoal(id) {
    let expirationT = {};
    this.goals.forEach((goal) => {
      if (goal.id === id) {
        expirationT = this.calcExpiration(goal.expiration);
      }
    });
    return expirationT;
  }

  calcExpiration(time) {
    const expiration = new Date(time.split('Z').join('0')).getTime();
    const now = new Date().getTime();
    const diff = expiration - now;
    const minutes = Math.floor(diff / (1000 * 60));

    const infoTime = { hours: 0, mins: 0 };
    infoTime.mins = minutes % 60;
    infoTime.hours = (minutes - infoTime.mins) / 60;
    return infoTime;
  }

  delGoal(id) {
    this.goalModel.delGoal(id);
    this.externalMethods.delGoal(id);
  }

  getMarkup() {
    return this.markup;
  }

  renderAddButton() {
    // adds goal widget manualy to show it only
    // after pressing any exercise
    this.goalView.createGoalAdd();
  }

  setCurrentExercise(exercise) {
    this.currentExercise = exercise;
  }

  setGoals(goals) {
    this.goalView.clearGoalState();
    // Recieves array of all active goals. Not only belonging to current exercise
    this.goals = goals;

    for (let goal of this.goals) {
      if (goal.title === this.currentExercise) {
        const goal_time = format_secs(goal.goal_time);
        const time_spent = format_secs(goal.time_spent);
        this.goalView.createGoalGraph(
          time_spent,
          goal_time.hours,
          goal_time.mins,
          goal.id
        );
      }
    }
  }

  setExternalMethods(methods) {
    this.externalMethods = methods;
  }
}

export default GoalViewModel;
