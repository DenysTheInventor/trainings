import { courses, iconColors, icons } from "./settings";

export function setThemeView(type) {
  const number = type - 1;
  return {
    icon: icons[number],
    color: iconColors[number],
    name: courses[number],
  };
}

export function addZero(n) {
  return (n < 10 ? "0" : "") + n;
}

export function returnDateNow() {
  const date = new Date();

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const year = date.getFullYear();

  return `${hours}:${minutes}. ${day}-${month}-${year}`;
}

export function setRecordTime(type, startTime) {
  const startTimeArray = startTime.split("");
  startTimeArray[1] = parseInt(startTimeArray[1]);
  type == 1 ? (startTimeArray[1] += 2) : (startTimeArray[1] += 1);
  const endTime = startTimeArray.join("");
  return `${startTime} - ${endTime}`;
}
