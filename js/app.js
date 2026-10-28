
import { obtenerEpisodios } from './api.js';
import { filtrarEpisodios, contarPersonajes, alternarId } from './logica.js';
import { leerVistos, guardarVistos } from './vistos.js';

let episodios = [];
let vistos = leerVistos();
const filtros = { texto: '', temporada: '' };

const lista = document.querySelector('#lista');
const contador = document.querySelector('#contador');
const formFiltros = document.querySelector('#form-filtros');
const inputBusqueda = document.querySelector('#busqueda');
const selectTemporada = document.querySelector('#filtro-temporada');

const tarjetaHTML = (episodio) => {
  const estaVisto = vistos.includes(episodio.id);

  const claseArticulo = estaVisto
    ? ' ring-2 ring-emerald-500'
    : '';

  const claseBoton = estaVisto
    ? 'mt-auto rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700'
    : 'mt-auto rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700';

  const textoBoton = estaVisto ? '✓ Visto' : 'Marcar como visto';

  return `
    <article class="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow${claseArticulo}">
      <span class="w-fit rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">${episodio.episode}</span>
      <h3 class="text-lg font-bold">${episodio.name}</h3>
      <p class="text-sm text-slate-500">Emitido: ${episodio.air_date}</p>
      <p class="text-sm text-slate-500">${episodio.characters.length} personajes</p>
      <button type="button" data-id="${episodio.id}" class="${claseBoton}">${textoBoton}</button>
    </article>
  `;
};

const mostrarCargando = () => {
  lista.innerHTML = `
    <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">
      Cargando episodios…
    </p>
  `;
  contador.textContent = '';
};

const mostrarError = (mensaje) => {
  lista.innerHTML = `
    <div class="col-span-full rounded-2xl bg-rose-50 p-8 text-center text-rose-700">
      <p>No se pudieron cargar los episodios (${mensaje}).</p>
      <button type="button" id="btn-reintentar" class="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700">
        Reintentar
      </button>
    </div>
  `;
  contador.textContent = '';
};

const render = () => {
  const filtrados = filtrarEpisodios(episodios, filtros);

  contador.textContent = `${filtrados.length} de ${episodios.length} episodios · ${contarPersonajes(filtrados)} personajes`;

  if (filtrados.length === 0) {
    lista.innerHTML = `
      <p class="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">
        Ningún episodio coincide con la búsqueda.
      </p>
    `;
    return;
  }

  lista.innerHTML = filtrados.map(tarjetaHTML).join('');
};

const cargar = async () => {
  mostrarCargando();

  try {
    episodios = await obtenerEpisodios();
    render();
  } catch (error) {
    mostrarError(error.message);
  }
};

inputBusqueda.addEventListener('input', () => {
  filtros.texto = inputBusqueda.value;
  render();
});

selectTemporada.addEventListener('change', () => {
  filtros.temporada = selectTemporada.value;
  render();
});

formFiltros.addEventListener('submit', (event) => {
  event.preventDefault();
});

lista.addEventListener('click', (event) => {
  const botonReintentar = event.target.closest('#btn-reintentar');

  if (botonReintentar) {
    cargar();
    return;
  }

  const botonVisto = event.target.closest('button[data-id]');

  if (!botonVisto) {
    return;
  }

  const id = Number(botonVisto.dataset.id);
  vistos = alternarId(vistos, id);
  guardarVistos(vistos);
  render();
});

cargar();
