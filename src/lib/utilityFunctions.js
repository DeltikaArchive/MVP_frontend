import { type } from "@testing-library/user-event/dist/type";

export const numberWithCommas = (x) => {
  if (typeof x !== "number") return x;
  const numFix = x.toFixed(0);
  return numFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const emptyFix = (x) => {
  if (typeof x !== "string") return "";
  return x;
};

export const minNumFix = (x) => {
  if (x === undefined) return 0;
  return x;
};

export const maxNumFix = (x) => {
  if (x === undefined) return 100000000000;
  return x;
};

export const countOwnersProperties = (name, array) => {
  let counter = 0;
  if (!name) return "N/A";
  for (let i = 0; i < array.length; i++) {
    if (array[i].owner === name) counter++;
  }
  return counter;
};

export const fixInterestRatePercent = (number) => {
  if (typeof number !== "number") return number;
  let fix = number * 100;
  return fix.toFixed(1);
};

export const checkDataExist = (x) => {
  if (x) return x;
  return "N/A";
};

export const riskFactor = (x) => {
  let res;
  if (typeof x !== "number") return "N/A";
  const num = (x / 33).toFixed(0);
  switch (num) {
    case "0":
      res = "Low";
      break;
    case "1":
      res = "Med";
      break;
    case "2":
    case "3":
      res = "High";
      break;

    default:
      res = "val error";
  }
  return res;
};

export const editYearsGraphTimeline = (array, years) => {
  const d = new Date();
  const year = d.getFullYear();
  const yearsFix = parseInt(years);
  if (!yearsFix) return array;
  const newArray = [[array[0][0], array[0][1]]];
  for (let i = 1; i < array.length; i++) {
    if (array[i][0] >= year - years) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

export const editDateGraphTimeline = (array, years) => {
  const d = new Date();
  const year = d.getFullYear();
  let yearsFix = parseInt(years);
  if (!yearsFix) yearsFix = year;
  const newArray = [[array[0][0], array[0][1]]];
  for (let i = 1; i < array.length; i++) {
    if (parseInt(array[i][0].slice(6)) >= year - yearsFix) {
      newArray.push(array[i]);
    }
  }
  return reArrangeDate(newArray);
};

export const toPercentArray = (array) => {
  const newArray = [[array[0][0], array[0][1]]];
  for (let i = 1; i < array.length; i++) {
    newArray.push([array[i][0], array[i][1] / 100]);
  }
  return newArray;
};

export const fixDateArray = (array) => {
  const newArray = [[array[0][0], array[0][1]]];
  for (let i = 1; i < array.length; i++) {
    newArray.push([new Date(array[i][0]), array[i][1]]);
  }
  return newArray;
};

export const fixInflationArray = (array) => {
  const newArray = [["Year", "Inflation Rate"]];
  for (let i = 1; i < array.length; i++) {
    newArray.push([array[i][0], array[i][2] / 100]);
  }
  return newArray;
};

export const reArrangeDate = (array) => {
  const newArray = [[array[0][0], array[0][1]]];
  for (let i = 1; i < array.length; i++) {
    const myArray = array[i][0].split("-");
    let dateFix = myArray[2] + "-" + myArray[1];
    newArray.push([dateFix, array[i][1]]);
  }
  return newArray;
};

export const changeArrayChannel = (array, number) => {
  const newArray = [[array[0][0], array[0][number]]];
  for (let i = 1; i < array.length; i++) {
    const myArray = array[i][0].split("-");
    let dateFix = myArray[2] + "-" + myArray[1];
    newArray.push([dateFix, array[i][number]]);
  }
  return newArray;
};

export const checkIt = (x) => {
  if (!x) return;
  return x;
};

export const checkIfDatePassed = (str) => {
  const today = new Date();
  const checkedDate = new Date(str);
  const didDatePass = today.setHours(0, 0, 0, 0) - checkedDate.setHours(0, 0, 0, 0) > 0;
  return didDatePass;
};
