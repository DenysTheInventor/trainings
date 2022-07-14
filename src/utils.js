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
  type == 1 ? (startTimeArray[1] += 1) : (startTimeArray[1] += 2);
  const endTime = startTimeArray.join("");
  return `${startTime} - ${endTime}`;
}

export function addTaskIcon(event) {
  event.preventDefault();
  const { target } = event;
  const addBTN = document.querySelector("#add-btn");

  if (!target.classList.contains("timesheet")) {
    addBTN.style.display = "none";
  } else {
    addBTN.style.display = "block";
  }
}

const TEAM_API_KEY =
  "549f3a7741960eec918a71f67d9ae4086e22e838f5b6e5ac906da8cf8616f34e";
