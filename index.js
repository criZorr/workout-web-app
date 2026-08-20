import { HomePage } from "./components/HomePage.js";
import Header from "./components/Header.js";
import getData from "./helpers/getData.js";
import CalendarPage from "./components/CalendarPage.js";
import SettingsPage from "./components/SettingsPage.js";
import CreatePage from "./components/CreatePage.js";
import PreviewCard from "./components/PreviewCard.js";

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
  };

let props = {};

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

  props.theme = localStorage.getItem("theme");
  props.color = localStorage.getItem("color");
  props.lang = localStorage.getItem("language");
};

const paintInteractive = (id = 0, clase = false, type = false) => {
  const $article = d.querySelector(`.${clase}`);

  painter[type](id, props);

  $article.innerHTML = null;
  $article.appendChild(painter[type](id, props));
};

d.addEventListener("DOMContentLoaded", async () => {
  await localData();
  paintHeader();
  router();
});

d.addEventListener("click", (e) => {
  let btnCreate = `[data-btn="create"]`,
    btnStart = `[data-btn="start"]`;

  if (e.target.matches(btnCreate) || e.target.matches(`${btnCreate} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnCreate).dataset.id || false;

    $header.classList.add("dp-none", "dp-block-lg");
    $main.classList.add("dp-none", "dp-block-lg");
    $interaction.classList.remove("dp-none");
    $interaction.querySelector(".create-page").classList.remove("dp-none");
    paintInteractive(id, "create-page", "create");
  }

  if (e.target.matches(btnStart) || e.target.matches(`${btnStart} *`)) {
    let id = e.target.dataset.id;
    if (!id) id = e.target.closest(btnStart).dataset.id || false;

    $header.classList.add("dp-none", "dp-block-lg");
    $main.classList.add("dp-none", "dp-block-lg");
    $interaction.classList.remove("dp-none");
    $interaction.querySelector(".action-page").classList.remove("dp-none");
    paintInteractive(id, "action-page", "preview");
  }

  if (e.target.matches(".interaction-container")) {
    $header.classList.remove("dp-none", "dp-block-lg");
    $main.classList.remove("dp-none", "dp-block-lg");
    $interaction.classList.add("dp-none");
    $interaction.querySelector(".create-page").classList.add("dp-none");
    $interaction.querySelector(".action-page").classList.add("dp-none");
  }
});

w.addEventListener("hashchange", () => {
  router();
});
