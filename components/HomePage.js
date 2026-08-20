export function HomePage(props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $addCard = d.createElement("section"),
    routines = JSON.parse(localStorage.getItem("routines"));

  let { color, lang } = props;

  $addCard.classList.add(
    "card-container",
    "radio-sm",
    "bg-white",
    `shadow-${color}`,
  );
  $addCard.innerHTML = `
    <section class="list-btn">
      <p class="txt-s4 txt-s3-sm txt-semibold txt-dark">Create routine</p>
      <div class="btn-icon btn-icon-sm bg-${color}" data-btn="create">
        <div class="icon-svg">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="auto">
            <path class="fill-light" d="M10.4 0H5.6V5.59688H0V10.4031H5.6V16H10.4V10.4031H16V5.59688H10.4V0Z"/>
          </svg>
        </div>
      </div>
    </section>
  `;

  const sortedRoutines = routines.sort((a, b) => {
    let fst = a.name.toUpperCase(),
      snd = b.name.toUpperCase();

    if (fst < snd) return -1;
    if (fst > snd) return 1;
    return 0;
  });

  $fragment.appendChild($addCard);

  sortedRoutines.forEach((e) => {
    let $card = d.createElement("section");

    $card.classList.add(
      "radio-sm",
      "bg-white",
      `shadow-${color}`,
      "card-routine",
    );
    $card.innerHTML = `
      <figure class="banner-container">
        <div class="shadow-banner"></div>
        <img class="banner-img dp-none dp-block-sm" src="./assets/img/${e.imgName}.jpg" alt="${e.name} banner image"/>
      </figure>
      <section class="card-container">
        <section class="list-btn">
          <p class="txt-s4 txt-s3-sm txt-semibold p-one-line txt-dark">${e.name}</p>
          <div class="btn-icon bg-${color} btn-icon-sm" data-id="${e.id}">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path class="fill-light" d="M3 0V16L16 8L3 0Z" fill="white"/>
             </svg>
            </div>
          </div>
        </section>
      </section>
      <section class="card-container btn-opts-container">
        <section class="btn-options">
          <div class="btn-sm-icon bg-${color} btn-sm-icon-sm" data-id="${e.id}">
            <div class="icon-svg">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-light" d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8.8 12H7.2V7.2H8.8V12ZM8.8 5.6H7.2V4H8.8V5.6Z"/>
              </svg>
            </div>
          </div>
          <div class="btn-sm-icon bg-${color} btn-sm-icon-sm" data-id="${e.id}" data-btn="create">
            <div class="icon-svg">
              <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-light" d="M9.75 0L12.1875 2.40144L10.3293 4.23294L7.89181 1.8315L9.75 0ZM0 9.59616V11.9976H2.4375L9.18044 5.36402L6.74294 2.96258L0 9.59616ZM0 14.399H13V16H0V14.399Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div class="btn-sm-icon bg-${color}-comp btn-sm-icon-sm" data-id="${e.id}">
            <div class="icon-svg">
              <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-light" d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z" fill="white"/>
              </svg>
            </div>
          </div>
        </section>
      </section>
    `;

    $fragment.appendChild($card);
  });

  return $fragment;
}
