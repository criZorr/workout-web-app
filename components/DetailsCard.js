import HeaderBack from "./HeaderBack.js";

export default function DetailsCard(id, props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $container = d.createElement("section"),
    $content = d.createElement("section"),
    { color, lang } = props;

  let workoutsLength = routine.workouts.length;

  $fragment.appendChild(
    HeaderBack(routine.name, color, `data-interaction="close"`),
  );

  $content.classList.add("details-content");
  $container.classList.add("details-container");

  $container.innerHTML = `<p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark dp-none dp-block-lg">${routine.name}</p>`;

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("div"),
      workout = routine.workouts[i];

    $option.classList.add("action-list", "detail-list");
    $option.dataset.id = workout.id;
    $option.dataset.btn = "instruction";
    $option.innerHTML = `
      <img class="detail-img" src="./assets/img/placeholder.jpg" alt="${workout.id} image"/>
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey p-one-line">${workout.id}</p>
    `;
    $content.appendChild($option);
  }

  $container.appendChild($content);
  $fragment.appendChild($container);

  return $fragment;
}
