import { HomePage } from "./components/HomePage.js";
import getData from "./helpers/getData.js";

const d = document,
  w = window,
  $main = d.querySelector(".main");

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

const homeContent = () => {
  const $mainPage = d.querySelector(".main-page");
  $mainPage.innerHTML = null;
  $mainPage.appendChild(HomePage());
};

const paintMain = (namePage) => {
  Array.from($main.children).forEach((el) => {
    el.matches(`.${namePage}-page`)
      ? el.classList.remove("dp-none")
      : el.classList.add("dp-none");
  });
};

const router = () => {
  let hash = w.location.hash.replaceAll("#", "");
  if (!hash || hash === "home") hash = "main";
  paintMain(hash);
  if (hash === "main") homeContent();
};

const localData = async () => {
  if (!localStorage.getItem("routines")) {
    let defaultRoutines = await getData("./db/default-routines.json");
    localStorage.setItem("routines", JSON.stringify(defaultRoutines));
  }
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");
  if (!localStorage.getItem("color")) localStorage.setItem("color", "green");
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
};

d.addEventListener("DOMContentLoaded", async (e) => {
  await localData();
  router();
});

d.addEventListener("click", (e) => {});

w.addEventListener("hashchange", (e) => {
  router();
});
