const WORKDAYHOURS = "08:00";

export const subtractHours = (value1: string, value2: string) => {
  if (!value1 && !value2) {
    return "00:00";
  }
  let hoursValue1 = value1.slice(0, 2);
  let minutesValue1 = value1.slice(3);

  let hoursValue2 = value2.slice(0, 2);
  let minutesValue2 = value2.slice(3);

  let finalHours = Number(hoursValue2) - Number(hoursValue1);
  let finalMinutes = Number(minutesValue2) - Number(minutesValue1);
  if (finalMinutes < 0) {
    finalHours = finalHours - 1;
    finalMinutes = finalMinutes + 60;
  }
  return `${finalHours < 10 ? `0${finalHours}` : `${finalHours}`}:${
    finalMinutes < 10 ? `0${finalMinutes}` : `${finalMinutes}`
  }`;
};

export const sumHours = (value1: string, value2: string) => {
  let hoursValue1 = value1.slice(0, 2);
  let minutesValue1 = value1.slice(3);

  let hoursValue2 = value2.slice(0, 2);
  let minutesValue2 = value2.slice(3);

  let finalHours = Number(hoursValue2) + Number(hoursValue1);
  let finalMinutes = Number(minutesValue2) + Number(minutesValue1);
  if (finalMinutes > 59) {
    finalHours = finalHours + 1;
    finalMinutes = finalMinutes - 60;
  }
  return `${finalHours < 10 ? `0${finalHours}` : `${finalHours}`}:${
    finalMinutes < 10 ? `0${finalMinutes}` : `${finalMinutes}`
  }`;
};

export const negativeHours = (value1: string, value2: string) => {
  let hoursValue1 = value1.slice(0, 2);
  let minutesValue1 = value1.slice(3);

  let hoursValue2 = value2.slice(0, 2);
  let minutesValue2 = value2.slice(3);

  let finalHours = Number(hoursValue2) - Number(hoursValue1);
  let finalMinutes = Number(minutesValue2) - Number(minutesValue1);

  if (Number(hoursValue2) - Number(hoursValue1) >= 0) {
    return "00:00";
  }

  if (finalHours < 0 && finalHours > -10) {
    finalHours = Math.abs(finalHours + 1);
    if (Math.abs(finalMinutes - 60) === 60) {
      finalMinutes = 0;
      finalHours = Math.abs(finalHours + 1);
    } else {
      finalMinutes = Math.abs(finalMinutes - 60);
    }
  }

  if (finalHours <= -10) {
    finalHours = Math.abs(finalHours + 1);
  }

  return `${finalHours < 10 ? `0${finalHours}` : `${finalHours}`}:${
    finalMinutes < 10 ? `0${finalMinutes}` : `${finalMinutes}`
  }`;
};

export const calcWorkedHours = (
  arrivalTime: string,
  lunchExitTime: string,
  lunchArrivalTime: string,
  exitTime: string
) => {
  return sumHours(
    subtractHours(arrivalTime, lunchExitTime),
    subtractHours(lunchArrivalTime, exitTime)
  );
};

export const calcOvertimeHours = (
  arrivalTime: string,
  lunchExitTime: string,
  lunchArrivalTime: string,
  exitTime: string
) => {
  return subtractHours(
    WORKDAYHOURS,
    calcWorkedHours(arrivalTime, lunchExitTime, lunchArrivalTime, exitTime)
  ).length > 5
    ? "00:00"
    : subtractHours(
        WORKDAYHOURS,
        calcWorkedHours(arrivalTime, lunchExitTime, lunchArrivalTime, exitTime)
      );
};

export const calcUndertimeHours = (
  arrivalTime: string,
  lunchExitTime: string,
  lunchArrivalTime: string,
  exitTime: string
) => {
  return negativeHours(
    WORKDAYHOURS,
    calcWorkedHours(arrivalTime, lunchExitTime, lunchArrivalTime, exitTime)
  );
};
