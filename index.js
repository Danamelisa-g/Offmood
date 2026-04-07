//faker incompatible con navegador según lo que investigué 

/*const { faker } = require('@faker-js/faker');
console.log(faker.person.fullName());
*/

//moodSelector

// Importamos la función que renderiza el componente de emociones
import { renderMoodSelector } from "./Src/components/moodSelector.js";

// Llamamos la función para que el componente aparezca en pantalla
renderMoodSelector();