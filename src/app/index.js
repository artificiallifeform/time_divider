import 'regenerator-runtime/runtime.js';
import '../styles/main.css';

import LoginViewModel from './LoginComponent/LoginViewModel';
import ExerciseViewModel from './ExerciseComponent/ExerciseViewModel';
import StatisticsViewModel from './StatisticsComponent/StatisticsViewModel';
import GoalsHistoryViewModel from './GoalsHistoryComponent/GoalsHistoryViewModel';
import Router from './Router/Router';

class Dispatcher {
  constructor() {}

  init() {
    const loginVM = new LoginViewModel();
    const exerciseVM = new ExerciseViewModel();
    const goalsHistoryVM = new GoalsHistoryViewModel();
    const statisticsVM = new StatisticsViewModel();

    loginVM.setExternalMethods({
      getExercises: exerciseVM.getExercises.bind(exerciseVM),
      clearExercises: exerciseVM.clearExercises.bind(exerciseVM),
      getTitles: exerciseVM.getExerciseTitles.bind(exerciseVM),
      getStatisticsExercises: statisticsVM.fetchExercises.bind(statisticsVM),
      clearStatisticsMarkup: statisticsVM.clearMarkup.bind(statisticsVM),
      getGoalsHistory: goalsHistoryVM.getGoalsHistory.bind(goalsHistoryVM),
      clearGoalsHistory: goalsHistoryVM.clearGoalsHistory.bind(goalsHistoryVM),
    });

    exerciseVM.setExternalMethods({
      setStatisticUpdate: statisticsVM.setStatisticsUpdate.bind(statisticsVM),
    });

    new Router([
      { component: statisticsVM, path: '/statistics' },
      { component: goalsHistoryVM, path: '/goalshistory' },
      { component: exerciseVM, path: '/' },
    ]);
  }
}

new Dispatcher().init();
