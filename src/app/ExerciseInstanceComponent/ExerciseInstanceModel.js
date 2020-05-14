import axios from 'axios';

class ExerciseInstanceModel {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.url = 'http://localhost:5000/exercise';
  }

  async modelSaveHandler(inputVal, secs) {
    const username = localStorage.getItem('username');
    const date = new Date().toISOString().substring(0, 10); // To get YYYY-MM-DD format
    const payload = {
      value: inputVal,
      username,
      seconds: secs,
      date,
    };

    try {
      if (!username) throw new Error('You need to login first');
      await axios.post(this.url, payload, this.config);
      return false; // Means No Error occured
    } catch (error) {
      console.error(error.message);
      return error.message;
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
