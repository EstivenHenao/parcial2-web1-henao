// js/logica.js · Funciones PURAS: reciben datos y devuelven datos. Aquí NO aparece document.

// R4 · Devuelve los episodios cuyo name contiene `texto` (sin importar mayúsculas ni espacios
// al inicio o al final) y cuyo código episode (S01E01…) empieza por `temporada`.
// temporada === '' significa «todas las temporadas».

export const filtrarEpisodios = (lista, { texto, temporada }) => {
  const busqueda = texto.trim().toLowerCase();

  return lista.filter((episodio) => {
    const coincideNombre = episodio.name.toLowerCase().includes(busqueda);
    const coincideTemporada = temporada === '' || episodio.episode.startsWith(temporada);

    return coincideNombre && coincideTemporada;
  });
};

export const contarPersonajes = (lista) => {
  return lista.reduce((total, episodio) => total + episodio.characters.length, 0);
};

export const alternarId = (ids, id) => {
  if (ids.includes(id)) {
    return ids.filter((elemento) => elemento !== id);
  }

  return [...ids, id];
};
