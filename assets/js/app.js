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

const renderizarCards = (lista) => {
  cardContainer.innerHTML = "";

  lista.forEach((personaje) => {
    const { id, name, occupation, status, portrait_path } = personaje;

    const urlImagenCompleta = `${BASE_CDN}${portrait_path}`;

    cardContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm border-warning">
                    <img 
                        src="${urlImagenCompleta}" 
                        class="card-img-top p-2" 
                        alt="${name}" 
                        style="height: 250px; object-fit: contain;"
                    >
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title text-primary fw-bold">${name}</h5>
                        <p class="card-text mb-1 small"><strong>Ocupación:</strong> ${occupation}</p>
                        <p class="card-text text-muted small"><strong>Estado:</strong> ${status}</p>
                        <button class="btn btn-warning mt-auto fw-bold btn-ver-detalle" data-id="${id}">
                            Ver detalle
                        </button>
                    </div>
                </div>
            </div>
        `;
  });
};
obtenerPersonajes();

const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#inputBuscar");

formBuscar.addEventListener("submit", (e) => {
  e.preventDefault();
  mensajeError.textContent = "";

  const termino = inputBuscar.value.toLowerCase().trim();

  if (termino === "") {
    alert("Por favor, ingresa un nombre para buscar.");
    return;
  }

  const filtrados = personajesSimpson.filter((p) =>
    p.name.toLowerCase().includes(termino),
  );

  if (filtrados.length === 0) {
    limpiarContenedor();
    mensajeError.textContent = `No se hallaron resultados para "${termino}".`;
  } else {
    renderizarCards(filtrados);
  }
});
