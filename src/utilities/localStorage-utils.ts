export const saveData = (data: unknown, key: string) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const removeData = (key: string) => {
  localStorage.removeItem(key);
};
