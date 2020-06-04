export default (fn, delay) => {
  console.log('Debounce exectued', fn);
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(args);
    }, delay);
  };
};
