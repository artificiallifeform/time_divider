import 'regenerator-runtime/runtime.js';
import '../styles/main.css';

import LoginViewModel from './LoginComponent/LoginViewModel';
// import ExerciseInstanceVM from './ExerciseInstanceComponent/ExerciseInstanceVM';
import ExerciseViewModel from './ExerciseComponent/ExerciseViewModel';
import PlanViewModel from './PlanComponent/PlanViewModel';
import StatisticsViewModel from './StatisticsComponent/StatisticsViewModel';
import Router from './Router/Router';

class Dispatcher {
  constructor() {}

  init() {
    const loginVM = new LoginViewModel();
    const exerciseVM = new ExerciseViewModel();
    const planVM = new PlanViewModel();
    const statisticsVM = new StatisticsViewModel();

    loginVM.setExternalMethods({
      getExercises: exerciseVM.getExercises.bind(exerciseVM),
      clearExercises: exerciseVM.clearExercises.bind(exerciseVM),
      getTitles: exerciseVM.getExerciseTitles.bind(exerciseVM),
      getStatisticsExercises: statisticsVM.fetchExercises.bind(statisticsVM),
      clearStatisticsMarkup: statisticsVM.clearMarkup.bind(statisticsVM),
    });

    exerciseVM.setExternalMethods({
      setStatisticUpdate: statisticsVM.setStatisticsUpdate.bind(statisticsVM),
    });

    // new Router([
    //   { component: exerciseVM, path: '/' },
    //   { component: planVM, path: '/plan' },
    //   { component: statisticsVM, path: '/statistics' },
    // ]);

    new Router([
      { component: statisticsVM, path: '/' },
      { component: planVM, path: '/plan' },
      { component: exerciseVM, path: '/statistics' },
    ]);
  }
}

new Dispatcher().init();
