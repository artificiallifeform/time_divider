import '../../styles/goal.css';

import GoalModel from './GoalModel';
import GoalView from './GoalView';

import format_secs from '../utils/timeFromSecs';

class GoalViewModel {
  constructor() {
    console.log('Goal view model initialized');

    this.goalModel = new GoalModel();
    this.goalView = new GoalView({
      addGoal: this.addGoal.bind(this),
    });

    this.markup = this.goalView.createGoals();
    this.goals = [];

    this.currentExercise = '';

    this.externalMethods = {};
  }

  async addGoal(data) {
    // this.goalView.
    console.log('Add Goal IN GOAL VM invoked');
    console.log(data);
    const goal_id = await this.goalModel.postGoal({
      ...data,
      title: this.currentExercise,
    });

    if (goal_id) {
      this.goalView.createGoalGraph(
        { hours: 0, mins: 0 },
        data.timeHours,
        data.timeMins
      );
    }

    this.externalMethods.fetchGoals();
  }

  getMarkup() {
    return this.markup;
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
          goal_time.mins
        );
      }
    }
  }

  setExternalMethods(methods) {
    this.externalMethods = methods;
  }
}

export default GoalViewModel;
