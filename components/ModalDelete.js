export default function ModalDelete(id, props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props,
    routines = JSON.parse(localStorage.getItem("routines"));

  let routine = routines.find((e) => e.id === id);

  $content.classList.add(
    "modal-card-res",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
  );

  $content.innerHTML = `
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark">Do you want to delete the routine: ${routine.name}</p>
    <section class="btns-container w-100">
      <div class="btn border-${color}" data-btn="cancel">
        <p class="txt-s4 txt-bold p-one-line txt-dark">Cancel</p>
      </div>
      <div class="btn border-${color} btn-fill bg-${color}" data-btn="confirm">
        <p class="txt-s4 txt-bold txt-white p-one-line">Confirm</p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
