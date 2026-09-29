import toSentenceCase from "../helpers/toSentenceCase.js";
import HeaderBack from "./HeaderBack.js";

export default function DetailsCard(props, routine, workoutDB) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $container = d.createElement("section"),
    $content = d.createElement("section"),
    { color } = props;

  let workoutsLength = routine.workouts.length;

  $fragment.appendChild(
    HeaderBack(routine.name, color, `data-interaction="close"`),
  );

  $content.classList.add("details-content");
  $container.classList.add("details-container");

  $container.innerHTML = `<p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark dp-none dp-block-lg">${routine.name}</p>`;

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("div"),
      id = routine.workouts[i].id,
      workout = workoutDB.find((e) => e.id === id);

    $option.classList.add("action-list", "detail-list");
    $option.dataset.id = id;
    $option.dataset.btn = "instruction";
    $option.innerHTML = `
      <img class="detail-img" src="./db/img/${workout.id}-${workout.media_id}.webp" alt="${workout.name} image"/>
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey p-one-line-sm">${toSentenceCase(workout.name)}</p>
    `;
    $content.appendChild($option);
  }

  $container.appendChild($content);
  $fragment.appendChild($container);

  return $fragment;
}
