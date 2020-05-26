export const setJsonStorage = (key, payload) => {
  console.log(payload);
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getJsonStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};
