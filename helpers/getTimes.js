export default function getTimes(day, month, year) {
  let date = year.toString(),
    workedDays = JSON.parse(localStorage.getItem("workedDays"));

  date += month.toString().padStart(2, "0");
  date += day.toString().padStart(2, "0");

  let obj = workedDays[date],
    res = {
      workSec: "00:00",
      restSec: "00:00",
      totalSec: "00:00",
    };

  const getTimes = (seconds) => {
    let hou = Math.floor(seconds / 3600),
      min = Math.floor((seconds - hou * 3600) / 60),
      sec = Math.floor(seconds - min * 60),
      clock = [
        hou.toString().padStart(2, "0"),
        min.toString().padStart(2, "0"),
        sec.toString().padStart(2, "0"),
      ];

    if (!hou) clock = clock.slice(1);

    return clock.join(":");
  };

  if (obj) {
    res.workSec = getTimes(obj.workSec);
    res.restSec = getTimes(obj.restSec);
    res.totalSec = getTimes(obj.workSec + obj.restSec);
  }

  return res;
}
