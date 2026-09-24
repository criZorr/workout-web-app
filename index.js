import toSentenceCase from "./helpers/toSentenceCase.js";
import HomePage from "./components/HomePage.js";
import Header from "./components/Header.js";
import getData from "./helpers/getData.js";
import CalendarPage from "./components/CalendarPage.js";
import SettingsPage from "./components/SettingsPage.js";
import CreatePage from "./components/CreatePage.js";
import PreviewCard from "./components/PreviewCard.js";
import ActivityCard from "./components/ActivityCard.js";
import DetailsCard from "./components/DetailsCard.js";
import ModalDelete from "./components/ModalDelete.js";
import ModalList from "./components/ModalList.js";
import ModalAdd from "./components/ModalAdd.js";
import ModalInstructions from "./components/ModalInstructions.js";
import RestCard from "./components/RestCard.js";

const d = document,
  w = window,
  $header = d.querySelector(".header"),
  $main = d.querySelector(".main"),
  $interaction = d.querySelector(".interaction-container"),
  $modal = d.querySelector(".modal-container"),
  painter = {
    home: HomePage,
    calendar: CalendarPage,
    settings: SettingsPage,
    create: CreatePage,
    preview: PreviewCard,
    activity: ActivityCard,
    details: DetailsCard,
    rest: RestCard,
  };

let props = {},
  workoutDB = [],
  routines = [],
  actualRoutine = {},
  actualEdit = {},
  workedDays = {},
  currentFilter = ["all", "all"],
  currentSearch = "",
  startTime = 0,
  startRestTime = 0,
  counterWorkout = 0,
  counterRest = 0,
  workoutClock = "",
  handleClock = { action: "" },
  workoutWatch = "",
  handleWatch = 0,
  workoutCounter = "",
  handleCounter = 0,
  todayWork = 0,
  todayRest = 0,
  listSearch = [],
  alarm = "",
  voiceName = "",
  voices = [],
  maxStreak = 0,
  streak = 0,
  day = new Date(),
  dateString =
    day.getFullYear().toString() +
    (day.getMonth() + 1).toString().padStart(2, "0") +
    day.getDate().toString().padStart(2, "0");

const handleStreak = (list = workedDays) => {
  let ytd = new Date(day),
    ytdString = "";

  ytd.setDate(ytd.getDate() - 1);
  ytdString =
    ytd.getFullYear().toString() +
    (ytd.getMonth() + 1).toString().padStart(2, "0") +
    ytd.getDate().toString().padStart(2, "0");

  if (list === workedDays) {
    let sum = streak + 1;
    localStorage.setItem("streak", sum);
    if (sum > maxStreak) localStorage.setItem("maxStreak", sum);
  } else {
    if (!list[ytdString] && !list[dateString])
      localStorage.setItem("streak", 0);
  }
};

const speak = (text = "", speed = 1) => {
  if ("speechSynthesis" in window && text !== "") {
    speechSynthesis.cancel();
    let msg = new SpeechSynthesisUtterance(text);
    msg.voice = voiceName ? voices.find((e) => e.name === voiceName) : null;
    msg.rate = speed;
    msg.volume = 1;
    w.speechSynthesis.speak(msg);
  }
};

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

const findData = (el, node, name) => {
  return el.dataset[name] || el.closest(node).dataset[name];
};

const clearTimes = () => {
  clearTimeout(workoutClock);
  clearInterval(workoutWatch);
  clearInterval(workoutCounter);
};

const addEditManager = (target, type, action) => {
  let id = findData(target, type, "id") || false,
    position = findData(target, type, "position") || false,
    currentWork = workoutDB.find((ex) => ex.id === id),
    currentProps = actualEdit.workouts[position],
    data = {
      workout: currentWork,
      time: currentProps ? currentProps.time : 30,
      reps: currentProps ? currentProps.reps : 0,
      series: currentProps ? currentProps.series : 1,
      sec_serie: currentProps
        ? currentProps.seconds_serie
        : actualEdit.seconds_general,
      sec_end: currentProps ? currentProps.seconds_end : 0,
    };

  showModal();
  $modal.innerHTML = null;
  $modal.appendChild(ModalAdd(props, data, action, position));
};

const showResults = (list, search = false) => {
  const $fragment = d.createDocumentFragment();
  if (!search) listSearch = [];
  list.forEach((workout, i) => {
    const $option = d.createElement("section");
    if (i == 0) $option.classList.add("list-option-fst");
    if (i == list.length - 1) $option.classList.add("list-option-lst");
    $option.classList.add("list-btn", "list-option");
    $option.innerHTML = `
        <p class="txt-s5 txt-s4-sm txt-regular p-one-line txt-dark">${toSentenceCase(workout.name)}</p>
        <section class="btn-icons-container">
          <div class="btn-xs-icon circle bg-${props.color} btn-icon-sm" data-btn="add" data-id="${workout.id}">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4 0H5.6V5.59688H0V10.4031H5.6V16H10.4V10.4031H16V5.59688H10.4V0Z" class="fill-light"/>
              </svg>
            </div>
          </div>
        </section>
      `;
    $fragment.appendChild($option);
    if (!search) listSearch.push({ name: workout.name, id: workout.id });
  });
  return $fragment;
};

const manageFilter = (part = "all", equip = "all") => {
  const $fstFilter = d.querySelector(".filter-fst"),
    $sndFilter = d.querySelector(".filter-snd"),
    $containerList = d.querySelector(".workouts-list"),
    $search = d.querySelector(".list-search");

  let fstValue = $fstFilter.value,
    sndValue = $sndFilter.value,
    workoutsList = workoutDB;

  if (part !== "all") {
    fstValue = part;
    $fstFilter.value = part;
  }

  if (equip !== "all") {
    sndValue = equip;
    $sndFilter.value = equip;
  }

  if (fstValue !== "all" && sndValue === "all")
    workoutsList = workoutDB.filter((ex) => ex.category === fstValue);

  if (fstValue === "all" && sndValue !== "all")
    workoutsList = workoutDB.filter((ex) => ex.equipment === sndValue);

  if (fstValue !== "all" && sndValue !== "all") {
    let workoutsListFst = workoutDB.filter((ex) => ex.category === fstValue);
    workoutsList = workoutsListFst.filter((ex) => ex.equipment === sndValue);
  }

  currentFilter = [fstValue, sndValue];

  const manageAppend = (action = true) => {
    $containerList.innerHTML = null;
    if (action) {
      $containerList.appendChild(showResults(workoutsList));
    } else {
      let res = listSearch.filter((el) =>
        el.name.includes($search.value.toLowerCase()),
      );
      $containerList.appendChild(showResults(res, true));
    }
  };

  manageAppend();
  $search.value = currentSearch;
  if ($search.value !== "") manageAppend(false);

  $search.addEventListener("keyup", (e) => {
    e.target.value === "" ? manageAppend() : manageAppend(false);
    currentSearch = e.target.value;
  });
};

const showModal = () => {
  $modal.classList.remove("dp-none");
};

const hideModal = () => {
  $modal.classList.add("dp-none");
};

const setTimes = (type) => {
  switch (type) {
    case "workout":
      counterWorkout += Math.round((Date.now() - startTime) / 100) / 10;
      break;
    case "rest":
      counterRest += Math.round((Date.now() - startRestTime) / 100) / 10;
      break;
  }

  if (Math.floor(counterWorkout) > 0) {
    if (!workedDays[dateString]) handleStreak();
    workedDays[dateString] = {
      workSec: Math.floor(todayWork + counterWorkout),
      restSec: Math.floor(todayRest + counterRest),
    };
    localStorage.setItem("workedDays", JSON.stringify(workedDays));
  }
};

const activityActions = (count = 0, seriesCount = 1) => {
  const $title = d.querySelector(".workout-title"),
    $description = d.querySelector(".workout-description"),
    $img = d.querySelector(".workout-img"),
    $countTime = d.querySelector(".dynamic"),
    $counter = $countTime.querySelector("p"),
    $countReps = d.querySelector(".static"),
    $btnsNext = d.querySelectorAll(".counter-btns");

  let workoutProps = actualRoutine.workouts[count],
    workoutsLength = actualRoutine.workouts.length,
    workout = workoutDB.find((e) => Number(e.id) === Number(workoutProps.id)),
    txt = [
      "Do the exercise!",
      `${workout.name}.`,
      workoutProps.time
        ? `${workoutProps.time} seconds.`
        : `${workoutProps.reps} repetitions.`,
    ];

  speak(txt.join(" "));

  if (!workoutProps.time) {
    $countTime.classList.add("dp-none");
    $countReps.classList.remove("dp-none");
    $countReps.querySelector("p").innerHTML = `${workoutProps.reps} reps`;
    $btnsNext[0].dataset.btn = "skip";
  }

  if (!workoutProps.reps) {
    let $bar = d.createElement("div");
    $bar.classList.add("bar-animated", `border-${props.color}`);
    $bar.style.transitionDuration = `${workoutProps.time}s`;

    $countReps.classList.add("dp-none");
    $countTime.classList.remove("dp-none");

    handleCounter = workoutProps.time;
    $counter.innerHTML = `${handleCounter} s`;

    workoutCounter = setInterval(() => {
      if (handleCounter > 0) {
        handleCounter -= 1;
        $counter.innerHTML = `${handleCounter} s`;
        if (handleCounter <= 3 && handleCounter > 0) speak(handleCounter, 1.25);
        if (handleCounter === 0) {
          $btnsNext[1].classList.remove("disable");
          playSound(alarm);
        }
      }
    }, 1000);

    if ($countTime.querySelector(".bar-animated"))
      $countTime.querySelector(".bar-animated").outerHTML = null;

    $countTime.appendChild($bar);
    $countTime.querySelector(".bar-animated").offsetHeight;
    $countTime.querySelector(".bar-animated").classList.add("active");

    $btnsNext[0].dataset.btn = "next";
    $btnsNext[1].classList.add("disable");
  }

  if (Number(seriesCount) === workoutProps.series) {
    Array.from($btnsNext).forEach((btn) => {
      btn.dataset.rest =
        workoutProps.seconds_end || actualRoutine.seconds_general;
      btn.dataset.count = 1 + Number(count);
      btn.removeAttribute("data-reps");
    });
    if (!(Number(count) < workoutsLength - 1)) {
      count = 0;
      Array.from($btnsNext)[1].querySelector("p").innerHTML = "Finish";
      Array.from($btnsNext).forEach((btn) => {
        btn.removeAttribute("data-rest");
        btn.dataset.btn = "finish";
      });
    }
  } else {
    Array.from($btnsNext).forEach((btn) => {
      btn.dataset.rest = workoutProps.seconds_serie;
      btn.dataset.count = Number(count);
      btn.dataset.reps = 1 + Number(seriesCount);
    });
  }

  $img.src = `./db/gif/${workout.id}-${workout.media_id}.gif`;
  $img.alt = `${workout.name} image`;
  $title.innerHTML = toSentenceCase(workout.name);
  $description.innerHTML =
    workout.instruction_steps[props.lang].join("<br/><br/>");
};

const paintInteractive = (clase = false, type = false, obj) => {
  const $article = d.querySelector(`.${clase}`);
  $article.innerHTML = null;
  $article.appendChild(painter[type](props, obj, workoutDB));
};

const manageRest = (time, workoutProps, msg = "Take a rest!") => {
  let workout = workoutDB.find((e) => Number(e.id) === Number(workoutProps.id)),
    $bar = d.createElement("div"),
    txt = [];

  $bar.classList.add("bar-animated", `border-${props.color}`);
  $bar.style.transitionDuration = `${time}s`;

  paintInteractive("action-page", "rest", {
    headerName: actualRoutine.name,
    mediaName: `${workout.id}-${workout.media_id}`,
    name: toSentenceCase(workout.name),
    time: workoutProps.time,
    reps: workoutProps.reps,
    msg,
  });

  const $counterTime = d.querySelector(".dynamic"),
    $counter = $counterTime.querySelector(".dynamic-number");

  txt = [
    msg,
    `${time} second${time > 1 ? "s" : "time"}.`,
    "Next exercise:",
    `${workout.name}.`,
  ];
  speak(txt.join(" "));

  $counterTime.appendChild($bar);
  $counterTime.querySelector(".bar-animated").offsetHeight;
  $counterTime.querySelector(".bar-animated").classList.add("active");

  handleWatch = time;
  $counter.innerHTML = `${handleWatch} s`;
  startRestTime = Date.now();

  workoutWatch = setInterval(() => {
    if (handleWatch > 0) {
      handleWatch -= 1;
      $counter.innerHTML = `${handleWatch} s`;
      if (handleWatch <= 3 && handleWatch > 0) speak(handleWatch, 1.25);
    }
  }, 1000);
};

const handleNext = (el, type, skip = false) => {
  let numb = findData(el, type, "count") || false,
    serieNmb = findData(el, type, "reps") || undefined,
    rest = findData(el, type, "rest") || undefined;

  handleClock.action = (action = true) => {
    if (action) playSound(alarm);
    clearInterval(workoutWatch);
    startTime = Date.now();
    setTimes("rest");
    paintInteractive("action-page", "activity", actualRoutine);
    activityActions(numb, serieNmb);
  };

  if (!skip) setTimes("workout");
  clearInterval(workoutCounter);

  if (Number(rest) > 0) {
    manageRest(Number(rest), actualRoutine.workouts[numb]);
    workoutClock = setTimeout(handleClock.action, Number(rest) * 1000);
  } else {
    startRestTime = Date.now();
    handleClock.action();
  }
};

const showInteractive = (clase) => {
  $header.classList.add("dp-none", "dp-block-lg");
  $main.classList.add("dp-none", "dp-block-lg");
  $interaction.classList.remove("dp-none");
  $interaction.querySelector(`.${clase}`).classList.remove("dp-none");
};

const handleMove = (target, node, up = true) => {
  const $list = d.querySelector("#routine-workouts"),
    $listInfo = d.querySelector(".preview-info");
  let position = findData(target, node, "position") || false;

  if (!position) return;
  let num = up ? -1 : 1,
    nP = Number(position),
    ogP = actualEdit.workouts[nP + num],
    newP = actualEdit.workouts[nP],
    ogN = $list.childNodes[nP + num],
    newN = $list.childNodes[nP],
    ogI = $listInfo.childNodes[nP + num + 1],
    newI = $listInfo.childNodes[nP + 1],
    ogBtns = ogN.querySelectorAll("[data-position]"),
    newBtns = newN.querySelectorAll("[data-position]");

  actualEdit.workouts[nP + num] = newP;
  actualEdit.workouts[nP] = ogP;

  if (up) {
    ogN.before(newN);
    ogI.before(newI);
  } else {
    ogN.after(newN);
    ogI.after(newI);
  }

  ogBtns.forEach((e) => (e.dataset.position = nP));
  newBtns.forEach((e) => (e.dataset.position = nP + num));

  nP === 0
    ? ogBtns[0].classList.add("disable")
    : ogBtns[0].classList.remove("disable");

  nP + num === 0
    ? newBtns[0].classList.add("disable")
    : newBtns[0].classList.remove("disable");

  nP === actualEdit.workouts.length - 1
    ? ogBtns[1].classList.add("disable")
    : ogBtns[1].classList.remove("disable");

  nP + num === actualEdit.workouts.length - 1
    ? newBtns[1].classList.add("disable")
    : newBtns[1].classList.remove("disable");
};

const hideInteractive = () => {
  $header.classList.remove("dp-none", "dp-block-lg");
  $main.classList.remove("dp-none", "dp-block-lg");
  $interaction.classList.add("dp-none");
  $interaction.querySelector(".create-page").classList.add("dp-none");
  $interaction.querySelector(".action-page").classList.add("dp-none");
};

const contentPainter = (hash, manager) => {
  const $container = d.querySelector(`.${hash}-page`);
  $container.innerHTML = null;
  $container.appendChild(manager(props));
};

const managePage = (hash) => {
  const $icons = d.querySelectorAll(".header-container > .icon-text");
  Array.from($icons).forEach((icon) => {
    if (icon.hash == `#${hash}`) {
      icon.classList.add(`active-${props.color}`);
      icon.classList.remove(`hover-${props.color}`);
    } else {
      icon.classList.add(`hover-${props.color}`);
      icon.classList.remove(`active-${props.color}`);
    }
  });
};

const paintHeader = () => {
  const $header = d.querySelector(".header");
  $header.appendChild(Header(props));
};

const showMain = (namePage) => {
  Array.from($main.children).forEach((el) => {
    el.matches(`.${namePage}-page`)
      ? el.classList.remove("dp-none")
      : el.classList.add("dp-none");
  });
};

const router = () => {
  let hash = w.location.hash.replaceAll("#", "");
  if (!hash) hash = "home";
  managePage(hash);
  showMain(hash);
  contentPainter(hash, painter[hash]);
};

const localData = async () => {
  alarm = new Audio("./assets/sounds/bell-98033.mp3");
  voices = w.speechSynthesis.getVoices();
  console.log(voices);

  if (!localStorage.getItem("routines")) {
    let defaultRoutines = await getData("./db/default-routines.json");
    localStorage.setItem("routines", JSON.stringify(defaultRoutines));
  }
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");
  if (!localStorage.getItem("color")) localStorage.setItem("color", "green");
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
  if (!localStorage.getItem("maxStreak")) localStorage.setItem("maxStreak", 0);
  if (!localStorage.getItem("streak")) localStorage.setItem("streak", 0);
  if (!localStorage.getItem("workedDays"))
    localStorage.setItem("workedDays", JSON.stringify({}));
  if (!localStorage.getItem("startTime")) localStorage.setItem("startTime", 10);
  if (!localStorage.getItem("restTime")) localStorage.setItem("restTime", 30);
  if (!localStorage.getItem("voiceName"))
    localStorage.setItem("voiceName", voices[0] ? voices[0].name : "");

  routines = JSON.parse(localStorage.getItem("routines"));
  props.theme = localStorage.getItem("theme");
  props.color = localStorage.getItem("color");
  props.lang = localStorage.getItem("language");

  voiceName = localStorage.getItem("voiceName");
  handleStreak(JSON.parse(localStorage.getItem("workedDays")));
  maxStreak = Number(localStorage.getItem("maxStreak"));
  streak = Number(localStorage.getItem("streak"));
};

d.addEventListener("DOMContentLoaded", async () => {
  await localData();
  paintHeader();
  router();
  workoutDB = await getData("./db/exercises.json");
});

d.addEventListener("click", (e) => {
  let btnCreate = `[data-btn="create"]`,
    btnPreview = `[data-btn="preview"]`,
    btnStart = `[data-btn="start"]`,
    btnNext = `[data-btn="next"]`,
    btnSkip = `[data-btn="skip"]`,
    btnSkipRest = `[data-btn="rest"]`,
    btnFinish = `[data-btn="finish"]`,
    btnDetails = `[data-btn="details"]`,
    confirmRoutine = `[data-confirm="routine"]`,
    confirmWorkout = `[data-confirm="workout"]`,
    btnList = `[data-btn="list"]`,
    btnAdd = `[data-btn="add"]`,
    btnEdit = `[data-btn="edit"]`,
    btnInstruction = `[data-btn="instruction"]`,
    saveWorkout = `[data-save="workout"]`,
    saveRoutine = `[data-save="routine"]`,
    dltRoutine = `[data-delete="routine"]`,
    dltWorkout = `[data-delete="workout"]`,
    modalClose = `[data-modal="close"]`,
    interactionClose = `[data-interaction="close"]`,
    btnUp = `[data-btn="up"]`,
    btnDown = `[data-btn="down"]`;

  if (e.target.matches(btnAdd) || e.target.matches(`${btnAdd} *`))
    addEditManager(e.target, btnAdd, true);

  if (e.target.matches(btnEdit) || e.target.matches(`${btnEdit} *`))
    addEditManager(e.target, btnEdit, false);

  if (e.target.matches(saveWorkout) || e.target.matches(`${saveWorkout} *`)) {
    let id = findData(e.target, saveWorkout, "id") || false,
      position = findData(e.target, saveWorkout, "position") || false,
      obj = {},
      time = 0,
      reps = 0,
      series = Number(d.getElementById("add-series").value) || 1,
      seconds_serie = 0,
      seconds_end = Number(d.getElementById("add-sec-end").value) || 0;

    d.getElementById("tab-1").checked
      ? (time = Number(d.getElementById("add-time").value) || 30)
      : (reps = Number(d.getElementById("add-time").value) || 10);

    if (series > 1)
      seconds_serie = Number(d.getElementById("add-sec-series").value) || 0;

    obj = {
      id,
      time,
      reps,
      series,
      seconds_serie,
      seconds_end,
    };

    position
      ? (actualEdit.workouts[position] = obj)
      : actualEdit.workouts.push(obj);

    showInteractive("create-page");
    paintInteractive("create-page", "create", actualEdit);
  }

  if (e.target.matches(dltWorkout) || e.target.matches(`${dltWorkout} *`)) {
    let id = findData(e.target, dltWorkout, "id") || false;
    actualEdit.workouts.splice(id, 1);
    showInteractive("create-page");
    paintInteractive("create-page", "create", actualEdit);
  }

  if (e.target.matches(saveRoutine) || e.target.matches(`${saveRoutine} *`)) {
    const obj = {};
    obj.id = actualEdit.id;
    obj.name = d.getElementById("routine-name").value || "New Routine";
    obj.imgName = "placeholder";
    obj.seconds_general = Number(d.getElementById("routine-time").value) || 30;
    obj.workouts = actualEdit.workouts;

    if (actualEdit.workouts.length === 0) {
      alert("You need to add at least one excersice");
    } else {
      let index = routines.findIndex((e) => e.id === actualEdit.id);
      index !== -1 ? (routines[index] = obj) : routines.push(obj);
      localStorage.setItem("routines", JSON.stringify(routines));
      router();
      hideInteractive();
    }
  }

  if (e.target.matches(dltRoutine) || e.target.matches(`${dltRoutine} *`)) {
    let id = findData(e.target, dltRoutine, "id") || false;
    routines = routines.filter((e) => e.id !== id);
    localStorage.setItem("routines", JSON.stringify(routines));
    router();
  }

  if (e.target.matches(btnCreate) || e.target.matches(`${btnCreate} *`)) {
    let id = findData(e.target, btnCreate, "id") || false,
      newId = "";

    if (id) {
      actualEdit = routines.find((e) => e.id === id);
    } else {
      for (let i = 1; i < routines.length + 2; i++)
        if (!routines.find((e) => e.id === i.toString())) newId = i.toString();

      actualEdit = {
        id: newId,
        imgName: "placeholder",
        seconds_general: Number(localStorage.getItem("restTime")),
        workouts: [],
      };
    }

    showInteractive("create-page");
    paintInteractive("create-page", "create", actualEdit);
    d.querySelector("#routine-name").addEventListener("keyup", (e) => {
      actualEdit["name"] = e.target.value;
    });
  }

  if (e.target.matches(btnDetails) || e.target.matches(`${btnDetails} *`)) {
    let id = findData(e.target, btnDetails, "id") || false;
    showInteractive("action-page");
    paintInteractive(
      "action-page",
      "details",
      routines.find((e) => e.id === id),
    );
  }

  if (e.target.matches(btnPreview) || e.target.matches(`${btnPreview} *`)) {
    let id = findData(e.target, btnPreview, "id") || false;
    actualRoutine = routines.find((e) => e.id === id);
    showInteractive("action-page");
    paintInteractive("action-page", "preview", actualRoutine);
  }

  if (e.target.matches(btnStart) || e.target.matches(`${btnStart} *`)) {
    let fstTime = Number(localStorage.getItem("startTime"));

    handleClock.action = (action = true) => {
      if (action) playSound(alarm);
      clearInterval(workoutWatch);
      showInteractive("action-page");
      paintInteractive("action-page", "activity", actualRoutine);
      counterWorkout = 0;
      counterRest = 0;
      startTime = Date.now();
      activityActions();
    };

    workedDays = JSON.parse(localStorage.getItem("workedDays"));
    todayWork = workedDays[dateString] ? workedDays[dateString].workSec : 0;
    todayRest = workedDays[dateString] ? workedDays[dateString].restSec : 0;

    showInteractive("action-page");
    manageRest(fstTime, actualRoutine.workouts[0], "Get ready!");
    workoutClock = setTimeout(handleClock.action, fstTime * 1000);
  }

  if (e.target.matches(btnNext) || e.target.matches(`${btnNext} *`))
    handleNext(e.target, btnNext);

  if (e.target.matches(btnSkip) || e.target.matches(`${btnSkip} *`))
    handleNext(e.target, btnSkip, true);

  if (e.target.matches(btnFinish) || e.target.matches(`${btnFinish} *`)) {
    setTimes("workout");
    hideInteractive();
    clearTimes();
    speak("Congratulations!");
  }

  if (e.target.matches(btnSkipRest) || e.target.matches(`${btnSkipRest} *`)) {
    clearTimes();
    handleClock.action(false);
  }

  if (
    e.target.matches(confirmRoutine) ||
    e.target.matches(`${confirmRoutine} *`)
  ) {
    let id = findData(e.target, confirmRoutine, "id") || false;
    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(
      ModalDelete(
        props,
        routines.find((e) => e.id === id),
        "routine",
        "Do you want to delete the routine:",
        id,
      ),
    );
  }

  if (
    e.target.matches(confirmWorkout) ||
    e.target.matches(`${confirmWorkout} *`)
  ) {
    let id = findData(e.target, confirmWorkout, "id") || false,
      position = findData(e.target, confirmWorkout, "position") || null;
    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(
      ModalDelete(
        props,
        workoutDB.find((e) => e.id === id),
        "workout",
        "Do you want to delete the workout:",
        position,
      ),
    );
  }

  if (e.target.matches(btnList) || e.target.matches(`${btnList} *`)) {
    let id = findData(e.target, btnList, "id") || false;
    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(ModalList(id, props));
    manageFilter(currentFilter[0], currentFilter[1]);
  }

  if (
    e.target.matches(btnInstruction) ||
    e.target.matches(`${btnInstruction} *`)
  ) {
    let id = findData(e.target, btnInstruction, "id") || false;
    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(
      ModalInstructions(
        props,
        workoutDB.find((e) => e.id === id),
      ),
    );
  }

  if (e.target.matches(btnUp) || e.target.matches(`${btnUp} *`))
    handleMove(e.target, btnUp);

  if (e.target.matches(btnDown) || e.target.matches(`${btnDown} *`))
    handleMove(e.target, btnDown, false);

  if (
    e.target.matches(".interaction-container") ||
    e.target.matches(interactionClose) ||
    e.target.matches(`${interactionClose} *`)
  ) {
    speechSynthesis.cancel();
    clearTimes();
    hideInteractive();
  }

  if (
    e.target.matches(".modal-container") ||
    e.target.matches(modalClose) ||
    e.target.matches(`${modalClose} *`)
  ) {
    hideModal();
  }
});

d.addEventListener("change", (e) => {
  if (e.target.matches(".filter-snd") || e.target.matches(".filter-fst"))
    manageFilter();

  if (e.target.matches("#add-series")) {
    e.target.value > 1
      ? d.querySelector(".add-series-time").classList.remove("dp-none")
      : d.querySelector(".add-series-time").classList.add("dp-none");
  }
});

w.addEventListener("hashchange", () => {
  router();
});
