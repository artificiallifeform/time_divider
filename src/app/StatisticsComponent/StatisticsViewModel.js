import '../../styles/statistics.css';
import StatisticsView from './StatisticsView';
import StatisticsModel from './StatisticsModel';

import GoalViewModel from '../GoalComponent/GoalViewModel';

import formatSeconds from '../utils/formatSeconds';

class StatisticsViewModel {
  constructor() {
    this.statisticsView = new StatisticsView({
      exerciseClick: this.exerciseClick.bind(this),
    });
    this.statisticsModel = new StatisticsModel();
    this.markup = this.statisticsView.createStatistics();

    this.activeExercise = null;

    this.exercisesStatistics = {};

    this.goals = [];
    this.exercisesToUpdate = [];

    this.fetchExercises();

    this.goalViewModel = new GoalViewModel();
    this.goalViewModel.setExternalMethods({
      fetchGoals: this.fetchGoals.bind(this),
      delGoal: this.delGoal.bind(this),
    });
  }

  getMarkup() {
    // Get markup is wrong name for this shit. It was better to choose <render> name
    // cause except providing markup it will fetch current goals
    this.fetchGoals();
    return this.markup;
  }

  fetchGoals() {
    this.statisticsModel
      .fetchGoals()
      .then((response) => {
        this.goals = response.active_goals;
        this.updateGoalsWidget();
      })
      .catch((err) => console.log(err));
  }

  clearMarkup() {
    this.statisticsView.clearMarkup();
  }

  setStatisticsUpdate(title) {
    this.exercisesToUpdate.push(title);
  }

  async exerciseClick(exercise) {
    // Fetch exercises in tow cases :
    // 1. When there is no exercises in this.exercisesStatistics OR
    // 2. There is exercise in exercisesStatistics and it's beeing updated on SaveClick
    // Then remove exercise from exercisesToUpdate
    // Render doesn't build on response data
    // Its always based on exercisesStatitics, which provides Data from Memory OR Server
    // based on prev actions
    if (
      !(exercise in this.exercisesStatistics) ||
      (exercise in this.exercisesStatistics &&
        this.exercisesToUpdate.includes(exercise))
    ) {
      const response = await this.statisticsModel.getStatistics(exercise);
      this.exercisesStatistics = {
        ...this.exercisesStatistics,
        [exercise]: {
          stats: response.stats,
          total: response.total_time.total,
        },
      };

      this.exercisesToUpdate = this.exercisesToUpdate.filter(
        (exr) => exr !== exercise
      );
    }
    this.activeExercise = exercise;
    this.statisticsView.renderStatisticsContent(
      exercise,
      formatSeconds(this.exercisesStatistics[exercise].total)
    );
    this.statisticsView.renderTimeInterval(
      this.exercisesStatistics[exercise].stats
    );
    // This markup is provided by goal component
    this.goalViewModel.setCurrentExercise(exercise);
    this.goalViewModel.renderAddButton();
    this.updateGoalsWidget();
  }

  delGoal(id) {
    this.goals = this.goals.filter((goal) => goal.id !== id);
  }

  updateGoalsWidget() {
    this.goalViewModel.setGoals(this.goals);
    const goalWidget = this.goalViewModel.getMarkup();
    this.statisticsView.renderGoalContent(goalWidget);
  }

  async fetchExercises() {
    const exercises = await this.statisticsModel.fetchExercises();
    if (exercises.length > 0) {
      this.statisticsView.renderExerciseList(exercises);
    }
  }
}

export default StatisticsViewModel;
