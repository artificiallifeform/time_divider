import 'regenerator-runtime/runtime.js';
import '../styles/workspace.css';

import LoginViewModel from './LoginComponent/LoginViewModel';
import ExerciseViewModel from './ExerciseComponent/ExerciseViewModel';
import PlanViewModel from './PlanComponent/PlanViewModel';
import HistoryViewModel from './HistoryComponent/HistoryViewModel';
import Router from './Router/Router';

function init() {
  // Init Login Controller
  new LoginViewModel();
  new Router([
    { component: ExerciseViewModel, path: '/' },
    { component: PlanViewModel, path: '/plan' },
    { component: HistoryViewModel, path: '/history' },
  ]);
}

init();
