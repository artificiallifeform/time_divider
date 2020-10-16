import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class GoalModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.postGoalUrl = 'http://localhost:5000/goals/';
  }

  async postGoal(data) {
    let { timeHours, timeMins, deadline, title } = data;

    const goal_data = {
      user_id: getJsonStorage('user').id,
      created_at: Math.floor(new Date().getTime() / 1000),
      goal_time: (timeHours * 60 + timeMins) * 60,
      expiration: Math.floor(new Date().getTime() / 1000) + deadline * 3600,
      time_spent: 0,
      title,
    };

    try {
      const response = await axios.post(
        this.postGoalUrl,
        goal_data,
        this.config
      );

      return response.data;
    } catch (error) {
      throw new Error(error);
    }

    console.log('Sending data to a server to create goal', data);
  }
}

export default GoalModel;
