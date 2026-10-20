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
        "Pink",
        "Purple",
        "B/W",
        "Language",
        "Voice",
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
        "Rosa",
        "Morado",
        "B/N",
        "Idioma",
        "Voz",
        "Datos",
        "Importar",
        "Exportar",
      ],
    };
  }
  if (section === "create") {
    return {
      en: [
        "Name",
        "Custom Image",
        "Add exercises",
        "Add exercise",
        "Seconds between each exercise",
        "Workouts list",
        "Cancel",
        "Save",
      ],
      enDy: {
        ph1: "Insert name",
        ph2: "Seconds",
        ph3: "Image Direct Link (https://i.ibb.co/AbC1DeF2/ejemplo.jpg)",
        alt1: "Banner image",
        txt1: "Routine name",
        txt2: "hours",
        txt3: "hour",
        txt4: "minutes",
        txt5: "minute",
        txt6: "seconds",
        txt7: "second",
        txt8: "sets of",
        txt9: "set of",
        txt10: "repetitions",
        txt11: "repetition",
      },
      es: [
        "Nombre",
        "Imagen personalizada",
        "Añadir ejercicios",
        "Añadir ejercicio",
        "Segundos entre ejercicios",
        "Lista de ejercicios",
        "Cancelar",
        "Guardar",
      ],
      esDy: {
        ph1: "Inserta el nombre",
        ph2: "Segundos",
        ph3: "Link directo de imagen (https://i.ibb.co/AbC1DeF2/ejemplo.jpg)",
        alt1: "Imagen ilustrativa",
        txt1: "Nombre de la rutina",
        txt2: "horas",
        txt3: "hora",
        txt4: "minutos",
        txt5: "minuto",
        txt6: "segundos",
        txt7: "segundo",
        txt8: "series de",
        txt9: "serie de",
        txt10: "repeticiones",
        txt11: "repetición",
      },
    };
  }
  if (section === "list") {
    return {
      en: ["Search", "Body parts", "All", "Equipment", "Cancel"],
      enDy: {
        body: {
          back: "Back",
          cardio: "Cardio",
          chest: "Chest",
          "lower arms": "Lower-arms",
          "lower legs": "Lower-legs",
          neck: "Neck",
          shoulders: "Shoulders",
          "upper arms": "Upper arms",
          "upper legs": "Upper legs",
          waist: "Waist",
        },
        equip: {
          assisted: "Assisted",
          band: "Band",
          barbell: "Barbell",
          "body weight": "Body weight",
          "bosu ball": "Bosu ball",
          cable: "Cable",
          dumbbell: "Dumbbell",
          "elliptical machine": "Elliptical machine",
          "ez barbell": "Ez barbell",
          hammer: "Hammer",
          kettlebell: "Kettlebell",
          "leverage machine": "Leverage machine",
          "medicine ball": "Medicine ball",
          "olympic barbell": "Olympic barbell",
          "resistance band": "Resistance band",
          roller: "Roller",
          rope: "Rope",
          "skierg machine": "Skierg machine",
          "sled machine": "Sled machine",
          "smith machine": "Smith machine",
          "stability ball": "Stability ball",
          "stationary bike": "Stationary bike",
          "stepmill machine": "Stepmill machine",
          tire: "Tire",
          "trap bar": "Trap bar",
          "upper body ergometer": "Upper body ergometer",
          weighted: "Weighted",
          "wheel roller": "Wheel roller",
        },
      },
      es: ["Busqueda", "Partes del cuerpo", "Todo", "Equipamento", "Cancelar"],
      esDy: {
        body: {
          back: "Espalda",
          cardio: "Cardio",
          chest: "Pecho",
          "lower arms": "Antebrazos",
          "lower legs": "Piernas inferior",
          neck: "Cuello",
          shoulders: "Hombro",
          "upper arms": "Brazos",
          "upper legs": "Piernas superior",
          waist: "Abdomen",
        },
        equip: {
          assisted: "Asistido",
          band: "Banda",
          barbell: "Barra",
          "body weight": "Peso corporal",
          "bosu ball": "BOSU",
          cable: "Polea",
          dumbbell: "Mancuerna",
          "elliptical machine": "Máquina elíptica",
          "ez barbell": "Barra Z",
          hammer: "Mazo",
          kettlebell: "Pesa rusa",
          "leverage machine": "Máquina de palanca",
          "medicine ball": "Balón medicinal",
          "olympic barbell": "Barra olímpica",
          "resistance band": "Banda de resistencia",
          roller: "Rodillo",
          rope: "Cuerda",
          "skierg machine": "Máquina Skierg",
          "sled machine": "Máquina Sled",
          "smith machine": "Máquina Smith",
          "stability ball": "Pelota de equilibrio",
          "stationary bike": "Bicicleta estática",
          "stepmill machine": "Máquina de escaleras",
          tire: "Neumático",
          "trap bar": "Barra hexagonal",
          "upper body ergometer": "Ergómetro de brazo",
          weighted: "Peso extra",
          "wheel roller": "Rueda abdominal",
        },
      },
    };
  }
  if (section === "add") {
    return {
      en: [
        "Time",
        "Reps",
        "Sets",
        "Rest time between sets",
        "Time before next exercise",
        "Cancel",
        "Save",
      ],
      es: [
        "Tiempo",
        "Reps",
        "Series",
        "Tiempo de descanso entre series",
        "Tiempo antes del siguiente ejercicio",
        "Cancelar",
        "Guardar",
      ],
    };
  }
  if (section === "buttons") {
    return {
      en: ["Confirm", "Cancel", "Skip", "Next"],
      es: ["Confirmar", "Cancelar", "Saltar", "Siguiente"],
    };
  }
  if (section === "preview") {
    return {
      en: {
        btn: "Start",
        txt1: "reps",
        txt2: "rep",
        txt3: "secs",
        txt4: "sec",
      },
      es: {
        btn: "Empezar",
        txt1: "reps",
        txt2: "rep",
        txt3: "segs",
        txt4: "seg",
      },
    };
  }
  if (section === "rest") {
    return {
      en: {
        btn: "Skip",
        label: "Next exercise",
        alt: "image",
        txt1: "seconds",
        txt2: "second",
        txt3: "repetitions",
        txt4: "repetition",
      },
      es: {
        btn: "Saltar",
        label: "Siguiente ejercicio",
        alt: "imagen",
        txt1: "segundos",
        txt2: "segundo",
        txt3: "repeticiones",
        txt4: "repetición",
      },
    };
  }
  if (section === "index") {
    return {
      en: {
        btn1: "Finish",
        routine_msg: "Do you want to delete the routine:",
        workout_msg: "Do you want to delete the exercise:",
        start_msg: "Get ready!",
        rest_msg: "Take a rest!",
        finish_msg: "Congratulations!",
        do_msg: "Do the exercise!",
        next_msg: "Next exercise",
        voice_msg: "Hello!",
        confirm_msg: "Do you want to stop the routine?",
        txt1: "seconds",
        txt2: "second",
        txt3: "repetitions",
        txt4: "repetition",
      },
      es: {
        btn1: "Terminar",
        routine_msg: "¿Quieres borrar la rutina:",
        workout_msg: "¿Quieres borrar el ejercicio:",
        start_msg: "¡Prepárate!",
        rest_msg: "¡Toma un descanso!",
        finish_msg: "¡Felicidades!",
        do_msg: "¡Haz el ejercicio!",
        next_msg: "Siguiente ejercicio",
        voice_msg: "¡Hola!",
        confirm_msg: "¿Estas seguro de detener la rutina?",
        txt1: "segundos",
        txt2: "segundo",
        txt3: "repeticiones",
        txt4: "repetición",
      },
    };
  }
}
