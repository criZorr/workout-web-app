export default function ModalList(id, props) {
  const d = document,
    $fragment = d.createDocumentFragment(),
    $content = d.createElement("article"),
    { color, lang } = props;

  $content.classList.add(
    "modal",
    "bg-white",
    "radio-sm-sm",
    `shadow-${color}-sm`,
    "modal-list",
  );

  $content.innerHTML = `
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">Search</p>
    <section class="card-container radio-sm shadow-${color}">
      <input class="list-search txt-s5 txt-s4-sm txt-regular txt-dark" type="search" placeholder="Search">
    </section>
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">Body parts</p>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn custom-select">
        <select class="txt-s5 txt-s4-sm txt-regular txt-dark filter-fst">
          <option value="all" selected>All</option>
          <option value="back">Back</option>
          <option value="cardio">Cardio</option>
          <option value="chest">Chest</option>
          <option value="lower arms">Lower-arms</option>
          <option value="lower legs">Lower-legs</option>
          <option value="neck">Neck</option>
          <option value="shoulders">Shoulders</option>
          <option value="upper arms">Upper arms</option>
          <option value="upper legs">Upper legs</option>
          <option value="waist">Waist</option>
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
    <p class="txt-s5 txt-s4-sm txt-semibold p-one-line txt-dark">Equipment</p>
    <section class="card-container radio-sm shadow-${color}">
      <section class="list-btn custom-select">
        <select class="txt-s5 txt-s4-sm txt-regular txt-dark  filter-snd">
          <option value="all" selected>All</option>
          <option value="assisted">Assisted</option>
          <option value="band">Band</option>
          <option value="barbell">Barbell</option>
          <option value="body weight">Body weight</option>
          <option value="bosu ball">Bosu ball</option>
          <option value="cable">Cable</option>
          <option value="dumbbell">Dumbbell</option>
          <option value="elliptical machine">Elliptical machine</option>
          <option value="ez barbell">Ez barbell</option>
          <option value="hammer">Hammer</option>
          <option value="kettlebell">Kettlebell</option>
          <option value="leverage machine">Leverage machine</option>
          <option value="medicine ball">Medicine ball</option>
          <option value="olympic barbell">Olympic barbell</option>
          <option value="resistance band">Resistance band</option>
          <option value="roller">Roller</option>
          <option value="rope">Rope</option>
          <option value="skierg machine">Skierg machine</option>
          <option value="sled machine">Sled machine</option>
          <option value="smith machine">Smith machine</option>
          <option value="stability ball">Stability ball</option>
          <option value="stationary bike">Stationary bike</option>
          <option value="stepmill machine">Stepmill machine</option>
          <option value="tire">Tire</option>
          <option value="trap bar">Trap bar</option>
          <option value="upper body ergometer">Upper body ergometer</option>
          <option value="weighted">Weighted</option>
          <option value="wheel roller">Wheel roller</option>
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
        <p class="txt-s4 txt-bold p-one-line txt-dark">Cancel</p>
      </div>
    </section>
  `;

  $fragment.appendChild($content);

  return $fragment;
}
