export default function Texts(section) {
  if (section === "header") {
    return {
      en: ["Home", "Calendar", "Settings"],
      es: ["Inicio", "Calendario", "Ajustes"],
    };
  }
  if (section === "home") {
    return {
      en: ["Create routine", "Banner image"],
      es: ["Crear rutina", "Imagen ilustrativa"],
    };
  }
  if (section === "calendar") {
    return {
      en: [
        "Calendar",
        "Times",
        "Total time",
        "Workout time",
        "Streak",
        "Current streak",
        "Max streak",
        "Statistics",
        "Last 7 days",
        "Last 30 days",
      ],
      enDy: { slug1: "Today", slug2: "Yesterday" },
      es: [
        "Calendario",
        "Tiempos",
        "Tiempo total",
        "Tiempo de ejercicio",
        "Racha",
        "Racha actual",
        "Racha máxima",
        "Estadísticas",
        "Últimos 7 días",
        "Últimos 30 días",
      ],
      esDy: { slug1: "Hoy", slug2: "Ayer" },
    };
  }
  if (section === "settings") {
    return {
      en: [
        "Background",
        "Light",
        "Auto",
        "Dark",
        "Colour",
        "Green",
        "Red",
        "Language",
        "Data",
        "Import",
        "Export",
      ],
      es: [
        "Fondo",
        "Claro",
        "Auto",
        "Oscuro",
        "Color",
        "Verde",
        "Rojo",
        "Idioma",
        "Datos",
        "Importar",
        "Exportar",
      ],
    };
  }
}
