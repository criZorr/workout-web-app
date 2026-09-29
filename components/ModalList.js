import Texts from "../db/texts.js";
export default function ModalList(id, props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  let txt = Texts("list");

  const addOpt = (data, filterClass) => {
    let obj = [],
      sort = [];

    Object.keys(data).forEach((key, i) =>
      obj.push({ name: data[key], value: key, id: i }),
    );

    sort = obj.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      return 0;
    });

    sort.forEach((e) => {
      let $option = d.createElement("option");
      $option.value = e.value;
      $option.innerHTML = e.name;
      $fragment.querySelector(`.${filterClass}`).appendChild($option);
    });
  };

  $content.classList.add(
    "modal",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
    "modal-list",
  );

  $content.innerHTML = `
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark txt-item"></p>
    <section class="card-container radio-sm shadow-${color}">
      <input class="list-search txt-s5 txt-s4-sm txt-regular txt-dark" type="search" placeholder="${txt[lang][0]}">
    </section>
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark txt-item"></p>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn custom-select">
        <select class="txt-s5 txt-s4-sm txt-regular txt-dark filter-fst">
          <option class="txt-item" value="all" selected></option>
        </select>
        <div class="btn-no-fill">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-${color}" d="M3 7H13V9H3V7ZM0 3H16V5H0V3ZM6 11H10V13H6V11Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark txt-item"></p>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn custom-select">
        <select class="txt-s5 txt-s4-sm txt-regular txt-dark filter-snd">
          <option value="all" selected>${txt[lang][2]}</option>
        </select>
        <div class="btn-no-fill">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-${color}" d="M3 7H13V9H3V7ZM0 3H16V5H0V3ZM6 11H10V13H6V11Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
    <section class="card-container radio-sm bg-white shadow-${color} list-container workouts-list"></section>
    <section class="btns-container w-100">
      <div class="btn border-${color}" data-modal="close">
        <p class="txt-s4 txt-bold p-one-line txt-dark txt-item"></p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);
  addOpt(txt[`${lang}Dy`].body, "filter-fst");
  addOpt(txt[`${lang}Dy`].equip, "filter-snd");
  Array.from($fragment.querySelectorAll(".txt-item")).forEach(
    (e, i) => (e.innerHTML = txt[lang][i]),
  );
  return $fragment;
}
