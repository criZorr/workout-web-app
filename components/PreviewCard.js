import HeaderBack from "./HeaderBack.js";

export default function PreviewCard(id, props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("section"),
    { color, lang } = props;

  let workoutsLength = routine.workouts.length;

  $fragment.appendChild(HeaderBack(routine.name, color));

  $content.classList.add("action-content");
  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark">${routine.name}</p>
    <img src="./assets/img/${routine.imgName}.jpg" alt="${routine.name} image" class="dp-none dp-block-sm"/>
    <section class="action-list-container"></section>
    <section class="btns-container btns-end-sm-md hidden-deg-sm-md">
      <div class="btn border-${color} btn-fill bg-${color}" data-id="${id}" data-btn="start">
        <p class="txt-s4 txt-bold txt-white p-one-line">Start</p>
      </div>
    </section>
  `;

  let $list = $content.querySelector(".action-list-container");

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("div"),
      workout = routine.workouts[i];

    $option.classList.add("action-list", "list-btn");
    $option.innerHTML = `
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey p-one-line">${workout.id}</p>
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey">${workout.series ? `${workout.series} x ` : ""}${workout.reps ? `${workout.reps} reps` : `${workout.time} secs`}</p>
    `;
    $list.appendChild($option);
  }

  $fragment.appendChild($content);

  return $fragment;
}
