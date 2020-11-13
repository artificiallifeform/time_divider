export default (seconds) => {
  let secs = 0;
  let mins = 0;
  let hrs = 0;

  secs = seconds;

  if (seconds >= 60) {
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
  }

  if (mins >= 60) {
    hrs = Math.floor(mins / 60);
    mins = mins % 60;
  }

  let timeStr = '';
  hrs !== 0 ? (timeStr += `${hrs}h `) : (timeStr += '');
  mins !== 0 ? (timeStr += `${mins}m `) : (timeStr += '');
  secs !== 0 ? (timeStr += `${secs}s `) : (timeStr += '');

  return timeStr;
};
