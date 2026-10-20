import toSentenceCase from "../helpers/toSentenceCase.js";
import HeaderBack from "./HeaderBack.js";
import Texts from "../db/Texts.js";

export default function PreviewCard(props, routine, workoutDB) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("section"),
    { color, lang } = props;

  let workoutsLength = routine.workouts.length,
    txt = Texts("preview");

  $fragment.appendChild(
    HeaderBack(routine.name, color, `data-interaction="close"`),
  );

  $content.classList.add("action-content");
  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark">${routine.name}</p>
    <img src="${routine.imgName ? routine.imgName : "./assets/img/placeholder.jpg"}" alt="${routine.name} image" class="dp-none dp-block-sm"/>
    <section class="action-list-container"></section>
    <section class="btns-container btns-end-sm-md hidden-deg-sm-md">
      <div class="btn border-${color} btn-fill bg-${color}" data-btn="start">
        <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line">${txt[lang].btn}</p>
      </div>
    </section>
  `;

  let $list = $content.querySelector(".action-list-container");

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("div"),
      workoutProps = routine.workouts[i],
      workout = workoutDB.find((e) => e.id === workoutProps.id);

    $option.classList.add("action-list", "list-btn");
    $option.innerHTML = `
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey p-one-line-sm">${toSentenceCase(workout.name)}</p>
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey">${workoutProps.series ? `${workoutProps.series} x ` : ""}${workoutProps.reps ? `${workoutProps.reps} ${workoutProps.reps > 1 ? txt[lang].txt1 : txt[lang].txt2}` : `${workoutProps.time} ${workoutProps.time > 1 ? txt[lang].txt3 : txt[lang].txt4}`}</p>
    `;
    $list.appendChild($option);
  }

  $fragment.appendChild($content);

  return $fragment;
}
