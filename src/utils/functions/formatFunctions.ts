export const formatHourInput = (
  value: string,
  updateFunction: (value: string) => void
) => {
  let hours = value.slice(0, 2);
  let minutes = value.slice(3);
  if (Number(hours) > 23) {
    hours = "23";
  }
  if (Number(minutes) > 59) {
    minutes = "59";
  }
  updateFunction(`${hours}:${minutes}`);
};
