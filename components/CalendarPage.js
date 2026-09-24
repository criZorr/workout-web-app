import getTimes from "../helpers/getTimes.js";
import MonthDays from "./MonthDays.js";

export default function CalendarPage(props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $calendar = d.createElement("section"),
    $streaks = d.createElement("section"),
    $times = d.createElement("section"),
    $statistics = d.createElement("section"),
    $calendarCard = d.createElement("section"),
    $calendarDays = d.createElement("section"),
    $statisticsWeek = d.createElement("section"),
    $statisticsMonth = d.createElement("section"),
    $statisticsMonthDays = d.createElement("aside");

  let today = new Date(),
    day = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  let { color, lang } = props,
    streaks = {
      current: localStorage.getItem("streak"),
      max: localStorage.getItem("maxStreak"),
    },
    dayTime = getTimes(day, month + 1, year);

  //Calendar Card
  const getDayNames = () => {
    const $fragmentNames = d.createDocumentFragment();

    for (let i = 0; i < 7; i++) {
      let num = 5 + i,
        $dayName = d.createElement("div");

      $dayName.classList.add("day");
      $dayName.innerHTML = `
        <p class="txt-semibold txt-s6 txt-s5-sm txt-dark">${new Intl.DateTimeFormat(
          lang,
          { weekday: "narrow" },
        ).format(new Date(`01 0${num} 2026`))}
        </p>
      `;

      $fragmentNames.appendChild($dayName);
    }

    return $fragmentNames;
  };

  $calendar.classList.add("calendar-card", "calendar-days");
  $calendar.innerHTML = `<p class="txt-bold txt-s4 txt-s3-sm txt-dark p-one-line">Calendar</p>`;

  $calendarCard.classList.add("calendar-card", "calendar-container");
  $calendarCard.innerHTML = `
    <section class="list-btn calendar-header">
      <p class="txt-semibold txt-s5 txt-s4-sm txt-dark p-one-line">${today.toLocaleDateString(lang, { month: "short" }).toUpperCase()}</p>
      <section class="btn-icons-container">
        <div class="btn-no-fill" data-btn="month-prev" data-month=${month} data-year=${year}>
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path class="fill-${color}" d="M10.689 0L3 8L10.689 16L13 13.5958L7.61991 8L13 2.40419L10.689 0Z"/>
            </svg>
          </div>
        </div>
        <div class="btn-no-fill" data-btn="month-next" data-month=${month} data-year=${year}>
          <div class="icon-svg">
            <svg viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path class="fill-${color}" d="M2.31104 16L10 8L2.31104 0L0 2.40419L5.38009 8L0 13.5958L2.31104 16Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
  `;

  $calendarDays.classList.add("calendar");

  $calendarDays.appendChild(getDayNames());
  $calendarDays.appendChild(MonthDays(day, month, year, color));
  $calendarCard.appendChild($calendarDays);
  $calendar.appendChild($calendarCard);

  //Streak Card
  $streaks.classList.add("calendar-card", "streak");
  $streaks.innerHTML = `
    <p class="txt-bold txt-s4 txt-s3-sm txt-dark p-one-line">Streak</p>
    <article class="calendar-counter-container">
      <aside class="calendar-counter">
        <section class="streak-icon w-100">
          <div class="btn-no-fill">
            <div class="icon-svg">
              <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-${color}" d="M6.97044 0.154282C6.83372 0.0531042 6.66949 -0.000892171 6.50124 1.11518e-05C6.33299 0.000914475 6.16932 0.0566713 6.03362 0.159312C4.5435 1.27337 0 5.06568 0 9.88402C0 12.6059 1.58275 14.9497 3.84638 16C3.45909 15.4377 3.2507 14.7652 3.25 14.0753C3.23619 11.3753 6.14087 8.29719 6.26438 8.20749C6.33296 8.15678 6.41522 8.12951 6.49959 8.12951C6.58397 8.12951 6.66623 8.15678 6.73481 8.20749C6.85831 8.29719 9.75 10.7005 9.75 14.077C9.75 14.7929 9.52656 15.4543 9.15444 16C11.4173 14.9497 13 12.6067 13 9.88821C13 4.97514 8.46463 1.24822 6.97044 0.154282Z" />
              </svg>
            </div>
          </div>
          <p class="txt-regular txt-s4 txt-s3-sm txt-${color} p-one-line">${streaks.current}</p>
        </section>
        <p class="txt-regular txt-s5 txt-s4-sm txt-dark p-one-line w-100">Current streak</p>
      </aside>
      <aside class="calendar-counter">
        <section class="streak-icon w-100">
          <div class="btn-no-fill">
            <div class="icon-svg">
              <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-${color}-light" d="M6.97044 0.154282C6.83372 0.0531042 6.66949 -0.000892171 6.50124 1.11518e-05C6.33299 0.000914475 6.16932 0.0566713 6.03362 0.159312C4.5435 1.27337 0 5.06568 0 9.88402C0 12.6059 1.58275 14.9497 3.84638 16C3.45909 15.4377 3.2507 14.7652 3.25 14.0753C3.23619 11.3753 6.14087 8.29719 6.26438 8.20749C6.33296 8.15678 6.41522 8.12951 6.49959 8.12951C6.58397 8.12951 6.66623 8.15678 6.73481 8.20749C6.85831 8.29719 9.75 10.7005 9.75 14.077C9.75 14.7929 9.52656 15.4543 9.15444 16C11.4173 14.9497 13 12.6067 13 9.88821C13 4.97514 8.46463 1.24822 6.97044 0.154282Z"/>
              </svg>
            </div>
          </div>
          <p class="txt-regular txt-s4 txt-s3-sm txt-${color}-light p-one-line">${streaks.max}</p>
        </section>
        <p class="txt-regular txt-s5 txt-s4-sm txt-grey p-one-line w-100">Max streak</p>
      </aside>
    </article>
  `;

  //Times Card
  $times.classList.add("calendar-card", "times");
  $times.innerHTML = `
    <p class="txt-bold txt-s4 txt-s3-sm txt-dark p-one-line">Times</p>
    <article class="calendar-counter-container">
      <aside class="calendar-counter">
        <p class="txt-regular txt-s4 txt-s3-sm txt-${color} p-one-line w-100 total-count">${dayTime.totalSec}</p>
        <p class="txt-regular txt-s5 txt-s4-sm txt-dark p-one-line w-100">Total time</p>
      </aside>
      <aside class="calendar-counter">
        <p class="txt-regular txt-s4 txt-s3-sm txt-${color} p-one-line w-100 work-count">${dayTime.workSec}</p>
        <p class="txt-regular txt-s5 txt-s4-sm txt-dark p-one-line w-100">Workout time</p>
      </aside>
    </article>
  `;

  //Statistics Card
  $statistics.classList.add("calendar-card", "statistics");
  $statistics.innerHTML = `<p class="txt-bold txt-s4 txt-s3-sm txt-dark p-one-line">Statistics</p>`;
  $statisticsWeek.classList.add("week-stat", "days-info");
  $statisticsWeek.innerHTML = `<p class="txt-semibold txt-s5 txt-s4-sm txt-dark p-one-line">Last 7 days</p>`;
  for (let i = 0; i < 7; i++) {
    const $card = d.createElement("div");
    $card.classList.add("daily-time");

    let slug = "Today",
      time = "",
      day = new Date(today);

    day.setDate(day.getDate() - i);
    time = getTimes(day.getDate(), day.getMonth() + 1, day.getFullYear());

    if (i > 0)
      slug = `${day.toLocaleDateString(lang, { month: "short" })} ${day.getDate().toString().padStart(2, "0")}`;
    if (i === 1) slug = "Yesterday";

    $card.innerHTML = `
      <p class="txt-regular txt-s5 txt-s4-sm txt-grey p-one-line">${slug}</p>
      <p class="txt-regular txt-s5 txt-s4-sm txt-grey p-one-line">${time.workSec}</p>
    `;

    $statisticsWeek.appendChild($card);
  }
  $statisticsMonth.classList.add("month-stat", "days-info");
  $statisticsMonth.innerHTML = `<p class="txt-semibold txt-s5 txt-s4-sm txt-dark p-one-line">Last 30 days</p>`;
  $statisticsMonthDays.classList.add("month-days");
  for (let i = 0; i < 30; i++) {
    const workedDays = JSON.parse(localStorage.getItem("workedDays")),
      $card = d.createElement("div");

    let day = new Date(today),
      strDay = "";

    day.setDate(day.getDate() - i);

    strDay = day.getFullYear().toString();
    strDay += (day.getMonth() + 1).toString().padStart(2, "0");
    strDay += day.getDate().toString().padStart(2, "0");

    $card.classList.add("month-day");
    workedDays[strDay]
      ? $card.classList.add(`bg-${color}-light`, `border-${color}`)
      : $card.classList.add("border-grey");

    $statisticsMonthDays.appendChild($card);
  }
  $statisticsMonth.appendChild($statisticsMonthDays);
  $statistics.appendChild($statisticsWeek);
  $statistics.appendChild($statisticsMonth);

  //Calendar Page
  $fragment.appendChild($calendar);
  $fragment.appendChild($streaks);
  $fragment.appendChild($times);
  $fragment.appendChild($statistics);

  return $fragment;
}
