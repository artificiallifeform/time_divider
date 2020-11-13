import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class ExerciseModel {
  constructor() {
    this.url = 'api/exercise/getexercise';
    this.getTitlesUrl = 'api/exercise/exercisetitles';
  }

  async fetchExercise() {
    const user_id = getJsonStorage('user').id;
    if (!user_id) return;
    const date = Math.floor(new Date().getTime() / 1000);
    const response = await axios.get(this.url, {
      params: {
        user_id,
        date,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      return response.data.exercises;
    }
  }

  async getExerciseTitles() {
    const user_id = getJsonStorage('user').id;
    if (!user_id) return;
    const response = await axios.get(this.getTitlesUrl, {
      params: {
        user_id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
    }
  }
}

export default ExerciseModel;
