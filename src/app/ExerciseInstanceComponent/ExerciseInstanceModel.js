import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class ExerciseInstanceModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.url = 'http://localhost:5000/exercise/';
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
    };

    try {
      if (!user_id) throw new Error('You need to login first');
      const response = await axios.post(this.url, payload, this.config);
      console.log('This is response from Saving Exercise', response.data);
      console.log(
        'This is response from Saving Exercise #2',
        response.data.exercise_id
      );
      return { type: 'success', payload: response.data };
    } catch (error) {
      console.error(error.message);
      return { type: 'error', payload: error.message };
    }
  }

  modelStartHandler() {
    console.log('Start Timer');
  }

  modelStopHandler() {
    console.log('Stop Timer');
  }
}

export default ExerciseInstanceModel;
