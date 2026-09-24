export default function MonthDays(day, month, year, color, today = true) {
  const d = document,
    $fragment = d.createDocumentFragment();

  let fstDay = new Date(`${month + 1} 01 ${year}`),
    days = 42,
    beforeDays = 0;

  if (fstDay.getDay() != 1) {
    let lastMonth = fstDay.getDay();
    if (lastMonth === 0) lastMonth = 7;
    beforeDays = lastMonth - 1;

    for (let i = beforeDays; i > 0; i--) {
      let drawDay = new Date(fstDay - 86400000 * i),
        $day = d.createElement("div");

      $day.classList.add("btn-day", `btn-${color}-shadow`);
      $day.innerHTML = `<p class="txt-s6 txt-s5-sm txt-grey">${drawDay.getDate()}</p>`;
      $fragment.appendChild($day);
    }
  }

  days -= beforeDays;

  for (let i = 0; i < days; i++) {
    let newDay = new Date(fstDay),
      $day = d.createElement("div"),
      flag = false;

    $day.classList.add("btn-day", `btn-${color}-shadow`);
    if (day - 1 === i) flag = true;
    if (flag && today) $day.classList.add(`bg-${color}`);

    newDay.setDate(newDay.getDate() + i);

    newDay.getMonth() === month
      ? flag && today
        ? ($day.innerHTML = `<p class="txt-s6 txt-s5-sm txt-semibold txt-white">${newDay.getDate()}</p>`)
        : ($day.innerHTML = `<p class="txt-s6 txt-s5-sm txt-dark">${newDay.getDate()}</p>`)
      : ($day.innerHTML = `<p class="txt-s6 txt-s5-sm txt-grey">${newDay.getDate()}</p>`);

    $fragment.appendChild($day);
  }

  return $fragment;
}
