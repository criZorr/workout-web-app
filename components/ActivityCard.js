import HeaderBack from "./HeaderBack.js";
import Texts from "../db/Texts.js";

export default function ActivityCard(props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("section"),
    { color, lang } = props;

  let txt = Texts("buttons");

  $fragment.appendChild(
    HeaderBack(routine.name, color, `data-interaction="close"`),
  );

  $content.classList.add("action-content");
  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark workout-title"></p>
    <img src="./assets/img/placeholder.jpg" alt="" class="dp-none dp-block-sm workout-img"/>
    <section class="counter static">
      <p class="txt-s4 txt-s3-sm txt-bold txt-${color} workout-reps"></p>
    </section>
    <section class="counter dynamic">
      <p class="txt-s4 txt-s3-sm txt-bold txt-${color} workout-time"></p>
    </section>
    <section class="dp-none dp-block-sm description txt-dark workout-description">
      <section class="steps-container"></section>
    </section>
    <section class="btns-container">
      <div class="btn border-${color} counter-btns" data-count="0" data-btn="skip">
        <p class="txt-s4 txt-bold p-one-line txt-dark dp-none dp-block-sm">${txt[lang][2]}</p>
        <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-dark-bg" d="M0.5 0V16L12.1667 8L0.5 0ZM15.5 16V0H12.1667V16H15.5Z"/>
        </svg>
      </div>
      <div class="btn border-${color} btn-fill bg-${color} counter-btns" data-count="0" data-btn="next">
        <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line dp-none dp-block-sm">${txt[lang][3]}</p>
        <svg class="dp-none-sm" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-light" d="M5.22492 9.69418L1.56958 5.8448L0 7.49771L5.22492 13L16 1.65291L14.4304 0L5.22492 9.69418Z"/>
        </svg>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
