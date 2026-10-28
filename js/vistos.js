const CLAVE = 'parcial2-vistos';

export const leerVistos = () => {
  try {
    const datos = localStorage.getItem(CLAVE);

    if (datos === null) {
      return [];
    }

    const ids = JSON.parse(datos);

    if (!Array.isArray(ids)) {
      return [];
    }

    return ids;
  } catch {
    return [];
  }
};

export const guardarVistos = (ids) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ids));
  } catch {
    return;
  }
};
