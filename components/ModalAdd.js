import Texts from "../db/texts.js";
import toSentenceCase from "../helpers/toSentenceCase.js";

export default function ModalAdd(props, data, action, position) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  let { workout, time, reps, series, sec_serie, sec_end } = data,
    txt = Texts("add");

  $content.classList.add(
    "modal-card",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
  );

  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark flex-s-0">${toSentenceCase(workout.name)}</p>
    <img src="./db/gif/${workout.id}-${workout.media_id}.gif" alt="${workout.name} image" class="dp-none dp-block-sm"/>
    <p class="dp-none dp-block-sm description txt-dark">${workout.instruction_steps[lang].join("<br/>")}</p>
    <section class="option-bar radio-sm shadow-${color} w-100">
      <input type="radio" name="tabs" id="tab-1"/>
      <label for="tab-1" class="option-bar-item">
        <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark txt-item"></p>
      </label>
      <input type="radio" name="tabs" id="tab-2"/>
      <label for="tab-2" class="option-bar-item">
        <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark txt-item"></p>
      </label>
      <div class="underline border-${color}"></div>
    </section>
    <input
      class="card-container radio-sm shadow-${color} txt-s5 txt-s4-sm txt-regular txt-dark"
      type="number"
      min="0"
      id="add-time"
      value="${time || reps}"
    />
    <section class="extra-options">
      <div class="input-container w-100">
        <input
          class="card-container radio-sm shadow-${color} txt-s5 txt-s4-sm txt-regular txt-dark"
          type="number"
          min="0"
          id="add-series"
          value="${series}"
        />
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
      </div>
      <div class="add-series-time input-container w-100 ${series <= 1 ? "dp-none" : ""}">
        <input
          class="card-container radio-sm shadow-${color} txt-s5 txt-s4-sm txt-regular txt-dark"
          type="number"
          min="0"
          id="add-sec-series"
          value="${sec_serie}"
        />
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
      </div>
      <div class="input-container w-100">
        <input
          class="card-container radio-sm shadow-${color} txt-s5 txt-s4-sm txt-regular txt-dark"
          type="number"
          min="0"
          id="add-sec-end"
          placeholder="0"
          ${sec_end ? `value=${sec_end}` : ""}
        />
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
      </div>
    </section>
    <section class="btns-container w-100">
      <div class="btn border-${color}" ${action ? `data-btn="list"` : `data-modal="close"`}>
        <p class="txt-s4 txt-bold p-one-line txt-dark dp-none dp-block-sm txt-item"></p>
        <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-dark-bg" d="M14.0002 0L7.99929 6L1.99982 0L0 2L5.99947 8L0 14L1.99982 16L7.99929 10L14.0002 16L16 14L10.0005 8L16 2L14.0002 0Z"/>
        </svg>
      </div>
      <div class="btn border-${color} btn-fill bg-${color}" ${action ? `data-btn="list"` : `data-modal="close" data-position="${position}"`} data-save="workout" data-id=${workout.id}>
        <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line dp-none dp-block-sm txt-item"></p>
        <svg class="dp-none-sm" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-light" d="M5.22492 9.69418L1.56958 5.8448L0 7.49771L5.22492 13L16 1.65291L14.4304 0L5.22492 9.69418Z"/>
        </svg>
      </div>
    </section>
  `;

  time
    ? ($content.querySelector("#tab-1").checked = true)
    : ($content.querySelector("#tab-2").checked = true);

  $fragment.appendChild($content);
  Array.from($fragment.querySelectorAll(".txt-item")).forEach(
    (e, i) => (e.innerHTML = txt[lang][i]),
  );
  return $fragment;
}
