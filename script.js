const currentDataLabel = document.querySelector("#current-data");
const currentMonthLabel = document.querySelector("#current-month");
const upButton = document.querySelector(".up-arrow");
const downButton = document.querySelector(".down-arrow");
const daysWrapper = document.querySelector("#days-container");
const nextMonthButton = document.querySelector("#next-month");
const prevMonthButton = document.querySelector("#prev-month");
const NOW = new Date();
let currentDate = NOW;

const weekDay = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
const month = [
  ["января", "Январь"],
  ["февраля", "Февраль"],
  ["марта", "Март"],
  ["апреля", "Апрель"],
  ["мая", "Май"],
  ["июня", "Июнь"],
  ["июля", "Июль"],
  ["августа", "Август"],
  ["сентября", "Сентябрь"],
  ["октября", "Октябрь"],
  ["ноября", "Ноябрь"],
  ["декабря", "Декабрь"],
];

//получить первый день месяца
const calcFirstDay = (currentDate, step = 0) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() - step, 1);
};

//окрасить сегодняшний день
const colorCurDay = () => {
  const days = document.querySelectorAll(".days-item");
  days.forEach((el) => {
    if (
      el.textContent == NOW.getDate() &&
      el.classList.contains("current-month") &&
      currentMonthLabel.textContent.split(" ")[1] === "2024" &&
      currentMonthLabel.textContent.split(" ")[0] === month[NOW.getMonth()][1]
    ) {
      el.classList.add("current-day");
    }
  });
};

//возвращает массив дней прошлого месяца, которые отображаются в первом ряду
const calcLastDaysPreviousMonth = (firstDayPreviousMonth, firstDayCurrentMonth) => {
  let previousMonthDaysCount = calcDaysInMonth(firstDayPreviousMonth, firstDayCurrentMonth);
  const dayCount = getDayRusVer(firstDayCurrentMonth);
  if (dayCount === 7) return [];
  const arr = [];
  for (let i = 0; i < dayCount; ++i) {
    arr.unshift(previousMonthDaysCount);
    previousMonthDaysCount -= 1;
  }
  return arr;
};

//возвращает массив дней нынешнего месяца
const calcDaysCurrentMonth = (firstDayCurrentMonth, firstDayNextMonth) => {
  const dayCount = calcDaysInMonth(firstDayCurrentMonth, firstDayNextMonth);
  const arr = [];
  for (let i = 1; i <= dayCount; ++i) {
    arr.push(i);
  }
  return arr;
};

const calcDaysNextMonth = (dayCountPrevMounth, dayCountCurMonth) => {
  const dayCount = 42 - dayCountPrevMounth - dayCountCurMonth;
  const arr = [];
  for (let i = 1; i <= dayCount; ++i) {
    arr.push(i);
  }
  return arr;
};

//считает количество дней в месяце по первым числам месяца
const calcDaysInMonth = (firstDate, lastDate) => {
  return Math.round((lastDate - firstDate) / (1000 * 3600 * 24));
};

const getDayRusVer = (date) => {
  const day = date.getDay();
  if (day === 0) return 6;
  return day - 1;
};

const handleDayClick = (value) => {
  const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), value);
  console.log(selectedDate);
};

//отрисовать дни месяца
const renderCalendarDays = (days) => {
  const renderDays = (arr, classes, isClick = false) => {
    arr.forEach((el) => {
      const li = document.createElement("li");
      li.classList.add(...classes);
      li.textContent = el;
      if (isClick) {
        li.addEventListener("click", () => {
          handleDayClick(el);
        });
      }
      daysWrapper.appendChild(li);
    });
  };
  renderDays(days[0], ["days-item"]);
  renderDays(days[1], ["days-item", "current-month"], true);
  renderDays(days[2], ["days-item"]);
};

const renderCalendar = (currentDate) => {
  daysWrapper.innerHTML = "";
  const firstDayPreviousMonth = calcFirstDay(currentDate, 1);
  const firstDayCurrentMonth = calcFirstDay(currentDate);
  const firstDayNextMonth = calcFirstDay(currentDate, -1);

  //текст в заголовке календаря
  let headerText = `${weekDay[NOW.getDay()]}, ${NOW.getDate()} ${month[NOW.getMonth()][0]}`;
  let monthText = `${month[currentDate.getMonth()][1]} ${currentDate.getFullYear()}`;
  currentDataLabel.textContent = headerText;
  currentMonthLabel.textContent = monthText;

  //расчёт дней месяцев и рендер дней
  const lastDaysPreviousMonthArr = calcLastDaysPreviousMonth(firstDayPreviousMonth, firstDayCurrentMonth);
  const daysCurrentMonthArr = calcDaysCurrentMonth(firstDayCurrentMonth, firstDayNextMonth);
  const firstDaysNextMonthArr = calcDaysNextMonth(lastDaysPreviousMonthArr.length, daysCurrentMonthArr.length);
  const calendarDays = [lastDaysPreviousMonthArr, daysCurrentMonthArr, firstDaysNextMonthArr];
  renderCalendarDays(calendarDays);
  colorCurDay();
};

nextMonthButton.addEventListener("click", () => {
  currentDate = calcFirstDay(currentDate, -1);
  renderCalendar(currentDate);
});

prevMonthButton.addEventListener("click", () => {
  currentDate = calcFirstDay(currentDate, +1);
  renderCalendar(currentDate);
});

currentDataLabel.addEventListener("click", () => {
  currentDate = NOW;
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
