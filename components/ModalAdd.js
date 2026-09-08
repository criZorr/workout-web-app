import toSentenceCase from "../helpers/toSentenceCase.js";

export default function ModalAdd(id, props, data) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props,
    routines = JSON.parse(localStorage.getItem("routines"));

  let { workout, time, reps, series, sec_serie, sec_end } = data;

  $content.classList.add(
    "modal-card",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
  );

  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark">${toSentenceCase(workout.name)}</p>
    <img src="./assets/img/placeholder.jpg" alt="${workout.name} image" class="dp-none dp-block-sm"/>
    <p class="dp-none dp-block-sm description txt-dark">${workout.instructions[props.lang]}</p>
    <section class="option-bar radio-sm shadow-${color} w-100">
      <input type="radio" name="tabs" id="tab-1"/>
      <label for="tab-1" class="option-bar-item">
        <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">Time</p>
      </label>
      <input type="radio" name="tabs" id="tab-2"/>
      <label for="tab-2" class="option-bar-item">
        <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">Reps</p>
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
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark">Series</p>
      </div>
      <div class="add-series-time input-container w-100 ${series <= 1 ? "dp-none" : ""}">
        <input
          class="card-container radio-sm shadow-${color} txt-s5 txt-s4-sm txt-regular txt-dark"
          type="number"
          min="0"
          id="add-sec-series"
          value="${sec_serie}"
        />
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark">Rest time between series</p>
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
        <p class="txt-s5 txt-s4-sm txt-semibold txt-dark">Extra rest time before next exercise</p>
      </div>
    </section>
    <section class="btns-container w-100">
      <div class="btn border-${color}">
        <p class="txt-s4 txt-bold p-one-line txt-dark">Cancel</p>
      </div>
      <div class="btn border-${color} btn-fill bg-${color}">
        <p class="txt-s4 txt-bold txt-white p-one-line">Save</p>
      </div>
    </section>
  `;

  time
    ? ($content.querySelector("#tab-1").checked = true)
    : ($content.querySelector("#tab-2").checked = true);

  $fragment.appendChild($content);

  return $fragment;
}
