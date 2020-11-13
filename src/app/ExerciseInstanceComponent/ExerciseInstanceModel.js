import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class ExerciseInstanceModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.url = 'api/exercise/';
    this.getTitlesUrl = 'api/exercisetitles';
  }

  async fetchTitles(exerciseInput) {
    const user_id = getJsonStorage('user').id;
    try {
      const response = await axios.get(this.getTitlesUrl, {
        params: {
          user_id,
          val: exerciseInput,
        },
        ...this.config,
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async modelDeleteHandler(exercise_id) {
    try {
      await axios.delete(this.url, {
        params: {
          exercise_id,
        },
        ...this.config,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async modelSaveHandler(inputVal, secs, exercise_id) {
    const user_id = getJsonStorage('user').id;
    const date = Math.floor(new Date().getTime() / 1000); // To get YYYY-MM-DD format
    const payload = {
      title: inputVal,
      user_id,
      seconds: secs,
      date,
      exercise_id,
      last_update: date,
    };

    try {
      if (!user_id) throw new Error('You need to login first');
      const response = await axios.post(this.url, payload, this.config);
      return { type: 'success', payload: response.data };
    } catch (error) {
      console.error(error.message);
      return { type: 'error', payload: error.message };
    }
  }
}

export default ExerciseInstanceModel;
