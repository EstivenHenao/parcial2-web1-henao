// js/api.js · Comunicación con la API. En este archivo NO aparece la palabra document.
// Plan B (solo si la API no responde): cambia la URL por './respaldo/episodios.json'

export const URL_EPISODIOS = 'https://rickandmortyapi.com/api/episode';

export const pedirJSON = async (url) => {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  return await respuesta.json();
};

export const obtenerEpisodios = async () => {
  const datos = await pedirJSON(URL_EPISODIOS);
  return datos.results;
};

