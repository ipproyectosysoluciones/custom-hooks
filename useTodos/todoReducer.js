

// Función reducer para manejar las acciones relacionadas con los todos
export const todoReducer = ( initialState = [], action ) => {
  
  // Se evalúa el tipo de acción recibida
  switch ( action.type ) {
    // Caso para añadir un nuevo todo
    case "[TODO] Add Todo":
      // Se retorna un nuevo estado que incluye el estado anterior y el nuevo todo
      return [ ...initialState, action.payload ];

    // Caso para eliminar un todo
    case "[TODO] Remove Todo":
      // Se filtran los todos para excluir el todo con el id especificado en action.payload
      return initialState.filter( todo  => todo.id !== action.payload );

    // Caso para alternar el estado de completado de un todo
    case "[TODO] Toggle Todo":
      // Se mapean los todos, y si el id coincide con el especificado en action.payload, se alterna el estado de 'done'
      return initialState.map( todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        // Si no coincide el id, se retorna el todo tal cual
        return todo;
      });

    // Caso por defecto que retorna el estado inicial sin cambios
    default:
      return initialState;
  };
};
