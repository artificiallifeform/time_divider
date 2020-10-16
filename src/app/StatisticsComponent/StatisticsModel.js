import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class StatisticsModel {
  constructor() {
    console.log('Statistics Model initialized');
    this.headers = {
      'Content-Type': 'application/json',
    };

    this.url = 'http://localhost:5000/statistics/';
    this.goal_url = 'http://localhost:5000/goals/';
  }

  async fetchExercises() {
    const user_id = getJsonStorage('user').id;
    if (!user_id) return [];
    try {
      const response = await axios.get(this.url + 'exercises', {
        params: {
          user_id,
        },
        headers: this.headers,
      });
      return response.data.exercises;
    } catch (error) {
      throw Error(error);
    }
  }

  async getStatistics(title) {
    const user_id = getJsonStorage('user').id;
    if (!user_id) return;

    try {
      const response = await axios.get(this.url, {
        params: {
          user_id,
          title,
        },
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async fetchGoals() {
    const user_id = getJsonStorage('user').id;
    if (!user_id) return;

    const date = Math.floor(new Date().getTime() / 1000);

    try {
      const response = await axios.get(this.goal_url, {
        params: {
          date,
          user_id,
        },
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default StatisticsModel;
