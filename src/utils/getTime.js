export const getTime = time => {
  const date = new Date(time);
  const hours = date.getHours() - 3;
  const min = date.getMinutes();
  return `${hours}:${min}`;
};
