import { courses, iconColors, icons } from "./settings";

export function setThemeView(type) {
  const number = type - 1;
  return {
    icon: icons[number],
    color: iconColors[number],
    name: courses[number],
  };
}
