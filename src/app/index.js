import 'regenerator-runtime/runtime.js';
import '../styles/main.css';

import LoginViewModel from './LoginComponent/LoginViewModel';
// import ExerciseInstanceVM from './ExerciseInstanceComponent/ExerciseInstanceVM';
import ExerciseViewModel from './ExerciseComponent/ExerciseViewModel';
import PlanViewModel from './PlanComponent/PlanViewModel';
import HistoryViewModel from './HistoryComponent/HistoryViewModel';
import Router from './Router/Router';

function init() {
  // Init Login Controller
  new LoginViewModel();

  const eVM = new ExerciseViewModel();
  const pVM = new PlanViewModel();
  const hVM = new HistoryViewModel();

  // new Router([
  //   { component: ExerciseViewModel, path: '/' },
  //   { component: PlanViewModel, path: '/plan' },
  //   { component: HistoryViewModel, path: '/history' },
  // ]);
  new Router([
    { component: eVM, path: '/' },
    { component: pVM, path: '/plan' },
    { component: hVM, path: '/history' },
  ]);
}

class Dispatcher {
  constructor() {}

  init() {
    const loginVM = new LoginViewModel();
    const exerciseVM = new ExerciseViewModel();
    const planVM = new PlanViewModel();
    const historyVM = new HistoryViewModel();

    loginVM.setExternalMethods({
      getExercises: exerciseVM.getExercises.bind(exerciseVM),
      clearExercises: exerciseVM.clearExercises.bind(exerciseVM),
    });

    new Router([
      { component: exerciseVM, path: '/' },
      { component: planVM, path: '/plan' },
      { component: historyVM, path: '/history' },
    ]);
  }
}

new Dispatcher().init();
