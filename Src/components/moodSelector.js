// Arreglo con la información base de cada emoción.
// Se define:
// - una clave interna (key)
// - el texto que verá el usuario (label)
// - la ruta de la imagen correspondiente (img)
const moods = [
    {
        key: "anxious",
        label: "Anxious",
        img: "./Src/assets/moods/anxious.png"
    },
    {
        key: "angry",
        label: "Angry",
        img: "./Src/assets/moods/angry.png"
    },
    {
        key: "happy",
        label: "Happy",
        img: "./Src/assets/moods/happy.png"
    },
    {
        key: "disgusted",
        label: "Disgusted",
        img: "./Src/assets/moods/disgusted.png"
    },
    {
        key: "sad",
        label: "Sad",
        img: "./Src/assets/moods/sad.png"
    }
];

// Esta función se encarga de renderizar el componente completo
// dentro del contenedor .mood-container que ya existe en el HTML.

export function renderMoodSelector() {
    // Buscamos en el DOM el contenedor donde van las tarjetas.
    const container = document.querySelector(".mood-container");

    // si el contenedor no existe, detenemos la función
    // para evitar errores en consola.
    if (!container) return;

    // Recorremos el arreglo de emociones y por cada emoción
    // generamos una tarjeta en formato HTML.
    // Luego unimos todas las tarjetas con join("")
    // para insertarlas de una sola vez en el contenedor.
    container.innerHTML = moods
        .map((mood) => {
            return `
        <div class="mood-card" data-mood="${mood.key}">
        <img src="${mood.img}" alt="${mood.label}">
        <p class="highlightText mood-label">${mood.label}</p>
        </div>`;
        })
        .join("");
}