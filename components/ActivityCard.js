import HeaderBack from "./HeaderBack.js";

export default function ActivityCard(id, props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("section"),
    { color, lang } = props;

  $fragment.appendChild(HeaderBack(routine.name, color));

  $content.classList.add("action-content");
  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark workout-title"></p>
    <img src="./assets/img/placeholder.jpg" alt="" class="dp-none dp-block-sm"/>
    <section class="counter static">
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey workout-reps">Number</p>
    </section>
    <section class="counter dynamic">
      <p class="txt-s5 txt-s4-sm txt-semibold txt-grey workout-time">Time</p>
      <div class="bar-animated border-${color}"></div>
    </section>
    <p class="dp-none dp-block-sm description txt-dark workout-description"></p>
    <section class="btns-container">
      <div class="btn border-${color}" data-count="0" data-btn="next">
        <p class="txt-s4 txt-bold p-one-line txt-dark">Skip</p>
      </div>
      <div class="btn border-${color} btn-fill bg-${color}" data-count="0" data-btn="next">
        <p class="txt-s4 txt-bold txt-white p-one-line">Next</p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
