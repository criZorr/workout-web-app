import Texts from "../db/texts.js";

export default function ModalDelete(
  props,
  obj,
  dataDelete = "",
  message = "",
  numb = "",
) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  let txt = Texts("buttons");

  $content.classList.add(
    "modal-card-res",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
  );

  $content.innerHTML = `
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark">${message} ${obj.name}?</p>
    <section class="btns-container w-100">
      <div class="btn border-${color}" data-modal="close">
        <p class="txt-s4 txt-bold p-one-line txt-dark dp-none dp-block-sm">${txt[lang][1]}</p>
        <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-dark-bg" d="M14.0002 0L7.99929 6L1.99982 0L0 2L5.99947 8L0 14L1.99982 16L7.99929 10L14.0002 16L16 14L10.0005 8L16 2L14.0002 0Z"/>
        </svg>
      </div>
      <div class="btn border-${color} btn-fill bg-${color}" data-modal="close" data-delete=${dataDelete} data-id="${numb}">
        <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line dp-none dp-block-sm">${txt[lang][0]}</p>
        <svg class="dp-none-sm" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-light" d="M5.22492 9.69418L1.56958 5.8448L0 7.49771L5.22492 13L16 1.65291L14.4304 0L5.22492 9.69418Z"/>
        </svg>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
