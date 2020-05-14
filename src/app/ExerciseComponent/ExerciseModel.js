import axios from 'axios';

class ExerciseModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.url = 'http://localhost:5000/exercise/getexercise';
  }

  async fetchExercise() {
    console.log('Fetch Exercise Called');
    // Using POST method to take data from server.
    // If username looks like r1%b_ot then it will be a problem to pass this data with
    // query parameter.
    const username = localStorage.getItem('username');
    if (!username) return;
    const date = new Date().toISOString().substring(0, 10);
    const response = await axios.post(
      this.url,
      { username, date },
      this.config
    );

    if (response.data) {
      return response.data.optionsPerDay;
    }
  }
}

export default ExerciseModel;
