import Texts from "../db/texts.js";

export default function Header(props) {
  const d = document,
    $section = d.createElement("section");

  let { color, lang } = props,
    txt = Texts("header");

  $section.classList.add("header-container", `bg-${color}`, "shadow");
  $section.innerHTML = `
    <a class="icon-text" href="#home">
      <img class="icon" src="./assets/icons/home.svg" alt="Home"/>
      <p class="txt-semibold txt-s6 txt-s4-md txt-white dp-none dp-block-sm p-one-line w-100">Home</p>
    </a>
    <a class="icon-text" href="#calendar">
      <img class="icon" src="./assets/icons/calendar.svg" alt="Calendar"/>
      <p class="txt-semibold txt-s6 txt-s4-md txt-white dp-none dp-block-sm p-one-line w-100">Calendar</p>
    </a>
    <a class="icon-text" href="#settings">
      <img class="icon" src="./assets/icons/settings.svg" alt="Settings"/>
      <p class="txt-semibold txt-s6 txt-s4-md txt-white dp-none dp-block-sm p-one-line w-100" >Settings</p>
    </a>
  `;

  Array.from($section.querySelectorAll("p")).forEach(
    (e, i) => (e.innerHTML = txt[lang][i]),
  );

  return $section;
}
