import toSentenceCase from "../helpers/toSentenceCase.js";
import Texts from "../db/texts.js";

export default function ModalInstructions(props, workout) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  let txt = Texts("buttons");

  $content.classList.add(
    "modal-card",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
    "description-card",
  );

  $content.innerHTML = `
    <img src="./db/gif/${workout.id}-${workout.media_id}.gif" alt="${workout.name} image"/>
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark flex-s-0">${toSentenceCase(workout.name)}</p>
    <p class="description txt-dark flex-s-0">${workout.instruction_steps[lang].join("<br/><br/>")}</p>
    <section class="btns-container w-100">
      <div class="btn border-${color} btn-fill bg-${color}" data-modal="close">
        <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line">${txt[lang][0]}</p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
