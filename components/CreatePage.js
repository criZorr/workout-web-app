import toSentenceCase from "../helpers/toSentenceCase.js";
import Texts from "../db/Texts.js";

export default function CreatePage(props, routine, workoutDB) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $createSection = d.createElement("div"),
    $createList = d.createElement("section"),
    $previewSection = d.createElement("section"),
    $previewCard = d.createElement("section"),
    $previewList = d.createElement("article"),
    $buttonsSection = d.createElement("section"),
    { color, lang } = props;

  let workoutsLength = routine.workouts.length,
    txt = Texts("create"),
    dyn = `${lang}Dy`;

  $createSection.classList.add("create-section");
  $createSection.innerHTML += `
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
    <input class="card-container radio-sm shadow-${color} txt-s4 txt-regular txt-dark" type="text" id="routine-name" placeholder="${txt[dyn].ph1}" value="${routine.name ? routine.name : ""}"/>
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
    <input class="card-container radio-sm shadow-${color} txt-s4 txt-regular txt-dark" type="text" id="img-link" placeholder="${txt[dyn].ph3}" value="${routine.imgName ? routine.imgName : ""}"/>
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn">
        <p class="txt-s4 txt-regular txt-dark txt-item"></p>
        <div class="btn-no-fill" data-id=${routine.id} data-btn="list">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="auto">
              <path class="fill-${color}" d="M10.4 0H5.6V5.59688H0V10.4031H5.6V16H10.4V10.4031H16V5.59688H10.4V0Z"/>
            </svg>
          </div>
        </div>
      </section>
    </section>
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
    <input class="card-container radio-sm shadow-${color} txt-s4 txt-regular txt-dark" type="number" min="0" id="routine-time" placeholder="${txt[dyn].ph2}" value="${routine.seconds_general ? routine.seconds_general : localStorage.getItem("restTime")}"/>
    <p class="txt-s5 txt-s4-sm txt-semibold txt-dark txt-item"></p>
  `;

  $createList.classList.add("card-container", "radio-sm", `shadow-${color}`);
  $createList.id = "routine-workouts";

  //Preview section
  $previewSection.classList.add("radio-sm", `shadow-${color}`);
  $previewSection.innerHTML = `<img class="banner-img" src="${routine.imgName ? routine.imgName : "./assets/img/placeholder.jpg"}" alt="${routine.name}: ${txt[dyn].alt1}" />`;

  $previewCard.classList.add("card-container");
  $previewList.classList.add("preview-info");
  $previewList.innerHTML = `<p class="txt-s4 txt-s3-sm txt-semibold p-one-line txt-dark">${routine.name || txt[dyn].txt1}</p>`;

  for (let i = 0; i < workoutsLength; i++) {
    let $option = d.createElement("section"),
      $workName = d.createElement("p"),
      $workDescription = d.createElement("p"),
      $listContainer = d.createElement("div"),
      workoutProps = routine.workouts[i],
      time = workoutProps.time || 0,
      timeSlug = "",
      workout = workoutDB.find((e) => e.id === workoutProps.id);

    if (time) {
      let hor = Math.floor(time / 3600),
        min = Math.floor((time - hor * 3600) / 60),
        sec = Math.floor(time - min * 60),
        horText = "",
        minText = "",
        secText = "";

      if (hor)
        horText =
          hor > 1 ? `${hor} ${txt[dyn].txt2}` : `${hor} ${txt[dyn].txt3}`;
      if (min)
        minText =
          min > 1 ? `${min} ${txt[dyn].txt4}` : `${min} ${txt[dyn].txt5}`;
      if (sec)
        secText =
          sec > 1 ? `${sec} ${txt[dyn].txt6}` : `${sec} ${txt[dyn].txt7}`;

      timeSlug = [horText, minText, secText].filter(Boolean).join(" - ");
    }

    $option.classList.add("list-btn", "list-option", "list-tgl");

    $option.innerHTML = `
      <p class="txt-s5 txt-s4-sm txt-regular txt-dark p-one-line w-100">${toSentenceCase(workout.name)}</p>
      <article class="list-btns-container">
      <section class="btn-icons-container">
        <div class="btn-xs-icon bg-${color} btn-icon-sm ${i === 0 ? "disable" : ""}" data-position=${i} data-btn="up">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="${color === "blackwhite" ? "fill-bow" : "fill-light"}" d="M16 10.689L8 3L2.5338e-07 10.689L2.40419 13L8 7.61991L13.5958 13L16 10.689Z"/>
            </svg>
          </div>
        </div>
        <div class="btn-xs-icon bg-${color} btn-icon-sm ${i === workoutsLength - 1 ? "disable" : ""}" data-position=${i} data-btn="down">
          <div class="icon-svg">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="${color === "blackwhite" ? "fill-bow" : "fill-light"}" d="M0 5.31104L8 13L16 5.31104L13.5958 3L8 8.38009L2.40419 3L0 5.31104Z"/>
            </svg>
          </div>
        </div>
      </section>
      <section class="btn-icons-container">
        <div class="btn-xs-icon bg-${color} btn-icon-sm" data-id="${workoutProps.id}" data-btn="edit" data-position=${i}>
          <div class="icon-svg">
            <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="${color === "blackwhite" ? "fill-bow" : "fill-light"}" d="M9.75 0L12.1875 2.40144L10.3293 4.23294L7.89181 1.8315L9.75 0ZM0 9.59616V11.9976H2.4375L9.18044 5.36402L6.74294 2.96258L0 9.59616ZM0 14.399H13V16H0V14.399Z"/>
            </svg>
          </div>
        </div>
        <div class="btn-xs-icon bg-${color}-comp btn-icon-sm" data-id="${workoutProps.id}" data-confirm="workout" data-position=${i}>
          <div class="icon-svg">
            <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-light" d="M2.33333 4H1.55556V14.4C1.55556 14.8243 1.71944 15.2313 2.01117 15.5314C2.30289 15.8314 2.69855 16 3.11111 16H10.8889C11.3014 16 11.6971 15.8314 11.9888 15.5314C12.2806 15.2313 12.4444 14.8243 12.4444 14.4V4H2.33333ZM10.5918 1.6L9.33333 0H4.66667L3.40822 1.6H0V3.2H14V1.6H10.5918Z"/>
            </svg>
          </div>
        </div>
      </section>
      </article>
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

    $workName.innerHTML = toSentenceCase(workout.name);
    $workDescription.innerHTML = `${workoutProps.series} ${workoutProps.series > 1 ? txt[dyn].txt8 : txt[dyn].txt9} ${workoutProps.reps ? `${workoutProps.reps} ${workoutProps.reps > 1 ? txt[dyn].txt10 : txt[dyn].txt11}` : timeSlug} `;

    $listContainer.classList.add("preview-item");
    $listContainer.appendChild($workName);
    $listContainer.appendChild($workDescription);
    $createList.appendChild($option);
    $previewList.appendChild($listContainer);
  }

  //Buttons Section
  $buttonsSection.classList.add("btns-container");
  $buttonsSection.innerHTML = `
    <div class="btn border-${color}" data-interaction="close">
      <p class="txt-s4 txt-bold p-one-line txt-dark dp-none dp-block-sm txt-item"></p>
      <svg class="dp-none-sm" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-dark-bg" d="M14.0002 0L7.99929 6L1.99982 0L0 2L5.99947 8L0 14L1.99982 16L7.99929 10L14.0002 16L16 14L10.0005 8L16 2L14.0002 0Z"/>
      </svg>
    </div>
    <div class="btn border-${color} btn-fill bg-${color}" data-save="routine">
      <p class="txt-s4 txt-bold ${color === "blackwhite" ? "txt-bow" : "txt-white"} p-one-line dp-none dp-block-sm txt-item"></p>
      <svg class="dp-none-sm" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-light" d="M5.22492 9.69418L1.56958 5.8448L0 7.49771L5.22492 13L16 1.65291L14.4304 0L5.22492 9.69418Z"/>
      </svg>
    </div>
  `;

  $createSection.appendChild($createList);

  $previewCard.appendChild($previewList);
  $previewSection.appendChild($previewCard);

  $fragment.appendChild($createSection);
  $fragment.appendChild($previewSection);
  $fragment.appendChild($buttonsSection);

  Array.from($fragment.querySelectorAll(".txt-item")).forEach(
    (e, i) => (e.innerHTML = txt[lang][i]),
  );

  return $fragment;
}
