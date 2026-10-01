import Texts from "../db/texts.js";

export default function SettingsPage(props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    { theme, color, lang, voice, voices } = props,
    cardContents = [
      `<article class="settings-opts">
        <section class="radio-container">
          <label for="light" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100 txt-item"></label>
          <input type="radio" name="background" id="light" class="radio-html bg-selector"/>
          <div class="custom-radio border-${color}">
            <div class="border-${color}-light"></div>
          </div>
        </section>
        <section class="radio-container">
          <label for="auto" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100 txt-item"></label>
          <input type="radio" name="background" id="auto" class="radio-html bg-selector"/>
          <div class="custom-radio border-${color}">
            <div class="border-${color}-light"></div>
          </div>
        </section>
        <section class="radio-container">
          <label for="dark" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100 txt-item"></label>
          <input type="radio" name="background" id="dark" class="radio-html bg-selector"/>
          <div class="custom-radio border-${color}">
            <div class="border-${color}-light"></div>
          </div>
        </section>
      </article>`,
      `<section class="card-container-sm radio-sm-sm shadow-${color}-sm">
        <section class="list-btn custom-select">
          <select class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line color-selector">
            <option value="green" class="txt-item"></option>
            <option value="red" class="txt-item"></option>
          </select>
          <div class="btn-no-fill">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-${color}" d="M3 7H13V9H3V7ZM0 3H16V5H0V3ZM6 11H10V13H6V11Z"/>
              </svg>
            </div>
          </div>
        </section>
      </section>`,
      `<section class="card-container-sm radio-sm-sm shadow-${color}-sm">
        <section class="list-btn custom-select">
          <select class="txt-s5 txt-s4-sm txt-regular txt-dark lang-selector">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <div class="btn-no-fill">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-${color}" d="M3 7H13V9H3V7ZM0 3H16V5H0V3ZM6 11H10V13H6V11Z"/>
              </svg>
            </div>
          </div>
        </section>
      </section>`,
      `<section class="card-container-sm radio-sm-sm shadow-${color}-sm">
        <section class="list-btn custom-select">
          <select class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line voice-selector"></select>
          <div class="btn-no-fill">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-${color}" d="M3 7H13V9H3V7ZM0 3H16V5H0V3ZM6 11H10V13H6V11Z"/>
              </svg>
            </div>
          </div>
        </section>
      </section>`,
      `<section class="btns-container">
        <div class="btn border-${color}">
          <p class="txt-s5 txt-s4-sm txt-bold txt-dark p-one-line dp-none dp-block-sm txt-item"></p>
          <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-dark-bg" d="M8.00003 12.8L11.1111 8.8H8.7778V0H7.22225V8.8H4.88892L8.00003 12.8Z"/>
            <path class="fill-dark-bg" d="M13.4444 5.59998H10.3333V7.19998H13.4444V14.4H2.55556V7.19998H5.66667V5.59998H2.55556C1.69767 5.59998 1 6.31758 1 7.19998V14.4C1 15.2824 1.69767 16 2.55556 16H13.4444C14.3023 16 15 15.2824 15 14.4V7.19998C15 6.31758 14.3023 5.59998 13.4444 5.59998Z"/>
          </svg>
        </div>
        <div class="btn border-${color} bg-${color}">
          <p class="txt-s5 txt-s4-sm txt-bold txt-white p-one-line dp-none dp-block-sm txt-item"></p>
          <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-light" d="M7.22225 11.2H8.7778V4H11.1111L8.00003 0L4.88892 4H7.22225V11.2Z"/>
            <path class="fill-light" d="M2.55556 16H13.4444C14.3023 16 15 15.2824 15 14.4V7.19998C15 6.31758 14.3023 5.59998 13.4444 5.59998H10.3333V7.19998H13.4444V14.4H2.55556V7.19998H5.66667V5.59998H2.55556C1.69767 5.59998 1 6.31758 1 7.19998V14.4C1 15.2824 1.69767 16 2.55556 16Z"/>
          </svg>
        </div>
      </section>`,
    ];

  // <option value="de">Deustch</option>
  // <option value="en">English</option>
  // <option value="es">Español</option>
  // <option value="pt">Português</option>
  // <option value="ru">Русский</option>

  let txt = Texts("settings"),
    sortedVoices = voices.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      return 0;
    });

  const loadUser = () => {
    $fragment.querySelector(`option[value="${lang}"]`).selected = "selected";
    $fragment.querySelector(`option[value="${color}"]`).selected = "selected";
    $fragment.querySelector(`input[id="${theme}"]`).checked = true;
    if (voices.length !== 0)
      $fragment.querySelector(`option[value="${voice}"]`).selected = "selected";
  };

  for (let i = 0; i < cardContents.length; i++) {
    const $card = d.createElement("section");
    $card.classList.add(
      "card-container",
      "card-setting",
      "radio-sm",
      `shadow-${color}`,
    );
    $card.innerHTML = `<p class="txt-semibold txt-s4 txt-s3-sm txt-dark p-one-line txt-item"></p>${cardContents[i]}`;
    $fragment.appendChild($card);
  }

  Array.from($fragment.querySelectorAll(".txt-item")).forEach(
    (e, i) => (e.innerHTML = txt[lang][i]),
  );

  sortedVoices.forEach((e) => {
    let $option = d.createElement("option"),
      $select = $fragment.querySelector(".voice-selector");
    $option.value = e.name;
    $option.innerHTML = e.name;
    $select.appendChild($option);
  });

  loadUser();
  return $fragment;
}
