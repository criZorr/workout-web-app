export default function Header(props) {
  const d = document,
    $section = d.createElement("section");

  let { color, lang } = props;

  $section.classList.add("header-container", `bg-${color}`, "shadow");
  $section.innerHTML = `
    <a class="icon-text" href="#home">
      <img class="icon icon-xs-lg" src="./assets/icons/home.svg" alt="Home"/>
      <p class="txt-bold txt-semibold-lg txt-s4 txt-s3-md txt-white dp-none dp-block-sm p-one-line">
        Home
      </p>
    </a>
    <a class="icon-text" href="#calendar">
      <img class="icon icon-xs-lg" src="./assets/icons/calendar.svg" alt="Calendar"/>
      <p class="txt-bold txt-semibold-lg txt-s4 txt-s3-md txt-white dp-none dp-block-sm p-one-line">
        Calendar
      </p>
    </a>
    <a class="icon-text" href="#settings">
      <img class="icon icon-xs-lg" src="./assets/icons/settings.svg" alt="Settings"/>
      <p class="txt-bold txt-semibold-lg txt-s4 txt-s3-md txt-white dp-none dp-block-sm p-one-line" >
        Settings
      </p>
    </a>
  `;

  return $section;
}
