export default (seconds) => {
  const time = {
    hours: 0,
    mins: 0,
    total_mins: 0,
  };

  const minutes = Math.floor(seconds / 60);
  time.hours = Math.floor(minutes / 60);
  time.mins = minutes % 60;
  time.total_mins = minutes;

  return time;
};
