export default function HeaderBack(
  text,
  color,
  dataTypeBtn = "",
  queryOff = "lg",
) {
  const d = document,
    $section = d.createElement("section");

  $section.classList.add(
    "header-back",
    `border-${color}`,
    "bg-white",
    `dp-none-${queryOff}`,
  );

  $section.innerHTML = `
    <div class="btn-no-fill" ${dataTypeBtn}>
      <div class="icon-svg">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-${color}" d="M10.689 0L3 8L10.689 16L13 13.5958L7.61991 8L13 2.40419L10.689 0Z"/>
        </svg>
      </div>
    </div>
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">${text}</p>
  `;

  return $section;
}
