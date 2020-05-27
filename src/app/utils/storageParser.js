export const setJsonStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getJsonStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};
