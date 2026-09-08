export default function CreatePage(id, props, routine) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $createSection = d.createElement("div"),
    $createList = d.createElement("section"),
    $previewSection = d.createElement("section"),
    $previewCard = d.createElement("section"),
    $previewList = d.createElement("article"),
    $buttonsSection = d.createElement("section"),
    { color, lang } = props;

  let workoutsLength = routine.workouts.length;

  $createSection.classList.add("create-section");
  $createSection.innerHTML += `
    <input class="card-container radio-sm shadow-${color} txt-s4 txt-regular txt-dark" type="text" name="" id="" placeholder="Insert name" value="${routine.name ? routine.name : ""}"/>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn">
        <p class="txt-s4 txt-regular txt-dark">Add image</p>
        <div class="btn-no-fill">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="auto">
              <path class="fill-${color}" d="M10.4 0H5.6V5.59688H0V10.4031H5.6V16H10.4V10.4031H16V5.59688H10.4V0Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn">
        <p class="txt-s4 txt-regular txt-dark">Add workout</p>
        <div class="btn-no-fill" data-id=${id} data-btn="list">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="auto">
              <path class="fill-${color}" d="M10.4 0H5.6V5.59688H0V10.4031H5.6V16H10.4V10.4031H16V5.59688H10.4V0Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
    <input class="card-container radio-sm shadow-${color} txt-s4 txt-regular txt-dark" type="number" min="0" name="" id="" placeholder="Times" value="${routine.seconds_general ? routine.seconds_general : ""}"/>
  `;
  $createList.classList.add("card-container", "radio-sm", `shadow-${color}`);

  //Preview section
  $previewSection.classList.add("radio-sm", `shadow-${color}`);
  $previewSection.innerHTML = `<img class="banner-img" src="./assets/img/${routine.imgName || "placeholder"}.jpg" alt="${routine.name} image" />`;

  $previewCard.classList.add("card-container");
  $previewList.classList.add("preview-info");
  $previewList.innerHTML = `<p class="txt-s4 txt-s3-sm txt-semibold p-one-line txt-dark">${routine.name || "Wourkout name"}</p>`;

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("section"),
      $workName = d.createElement("p"),
      $workDescription = d.createElement("p"),
      workout = routine.workouts[i],
      time = workout.time || 0,
      timeSlug = "";

    if (time) {
      let hor = Math.floor(time / 3600),
        min = Math.floor((time - hor * 3600) / 60),
        sec = Math.floor(time - min * 60),
        horText = "",
        minText = "",
        secText = "";

      if (hor) horText = hor > 1 ? `${hor} hours` : `${hor} hour`;
      if (min) minText = min > 1 ? `${min} minutes` : `${min} minute`;
      if (sec) secText = sec > 1 ? `${sec} seconds` : `${sec} second`;

      timeSlug = [horText, minText, secText].filter(Boolean).join(" - ");
    }

    $option.classList.add("list-btn", "list-option");

    if (i === 0) $option.classList.add("list-option-fst");
    if (i === workoutsLength - 1) $option.classList.add("list-option-lst");

    $option.innerHTML = `
      <p class="txt-s5 txt-s4-sm txt-regular p-one-line txt-dark">${workout.id}</p>
      <section class="btn-icons-container">
        <div class="btn-xs-icon bg-${color} btn-icon-sm" data-id="${workout.id}" data-btn="add" data-position=${i}>
          <div class="icon-svg">
            <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-light" d="M9.75 0L12.1875 2.40144L10.3293 4.23294L7.89181 1.8315L9.75 0ZM0 9.59616V11.9976H2.4375L9.18044 5.36402L6.74294 2.96258L0 9.59616ZM0 14.399H13V16H0V14.399Z"/>
            </svg>
          </div>
        </div>
        <div class="btn-xs-icon bg-${color} btn-icon-sm">
          <div class="icon-svg">
            <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-light" d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"/>
            </svg>
          </div>
        </div>
      </section>
    `;

    $workName.classList.add(
      "txt-s5",
      "txt-s4-sm",
      "txt-semibold",
      "p-one-line",
      "txt-dark",
    );
    $workDescription.classList.add(
      "txt-s5",
      "txt-s4-sm",
      "txt-regular",
      "p-one-line",
      "txt-dark",
    );

    $workName.innerHTML = workout.id;
    $workDescription.innerHTML = `${workout.series} series of ${workout.reps ? `${workout.reps} repetitions` : timeSlug} `;

    $createList.appendChild($option);
    $previewList.appendChild($workName);
    $previewList.appendChild($workDescription);
  }

  //Buttons Section
  $buttonsSection.classList.add("btns-container");
  $buttonsSection.innerHTML = `
    <div class="btn border-${color}">
      <p class="txt-s4 txt-bold p-one-line txt-dark">Cancel</p>
    </div>
    <div class="btn border-${color} btn-fill bg-${color}">
      <p class="txt-s4 txt-bold txt-white p-one-line">Save</p>
    </div>
  `;

  $createSection.appendChild($createList);

  $previewCard.appendChild($previewList);
  $previewSection.appendChild($previewCard);

  $fragment.appendChild($createSection);
  $fragment.appendChild($previewSection);
  $fragment.appendChild($buttonsSection);

  return $fragment;
}
