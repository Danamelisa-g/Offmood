// Arreglo con la información base de cada emoción.
// Se define:
// - una clave interna (key)
// - el texto que verá el usuario (label)
// - la ruta de la imagen correspondiente (img)
// - el color representativo de la emoción (color)
const moods = [
    {
        key: "anxious",
        label: "Anxious",
        img: "./Src/assets/moods/anxious.png",
        color: "#FFB4D6"
    },
    {
        key: "angry",
        label: "Angry",
        img: "./Src/assets/moods/angry.png",
        color: "#F7666C"
    },
    {
        key: "happy",
        label: "Happy",
        img: "./Src/assets/moods/happy.png",
        color: "#FFDF56"
    },
    {
        key: "disgusted",
        label: "Disgusted",
        img: "./Src/assets/moods/disgusted.png",
        color: "#25E193"
    },
    {
        key: "sad",
        label: "Sad",
        img: "./Src/assets/moods/sad.png",
        color: "#00B3FC"
    }
];

// Clave general que se usará para guardar todo el historial de emociones
// dentro de localStorage.
const STORAGE_KEY = "moodHistory";

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 */
function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

/**
 * Recupera el historial de emociones guardado en localStorage.
 * Si no existe nada todavía, devuelve un objeto vacío.
 */
function getMoodHistory() {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    return savedHistory ? JSON.parse(savedHistory) : {};
}

/**
 * Guarda el historial completo actualizado en localStorage.
 */
function saveMoodHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Devuelve la emoción completa a partir de su key.
 * Esto sirve para buscar imagen y color de una emoción guardada.
 */
function getMoodByKey(key) {
    return moods.find((mood) => mood.key === key);
}

/**
 * Genera un arreglo con los 7 días de la semana actual.
 * La semana empieza en domingo.
 * Cada día incluye:
 * - label: nombre corto visible (sun, mon, etc.)
 * - date: fecha en formato YYYY-MM-DD
 */
function getCurrentWeekDates() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = domingo, 1 = lunes, etc.

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const dayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const week = [];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);

        week.push({
            label: dayLabels[i],
            date: currentDate.toISOString().split("T")[0]
        });
    }

    return week;
}

/**
 * Renderiza la sección de historial semanal.
 * Si hoy no tiene emoción registrada, no muestra todavía la sección.
 */
function renderWeekHistory() {
    const historyContainer = document.querySelector(".week-history");
    if (!historyContainer) return;

    const moodHistory = getMoodHistory();
    const today = getTodayDate();
    const todayMood = moodHistory[today];

    // Si todavía no hay emoción registrada hoy,
    // no mostramos el historial semanal.
    if (!todayMood) {
        historyContainer.innerHTML = "";
        return;
    }

    const weekDates = getCurrentWeekDates();

    historyContainer.innerHTML = `
        <div class="week-history-divider"></div>
        <h3 class="week-history-title">Your week so far</h3>
        <div class="week-history-days">
            ${weekDates.map((day) => {
                const savedMoodKey = moodHistory[day.date];
                const savedMood = getMoodByKey(savedMoodKey);

                return `
                    <div class="week-day">
                        <div class="week-day-circle">
                            ${
                                savedMood
                                    ? `<img src="${savedMood.img}" alt="${savedMood.label}">`
                                    : `<span class="week-day-dot"></span>`
                            }
                        </div>
                        <p class="week-day-label">${day.label}</p>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// Esta función se encarga de renderizar el componente completo
// dentro del contenedor .mood-container que ya existe en el HTML.
export function renderMoodSelector() {
    // Buscamos en el DOM el contenedor donde van las tarjetas.
    const container = document.querySelector(".mood-container");

    // Si el contenedor no existe, detenemos la función
    // para evitar errores en consola.
    if (!container) return;

    // Recuperamos el historial completo de emociones.
    const moodHistory = getMoodHistory();

    // Obtenemos la fecha de hoy.
    const today = getTodayDate();

    // Buscamos si hoy ya tiene una emoción guardada.
    const todayMood = moodHistory[today];

    // Renderizamos las tarjetas de emociones.
    container.innerHTML = moods
        .map((mood) => {
            const isActive = mood.key === todayMood;

            return `
        <div class="mood-card ${isActive ? "active" : ""}" data-mood="${mood.key}" style="--mood-color: ${mood.color};">
            <img src="${mood.img}" alt="${mood.label}">
            <p class="mood-label">${mood.label}</p>
        </div>`;
        })
        .join("");

    // Renderizamos el historial semanal según el estado actual.
    renderWeekHistory();

    // Después de renderizar el HTML, seleccionamos todas las tarjetas
    // para poder agregarles el evento click.
    const moodCards = document.querySelectorAll(".mood-card");

    // A cada tarjeta le agregamos un evento click
    moodCards.forEach(card => {
        card.addEventListener("click", () => {
            // Obtenemos la emoción asociada a la tarjeta clickeada.
            const selectedMood = card.dataset.mood;

            // Recuperamos el historial actual.
            const updatedHistory = getMoodHistory();

            // Guardamos o actualizamos la emoción de la fecha de hoy.
            updatedHistory[today] = selectedMood;

            // Persistimos el historial actualizado en localStorage.
            saveMoodHistory(updatedHistory);

            // Quitamos la clase active de todas las tarjetas.
            moodCards.forEach(c => c.classList.remove("active"));

            // Agregamos la clase active solo a la tarjeta clickeada.
            card.classList.add("active");

            // Volvemos a renderizar el historial semanal
            // para reflejar inmediatamente el cambio.
            renderWeekHistory();
        });
    });
}