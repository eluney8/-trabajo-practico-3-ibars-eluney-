const URL_API = "https://thesimpsonsapi.com/api/characters";
const BASE_CDN = "https://cdn.thesimpsonsapi.com/500";
let personajesSimpson = [];

const cardContainer = document.querySelector("#cardContainer");
const mensajeError = document.querySelector("#mensajeError");

const obtenerPersonajes = async () => {
  try {
    const response = await fetch(URL_API);

    const data = await response.json();

    personajesSimpson = data.results;

    if (personajesSimpson && personajesSimpson.length > 0) {
      renderizarCards(personajesSimpson);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
