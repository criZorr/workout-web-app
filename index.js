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
    list: ModalList,
  };

let props = {},
  workoutDB = [],
  routines = [],
  actualRoutine = {},
  actualEdit = {},
  currentFilter = ["all", "all"];

const $test = d.querySelector(".test");

const testData = (data) => {
  console.log("hola");
  let $fragment = d.createDocumentFragment(),
    title = d.createElement("h1"),
    section = d.createElement("section"),
    cardText = "";

  section.classList.add("test-container");

  title.innerHTML = "Test";
  $fragment.appendChild(title);

  let byCategory = data.reduce((acc, ex) => {
    acc[ex.category] = acc[ex.category] || [];
    acc[ex.category].push(ex);
    return acc;
  }, {});

  let categories = Array.from(Object.keys(byCategory));

  for (let i = 0; i < categories.length; i++) {
    let card = d.createElement("article");
    card.classList.add(
      "radio-sm",
      "bg-white",
      "shadow",
      "card-container",
      "test-card",
    );

    card.innerHTML = `
    <h2>${categories[i]}</h2>
    `;

    let group = byCategory[categories[i]];

    group.forEach((e) => {
      let p = d.createElement("p");
      p.classList.add("p-one-line");
      p.innerHTML = e.name + " - " + e.id;
      card.appendChild(p);
    });

    $fragment.appendChild(card);
  }

  // $fragment.appendChild(section);

  $test.appendChild($fragment);
};

fetch("./db/exercises.json")
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then((json) => {
    testData(json);
  })
  .catch((err) => console.log(err));

const addEditManager = (target, type, action) => {
  let id = target.dataset.id || target.closest(type).dataset.id || false,
    position =
      target.dataset.position || target.closest(type).dataset.position || false;

  let currentWork = workoutDB.find((ex) => ex.id === id),
    currentProps = actualEdit.workouts[position];

  let data = {
    workout: currentWork,
    time: currentProps ? currentProps.time : 30,
    reps: currentProps ? currentProps.reps : 0,
    series: currentProps ? currentProps.series : 1,
    sec_serie: currentProps ? currentProps.seconds_serie : 0,
    sec_end: currentProps ? currentProps.seconds_end : false,
  };

  showModal();
  $modal.innerHTML = null;
  $modal.appendChild(ModalAdd(props, data, action));
};

const manageFilter = (part = "all", equip = "all") => {
  const $fstFilter = d.querySelector(".filter-fst"),
    $sndFilter = d.querySelector(".filter-snd"),
    $containerList = d.querySelector(".workouts-list"),
    $fragment = d.createDocumentFragment();

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

  $containerList.innerHTML = null;

  if (fstValue !== "all" && sndValue === "all")
    workoutsList = workoutDB.filter((ex) => ex.category === fstValue);

  if (fstValue === "all" && sndValue !== "all")
    workoutsList = workoutDB.filter((ex) => ex.equipment === sndValue);

  if (fstValue !== "all" && sndValue !== "all") {
    let workoutsListFst = workoutDB.filter((ex) => ex.category === fstValue);
    workoutsList = workoutsListFst.filter((ex) => ex.equipment === sndValue);
  }

  currentFilter = [fstValue, sndValue];

  workoutsList.forEach((workout, i) => {
    const $option = d.createElement("section");
    if (i == 0) $option.classList.add("list-option-fst");
    if (i == workoutsList.length - 1) $option.classList.add("list-option-lst");
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
  });

  $containerList.appendChild($fragment);
};

const paintModal = (id = 0, type = false) => {
  $modal.innerHTML = null;
  $modal.appendChild(painter[type](id, props));
};

const showModal = () => {
  $modal.classList.remove("dp-none");
};

const hideModal = () => {
  $modal.classList.add("dp-none");
};

const activityActions = (count = 0) => {
  const $title = d.querySelector(".workout-title"),
    $description = d.querySelector(".workout-description"),
    $img = d.querySelector(".workout-img"),
    $countTime = d.querySelector(".dynamic"),
    $countReps = d.querySelector(".static"),
    $btnsNext = d.querySelectorAll(`[data-btn="next"]`);

  let workoutProps = actualRoutine.workouts[count],
    workoutsLength = Array.from(Object.keys(actualRoutine.workouts)).length,
    workout = workoutDB.find((e) => Number(e.id) === Number(workoutProps.id));

  if (!workoutProps.time) {
    $countTime.classList.add("dp-none");
    $countReps.classList.remove("dp-none");
  }

  if (!workoutProps.reps) {
    $countReps.classList.add("dp-none");
    $countTime.classList.remove("dp-none");
  }

  if (Number(count) < workoutsLength - 1) {
    Array.from($btnsNext).forEach(
      (btn) => (btn.dataset.count = 1 + Number(count)),
    );
  } else {
    count = 0;
    Array.from($btnsNext)[1].querySelector("p").innerHTML = "Finish";
    Array.from($btnsNext).forEach((btn) => (btn.dataset.btn = "finish"));
  }

  $img.src = `./db/gif/${workout.id}-${workout.media_id}.gif`;
  $img.alt = `${workout.name} image`;
  $title.innerHTML = toSentenceCase(workout.name);
  $description.innerHTML =
    workout.instruction_steps[props.lang].join("<br/><br/>");
};

const paintInteractive = (id = 0, clase = false, type = false, obj) => {
  const $article = d.querySelector(`.${clase}`);
  $article.innerHTML = null;
  $article.appendChild(painter[type](id, props, obj));
};

const showInteractive = (clase) => {
  $header.classList.add("dp-none", "dp-block-lg");
  $main.classList.add("dp-none", "dp-block-lg");
  $interaction.classList.remove("dp-none");
  $interaction.querySelector(`.${clase}`).classList.remove("dp-none");
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
  if (!localStorage.getItem("routines")) {
    let defaultRoutines = await getData("./db/default-routines.json");
    localStorage.setItem("routines", JSON.stringify(defaultRoutines));
  }
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");
  if (!localStorage.getItem("color")) localStorage.setItem("color", "green");
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
  if (!localStorage.getItem("maxStreak"))
    localStorage.setItem("maxStreak", "40");
  if (!localStorage.getItem("streak")) localStorage.setItem("streak", "10");
  if (!localStorage.getItem("lastDay")) localStorage.setItem("lastDay", "");
  if (!localStorage.getItem("totalTime"))
    localStorage.setItem("totalTime", "0");
  if (!localStorage.getItem("workTime")) localStorage.setItem("workTime", "0");
  if (!localStorage.getItem("workedDays"))
    localStorage.setItem("workedDays", JSON.stringify({}));

  routines = JSON.parse(localStorage.getItem("routines"));
  props.theme = localStorage.getItem("theme");
  props.color = localStorage.getItem("color");
  props.lang = localStorage.getItem("language");
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
    deleteRoutine = `[data-delete="routine"]`,
    deleteWorkout = `[data-delete="workout"]`,
    modalClose = `[data-modal="close"]`,
    interactionClose = `[data-interaction="close"]`;

  if (e.target.matches(btnCreate) || e.target.matches(`${btnCreate} *`)) {
    let id = e.target.dataset.id;
    let newId = "";
    if (!id) id = e.target.closest(btnCreate).dataset.id || false;

    if (id) {
      actualEdit = routines.find((e) => e.id === id);
    } else {
      for (let i = 1; i < routines.length + 2; i++)
        if (!routines.find((e) => e.id === i.toString())) newId = i.toString();

      actualEdit = {
        id: newId,
        imgName: "placeholder",
        times: 1,
        workouts: [],
      };
    }

    showInteractive("create-page");
    paintInteractive(id, "create-page", "create", actualEdit);
  }

  if (e.target.matches(btnDetails) || e.target.matches(`${btnDetails} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnDetails).dataset.id || false;

    showInteractive("action-page");

    const $article = d.querySelector(".action-page");
    $article.innerHTML = null;
    $article.appendChild(
      DetailsCard(
        props,
        routines.find((e) => e.id === id),
        workoutDB,
      ),
    );
  }

  if (e.target.matches(btnPreview) || e.target.matches(`${btnPreview} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnPreview).dataset.id || false;

    actualRoutine = routines.find((e) => e.id === id);
    showInteractive("action-page");

    const $article = d.querySelector(".action-page");
    $article.innerHTML = null;
    $article.appendChild(PreviewCard(props, actualRoutine, workoutDB));
  }

  if (e.target.matches(btnStart) || e.target.matches(`${btnStart} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnStart).dataset.id || false;

    showInteractive("action-page");
    paintInteractive(id, "action-page", "activity", actualRoutine);
    activityActions();
  }

  if (e.target.matches(btnFinish) || e.target.matches(`${btnFinish} *`)) {
    hideInteractive();
  }

  if (e.target.matches(btnNext) || e.target.matches(`${btnNext} *`)) {
    let numb = e.target.dataset.count;
    if (!numb) numb = e.target.closest(btnNext).dataset.count || false;
    activityActions(numb);
  }

  if (
    e.target.matches(".interaction-container") ||
    e.target.matches(interactionClose) ||
    e.target.matches(`${interactionClose} *`)
  ) {
    hideInteractive();
  }

  if (
    e.target.matches(confirmRoutine) ||
    e.target.matches(`${confirmRoutine} *`)
  ) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(confirmRoutine).dataset.id || false;
    let obj = routines.find((e) => e.id === id);

    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(
      ModalDelete(
        props,
        obj,
        "routine",
        "Do you want to delete the routine:",
        id,
      ),
    );
  }

  if (e.target.matches(btnList) || e.target.matches(`${btnList} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnList).dataset.id || false;

    showModal();
    paintModal(id, "list");
    manageFilter(currentFilter[0], currentFilter[1]);
  }

  if (e.target.matches(btnAdd) || e.target.matches(`${btnAdd} *`)) {
    addEditManager(e.target, btnAdd, true);
  }

  if (e.target.matches(btnEdit) || e.target.matches(`${btnEdit} *`)) {
    addEditManager(e.target, btnEdit, false);
  }

  if (
    e.target.matches(btnInstruction) ||
    e.target.matches(`${btnInstruction} *`)
  ) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnInstruction).dataset.id || false;

    let workout = workoutDB.find((e) => e.id === id);

    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(ModalInstructions(props, workout));
  }

  if (
    e.target.matches(".modal-container") ||
    e.target.matches(modalClose) ||
    e.target.matches(`${modalClose} *`)
  ) {
    hideModal();
  }

  if (e.target.matches(saveWorkout) || e.target.matches(`${saveWorkout} *`)) {
    console.log("save workout");
  }

  if (e.target.matches(saveRoutine) || e.target.matches(`${saveRoutine} *`)) {
    console.log("save routine");
  }

  if (
    e.target.matches(deleteRoutine) ||
    e.target.matches(`${deleteRoutine} *`)
  ) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(deleteRoutine).dataset.id || false;

    console.log("delete routine");
    console.log(routines.find((e) => e.id === id));
  }

  if (
    e.target.matches(deleteWorkout) ||
    e.target.matches(`${deleteWorkout} *`)
  ) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(deleteWorkout).dataset.id || false;

    console.log("delete workout");
    console.log(actualEdit.workouts[Number(id)]);
  }

  if (
    e.target.matches(confirmWorkout) ||
    e.target.matches(`${confirmWorkout} *`)
  ) {
    let id = e.target.dataset.id,
      position = e.target.dataset.position;

    if (!id) id = e.target.closest(confirmWorkout).dataset.id || false;
    if (!position)
      position = e.target.closest(confirmWorkout).dataset.position || null;
    let obj = workoutDB.find((e) => e.id === id);

    showModal();
    $modal.innerHTML = null;
    $modal.appendChild(
      ModalDelete(
        props,
        obj,
        "workout",
        "Do you want to delete the workout:",
        position,
      ),
    );
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
