const date = () => {
  const date = new Date();
  //get year
  const year = date.getFullYear();
  //get month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = {
    num: date.getMonth() + 1,
    name: months[date.getMonth()],
  };
  // get day of the month
  const dayOfMonth = date.getDate();
  //get day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = {
    num: date.getDay() + 1,
    name: days[date.getDay()],
  };
  return {
    year,
    month,
    dayOfMonth,
    dayOfWeek,
  };
}
const time = () => {
  const date = new Date();
  //get hour in military format (24hr) and convert to 12 hr clock
  const hours = [
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];
  const hour = { hour24: date.getHours(), hour12: hours[date.getHours()] };
  /*get minutes*/
  const min = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];

  const minutes = min[date.getMinutes()];
  /*get seconds*/
  const seconds = date.getSeconds();
  /*get mill seconds*/
  const millSeconds = date.getMilliseconds();
  return { hour, minutes, seconds, millSeconds };
}

// export { date, time };