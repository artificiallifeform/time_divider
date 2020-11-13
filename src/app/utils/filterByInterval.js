import formatSeconds from './formatSeconds';

export default (interval, data) => {
  let curDate = new Date(new Date().toISOString().split('T')[0] + 'T00:00:00');

  let dateSubInterval = new Date();
  // Substract Amount of Interval Days From date
  dateSubInterval.setDate(new Date(curDate).getDate() - interval);
  // Get only Date
  let splittedDate = dateSubInterval.toISOString().split('T')[0];
  // Set time to 00:00:00 To make right comparison
  let dateInterval = new Date(`${splittedDate}T00:00:00`);

  let totalSeconds = 0;

  data.forEach((exercise) => {
    let onlyExerciseDate = new Date(exercise.date).toISOString().split('T')[0];
    let tDate = new Date(`${onlyExerciseDate}T00:00:00`);

    if (interval === 1 && tDate < curDate && tDate >= dateInterval) {
      totalSeconds += exercise.seconds;
    } else if (interval !== 1 && tDate >= dateInterval) {
      totalSeconds += exercise.seconds;
    }
  });
  return formatSeconds(totalSeconds);
};
