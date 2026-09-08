import toSentenceCase from "../helpers/toSentenceCase.js";

export default function ModalInstructions(props, workout) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  $content.classList.add(
    "modal-card",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
    "description-card",
  );

  $content.innerHTML = `
    <img src="./assets/img/placeholder.jpg" alt="${workout.name} image"/>
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark flex-s-0">${toSentenceCase(workout.name)}</p>
    <p class="description txt-dark flex-s-0">${workout.instruction_steps[props.lang].join("<br/><br/>")}</p>
    <section class="btns-container w-100">
      <div class="btn border-${color} btn-fill bg-${color}">
        <p class="txt-s4 txt-bold txt-white p-one-line">Confirm</p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
