class Timer {
  constructor(seconds = 0) {
    this.seconds = seconds;

    this.timer = document.createElement('div');
    this.timer.classList.add('timer');

    this.hours = 0;
    this.minutes = 0;
    this.secs = this.seconds % 60;

    this.intervalId = null;

    this.convertSeconds();
  }

  getAllSeconds() {
    return this.seconds;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.seconds += 1;
      this.changeTimer(this.seconds);
    }, 100);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  changeTimer(secs) {
    this.secs++;

    if (this.secs === 60) {
      this.minutes++;
      this.secs = 0;
    }
    if (this.minutes === 60) {
      this.hours++;
      this.minutes = 0;
    }

    this.formatTimer();
  }

  getTimer() {
    this.formatTimer();
    return this.timer;
  }

  formatTimer() {
    let fHour = this.hours < 10 ? `0${this.hours}` : this.hours;
    let fMin = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    let fSecs = this.secs < 10 ? `0${this.secs}` : this.secs;

    this.timer.innerText = `${fHour}:${fMin}:${fSecs}`;
  }

  convertSeconds() {
    if (this.seconds <= 59) {
      this.secs = this.seconds;
    } else if (this.seconds > 59) {
      let remainder = this.seconds % 60;
      let minutes = (this.seconds - remainder) / 60;
      this.minutes = minutes;
      this.secs = remainder;
    }

    if (this.minutes > 59) {
      let remainder = this.minutes % 60;
      let hours = (this.minutes - remainder) / 60;
      this.hours = hours;
      this.minutes = remainder;
    }
  }
}

export default Timer;
