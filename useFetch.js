/* Explicación:
1. Definición del hook personalizado useFetch:

- Este hook se encarga de realizar una petición HTTP GET a una URL dada.
- Utiliza el hook useState para gestionar el estado de la petición.

2. Efecto para realizar la petición:

- Se utiliza el hook useEffect para realizar la petición cada vez que la URL cambia.

3. Funciones auxiliares:

- setLoadingState: Establece el estado de carga inicial.
- getFetch: Realiza la petición HTTP GET. Si la URL está en la caché local, utiliza los datos de la caché. Si la respuesta no es exitosa, establece el estado de error. Después de recibir los datos, los almacena en la caché local.

4. Retorno del estado de la petición:

- El hook useFetch retorna un objeto que contiene el estado actual de la petición (data, isLoading y hasError). */


import { useEffect, useState } from 'react';

// Objeto para almacenar datos en caché localmente
const localCache = {};

// Definición del hook personalizado useFetch
export const useFetch = ( url ) => {
  // Estado local para el resultado de la petición
  const [ state, setState ] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  // Efecto para realizar la petición cuando la URL cambia
  useEffect(() => {
    getFetch();
  }, [ url ]);

  // Función para establecer el estado de carga
  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  // Función asíncrona para realizar la petición
  const getFetch = async () => {
    // Verifica si la URL está en la caché local
    if (localCache[ url ]) {
      console.log( 'Usando cache' );
      // Utiliza los datos de la caché local
      setState({
        data: localCache[ url ],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    };
    
    // Establece el estado de carga
    setLoadingState();

    // Realiza la petición
    const resp = await fetch( url );

    // Sleep (simulación de retardo)
    await new Promise(( resolve ) => setTimeout( resolve, 1500 ));

    // Verifica si la respuesta es exitosa
    if ( !resp.ok ) {
      // Establece el estado de error si la respuesta no es exitosa
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          status: resp.status,
          statusText: resp.statusText,
        },
      });
      return;
    };

    // Parsea la respuesta a JSON
    const data = await resp.json();
    // Actualiza el estado con los datos recibidos
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    // Almacena los datos en la caché local
    localCache[ url ] = data;
  };
  
  // Retorna el estado actual de la petición
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
