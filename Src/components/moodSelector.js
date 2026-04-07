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

// Esta función se encarga de renderizar el componente completo
// dentro del contenedor .mood-container que ya existe en el HTML.
export function renderMoodSelector() {
    // Buscamos en el DOM el contenedor donde van las tarjetas.
    const container = document.querySelector(".mood-container");

    // Si el contenedor no existe, detenemos la función
    // para evitar errores en consola.
    if (!container) return;

    // Recorremos el arreglo de emociones y por cada emoción
    // generamos una tarjeta en formato HTML.
    // También guardamos el color en una variable CSS personalizada (--mood-color)
    // para poder usarlo luego desde el archivo CSS.
    container.innerHTML = moods
        .map((mood) => {
            return `
        <div class="mood-card" data-mood="${mood.key}" style="--mood-color: ${mood.color};">
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

            // 1. quitar active de todas
            moodCards.forEach(c => c.classList.remove("active"));

            // 2. agregar active a la clickeada
            card.classList.add("active");

        });
    });
}