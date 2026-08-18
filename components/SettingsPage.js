export default function SettingsPage(props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    { theme, color, lang } = props,
    cardContents = [
      {
        title: "Background",
        content: `
          <article class="settings-opts">
            <section class="radio-container">
              <label for="light" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100">Light</label>
              <input type="radio" name="background" id="light" class="radio-html"/>
              <div class="custom-radio border-${color}">
                <div class="border-${color}-light"></div>
              </div>
            </section>
            <section class="radio-container">
              <label for="auto" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100">Auto</label>
              <input type="radio" name="background" id="auto" class="radio-html"/>
              <div class="custom-radio border-${color}">
                <div class="border-${color}-light"></div>
              </div>
            </section>
            <section class="radio-container">
              <label for="dark" class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100">Dark</label>
              <input type="radio" name="background" id="dark" class="radio-html"/>
              <div class="custom-radio border-${color}">
                <div class="border-${color}-light"></div>
              </div>
            </section>
          </article>
        `,
      },
      {
        title: "Colour",
        content: `
          <section class="card-container-sm radio-sm-sm shadow-${color}-sm">
            <section class="list-btn custom-select">
              <select class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line">
                <option value="green">Green</option>
                <option value="red">Red</option>
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
        `,
      },
      {
        title: "Language",
        content: `
          <section class="card-container-sm radio-sm-sm shadow-${color}-sm">
            <section class="list-btn custom-select">
              <select class="txt-s5 txt-s4-sm txt-regular txt-dark">
                <option value="de">Deustch</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="ru">Русский</option>
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
        `,
      },
      {
        title: "Data",
        content: `
          <section class="btns-container">
            <div class="btn border-${color}">
              <p class="txt-s5 txt-s4-sm txt-bold txt-dark p-one-line">Import</p>
            </div>
            <div class="btn border-${color} bg-${color}">
              <p class="txt-s5 txt-s4-sm txt-bold txt-white p-one-line">Export</p>
            </div>
          </section>
        `,
      },
    ];

  const loadUser = () => {
    $fragment.querySelector(`option[value="${lang}"]`).selected = "selected";
    $fragment.querySelector(`option[value="${color}"]`).selected = "selected";
    $fragment.querySelector(`input[id="${theme}"]`).checked = true;
  };

  for (let i = 0; i < cardContents.length; i++) {
    const $card = d.createElement("section");
    let content = `<p class="txt-semibold txt-s4 txt-s3-sm txt-dark p-one-line">${cardContents[i].title}</p>`;
    content += cardContents[i].content;
    $card.classList.add(
      "card-container",
      "card-setting",
      "radio-sm",
      `shadow-${color}`,
    );
    $card.innerHTML = content;
    $fragment.appendChild($card);
  }

  loadUser();
  return $fragment;
}
