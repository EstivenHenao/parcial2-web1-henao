# Parcial 2 · Respuestas de razonamiento

**Nombre:** Andrés Estiven Henao Morales

## P1 · ¿En qué orden se imprime?

**(a) Respuesta:**

El orden es: `1`, `3`, `5`, `2` y `4`. El `4` aparece cuando termina la petición `fetch`, así que podría tardar un poco más.

**(b) Respuesta:**

El `3` sale antes que el `5` porque la función `cargar()` empieza a ejecutarse inmediatamente cuando la llamamos. `async` no hace que toda la función espere; la ejecución solo se pausa cuando llega al `await`.

**(c) Respuesta:**

El `5` no espera porque el código principal sigue ejecutándose mientras `fetch` espera la respuesta del servidor. El `2` se ejecuta mediante `setTimeout` y el `4` después de que termina la petición, por eso ambos salen al final. El orden entre `2` y `4` depende de cuándo responda la petición.

## P2 · Un 404 que no llega al catch

**(a) Respuesta:**

Imprime `Episodio: undefined`, porque la respuesta contiene la propiedad `error`, pero no contiene una propiedad `name`.

**(b) Respuesta:**

`fetch` no entra al `catch` solamente porque el servidor responda con un error HTTP como el 404. En este caso sí hubo respuesta del servidor; el `catch` se usa si ocurre un error de red o si el código lanza un error.

**(c) Respuesta:**

La línea que falta es:

```js
if (!respuesta.ok) {
  throw new Error(`HTTP ${respuesta.status}`);
}
```

Va inmediatamente después de la línea que hace `fetch`, antes de ejecutar `respuesta.json()`. Con esa línea, la consola imprime `Falló: HTTP 404`.

## P3 · LocalStorage sin JSON

**(a) Respuesta:**

Imprime `1,5,8 string`. `localStorage` guarda los valores como texto, aunque inicialmente le pasemos un array.

**(b) Respuesta:**

Imprime `5`, porque el texto `"1,5,8"` tiene cinco caracteres: el `1`, las dos comas, el `5` y el `8`.

**(c) Respuesta:**

La línea `JSON.parse(leido)` produce un error `SyntaxError`, porque `"1,5,8"` no es un JSON válido como array. Para representar un array correctamente, el texto debe tener corchetes.

**(d) Respuesta:**

La segunda línea corregida es:

```js
localStorage.setItem('vistos', JSON.stringify(vistos));
```

**(e) Respuesta:**

El `try/catch` permite que la aplicación siga funcionando si el valor guardado está dañado o no es un JSON válido. Sin él, `JSON.parse` podría detener la ejecución y evitar que se cargue correctamente la página.

## P4 · Botones que dejan de funcionar

**(a) Respuesta:**

Cuando se llama a `render()`, se reemplaza el contenido de `#lista` y se crean botones nuevos. Como el `forEach` solo se ejecuta una vez, los botones nuevos no tienen los eventos registrados y dejan de responder.

**(b) Respuesta:**

```js
document.querySelector('#lista').addEventListener('click', (event) => {
  const boton = event.target.closest('[data-id]');

  if (!boton) {
    return;
  }

  vistos = alternarId(vistos, Number(boton.dataset.id));
  guardarVistos(vistos);
  render();
});
```

La delegación funciona porque el evento se escucha en `#lista`, que no se reemplaza cuando se renderizan las tarjetas. `closest('[data-id]')` identifica el botón presionado y, si el clic no corresponde a un botón de episodio, el código no hace nada.
