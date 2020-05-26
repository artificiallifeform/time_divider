import axios from 'axios';
import { getJsonStorage } from '../utils/storageParser';

class ExerciseModel {
  constructor() {
    this.url = 'http://localhost:5000/exercise/getexercise';
  }

  async fetchExercise() {
    console.log('Fetch Exercise Called');
    // Using POST method to take data from server.
    // If username looks like r1%b_ot then it will be a problem to pass this data with
    // query parameter.
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
    console.log(response.data);
    if (response.data) {
      return response.data.exercises;
    }
  }
}

export default ExerciseModel;
