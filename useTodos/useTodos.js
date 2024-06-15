// Importaciones necesarias desde React y el archivo del reducer de tareas
import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

// Función de inicialización para obtener los todos desde el localStorage
const init = () => {
  return JSON.parse(localStorage.getItem( 'todos' )) || [];
};

// Hook personalizado para manejar la lógica de los todos
export const useTodos = () => {
 
  // useReducer para manejar el estado de los todos con la función de inicialización
  const [ todos, dispatch ] = useReducer( todoReducer, [], init );

  // useEffect para guardar los todos en el localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem( 'todos', JSON.stringify( todos ));
  }, [ todos ]);

  // Función para manejar la adición de un nuevo todo
  const handleNewTodo = ( todo ) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    // Despacha la acción al reducer
    dispatch(action);
  };

  // Función para manejar la eliminación de un todo por su id
  const handleDeleteTodo = ( id ) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };

  // Función para manejar el toggle (completar/no completar) de un todo por su id
  const handleToggleTodo = ( id ) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  };

  // Retorna el estado de los todos y las funciones de manejo, así como algunos contadores
  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
