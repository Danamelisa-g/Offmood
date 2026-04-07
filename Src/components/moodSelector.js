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

// Clave que se usará para guardar en localStorage
const STORAGE_KEY = "selectedMood";

// Esta función se encarga de renderizar el componente completo
// dentro del contenedor .mood-container que ya existe en el HTML.
export function renderMoodSelector() {
    // Buscamos en el DOM el contenedor donde van las tarjetas.
    const container = document.querySelector(".mood-container");

    // Si el contenedor no existe, detenemos la función
    // para evitar errores en consola.
    if (!container) return;

    // Recuperamos la emoción previamente guardada en localStorage.
    // Si no existe ninguna, el valor será null.
    const savedMood = localStorage.getItem(STORAGE_KEY);

    // Recorremos el arreglo de emociones y por cada emoción
    // generamos una tarjeta en formato HTML.
    // También guardamos el color en una variable CSS personalizada (--mood-color)
    // para poder usarlo luego desde el archivo CSS.
    // Si la emoción coincide con la guardada, se le agrega la clase active.
    container.innerHTML = moods
        .map((mood) => {
            const isActive = mood.key === savedMood;

            return `
        <div class="mood-card ${isActive ? "active" : ""}" data-mood="${mood.key}" style="--mood-color: ${mood.color};">
            <img src="${mood.img}" alt="${mood.label}">
            <p class="mood-label">${mood.label}</p>
        </div>`;
        })
        .join("");

    // Después de renderizar el HTML, seleccionamos todas las tarjetas
    // para poder agregarles el evento click.
    const moodCards = document.querySelectorAll(".mood-card");

    // A cada tarjeta le agregamos un evento click
    moodCards.forEach(card => {
        card.addEventListener("click", () => {
            // Obtenemos la emoción asociada a la tarjeta clickeada
            const selectedMood = card.dataset.mood;

            // Guardamos la emoción seleccionada en localStorage
            localStorage.setItem(STORAGE_KEY, selectedMood);

            // Quitamos la clase active de todas las tarjetas
            moodCards.forEach(c => c.classList.remove("active"));

            // Agregamos la clase active solo a la tarjeta clickeada
            card.classList.add("active");
        });
    });
}