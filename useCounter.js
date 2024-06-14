/* Explicación:
1. Definición del hook personalizado useCounter:

- Se define un hook personalizado llamado useCounter, que utiliza el hook useState para gestionar un estado local (counter).
- El valor inicial del contador se establece en initialValue, que por defecto es 10.

2. Funciones para manipular el contador:

- Se definen las funciones increment, decrement y reset para incrementar, decrementar y restablecer el contador respectivamente.
- La función increment suma value al contador actual.
- La función decrement resta value al contador actual, pero solo si el contador no es 0 para evitar valores negativos.
- La función reset restablece el contador al valor inicial especificado.

3. Retorno del estado y las funciones:

- El hook useCounter retorna un objeto que contiene el estado actual del contador (counter) y las funciones para manipularlo (increment, decrement y reset). */


import { useState } from 'react';

// Definición del hook personalizado useCounter
export const useCounter = ( initialValue = 10 ) => {
  
  // Estado local para el contador
  const [ counter, setCounter ] = useState( initialValue );

  // Función para incrementar el contador
  const increment = ( value = 1 ) => {
    setCounter( ( current ) => current + value );
  };

  // Función para decrementar el contador
  const decrement = ( value = 1 ) => {
    // Verifica si el contador es 0 para evitar valores negativos
    if ( counter === 0 ) return;

    setCounter( ( current ) => current - value );
  };

  // Función para restablecer el contador al valor inicial
  const reset = () => {
    setCounter( initialValue );
  };

  // Retorna el estado del contador y las funciones para manipularlo
  return {
    counter,
    increment,
    decrement,
    reset,
  };
};