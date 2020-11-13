import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class GoalsHistoryModel {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.url = 'api/goalshistory/';

    this.fetchGoalsLength();
  }

  async fetchGoalExercises() {
    const user_id = getJsonStorage('user').id;

    try {
      const goalExercises = await axios.get(this.url + '/all', {
        params: {
          user_id,
        },
        headers: this.headers,
      });

      return goalExercises.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async fetchGoals(option, specifier) {
    const user_id = getJsonStorage('user').id;

    try {
      const goalsHistory = await axios.get(this.url, {
        params: {
          user_id,
          spec: specifier,
          term: option,
        },
        headers: this.headers,
      });

      return goalsHistory.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async fetchGoalsLength() {
    // Amount of goals that are greater then 30 Day interval
    const user_id = getJsonStorage('user').id;

    try {
      const goals_length = await axios.get(this.url + 'total', {
        params: {
          user_id,
        },
        headers: this.headers,
      });
      return goals_length.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  static async fetchGoalsByPage(offset) {
    const user_id = getJsonStorage('user').id;

    try {
      const goalsPage = await axios.get('api/goalshistory/' + `${offset}`, {
        params: {
          user_id,
        },
        headers: this.headers,
      });
      return goalsPage.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }
}

export default GoalsHistoryModel;
