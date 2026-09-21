import HeaderBack from "./HeaderBack.js";

export default function RestCard(props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("section"),
    { color, lang } = props;

  $fragment.appendChild(
    HeaderBack(routine.name, color, `data-interaction="close"`),
  );

  $content.classList.add("action-content");

  $content.innerHTML = `
    <p class="txt-s4 txt-s3-sm txt-bold p-one-line w-100 txt-dark flex-s-0">Rest time</p>
    <p class="txt-s5 txt-s4-sm txt-bold txt-${color} dynamic-number"></p>
    <section class="btns-container">
      <div class="btn border-${color}" data-btn="rest">
        <p class="txt-s4 txt-bold p-one-line txt-dark dp-none dp-block-sm">Skip</p>
        <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-dark-bg" d="M0.5 0V16L12.1667 8L0.5 0ZM15.5 16V0H12.1667V16H15.5Z"/>
        </svg>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
