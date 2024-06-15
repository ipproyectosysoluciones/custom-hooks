# custom-hooks

En este repositorio, he implementado y probado varios custom hooks que pueden ser reutilizados en diferentes proyectos. A continuación, se describe cada uno de los hooks implementados y cómo pueden ser utilizados.

## Hooks Implementados

### 1. useCounter

Este hook es utilizado para gestionar un contador con funciones para incrementar, decrementar y resetear el valor del contador.

```javascript
import { useState } from 'react';

export const useCounter = ( initialValue = 10 ) => {
  
  const [ counter, setCounter ] = useState( initialValue );

  const increment = ( value = 1 ) => {
    setCounter( ( current ) => current + value );
  };

  const decrement = ( value = 1 ) => {
    
    if ( counter === 0 ) return;

    setCounter( ( current ) => current - value );
  };

  const reset = () => {
    setCounter( initialValue );
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
```

### 2. useFetch

Este hook es utilizado para realizar solicitudes HTTP y manejar el estado de carga, errores y datos recibidos.

```javascript
import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = ( url ) => {
  
  const [ state, setState ] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [ url ]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {

    if (localCache[ url ]) {
      console.log( 'Usando cache' );
      
      setState({
        data: localCache[ url ],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    };
    
    setLoadingState();

    const resp = await fetch( url );

    await new Promise(( resolve ) => setTimeout( resolve, 1500 ));

    if ( !resp.ok ) {
      
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

    const data = await resp.json();

    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[ url ] = data;
  };
  
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

```

### 3. useForm

Este hook es utilizado para gestionar el estado de un formulario y proporcionar funciones para manejar cambios en los inputs y resetear el formulario.

```javascript
import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
  const [ formState, setFormState ] = useState( initialForm );

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [ name ]: value,
    });
  };

  const onResetForm = () => {
    setFormState( initialForm );
  };

  return {
    ...formState, 
    formState, 
    onInputChange, 
    onResetForm, 
  };
};
```

### 4. useTodos

Este hook es utilizado para gestionar una lista de tareas, permitiendo agregar, eliminar y marcar tareas como completadas.

```javascript
import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem( 'todos' )) || [];
};

export const useTodos = () => {
 
  const [ todos, dispatch ] = useReducer( todoReducer, [], init );

  useEffect(() => {
    localStorage.setItem( 'todos', JSON.stringify( todos ));
  }, [ todos ]);

  const handleNewTodo = ( todo ) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = ( id ) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };

  const handleToggleTodo = ( id ) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
```

## Clonar Repositorio

Para clonar este repositorio solo debes de seguir este comando:

```sh
git clone https://github.com/ipproyectosysoluciones/custom-hooks.git
cd custom-hooks
```

## Mantén tu repositorio ordenado

Para mantener tu repositorio ordenado y con ejemplos claros, considera las siguientes ideas:

- **Crea una estructura de carpetas lógica**: Agrupa tus hooks en una carpeta `hooks` y los componentes en otra carpeta `components`.
- **Incluye ejemplos de uso**: Proporciona ejemplos claros de cómo utilizar cada custom hook en diferentes escenarios. Puedes crear una carpeta `examples` con diferentes componentes de ejemplo.
- **Documenta tus hooks**: Añade comentarios y documentación en línea para explicar qué hace cada función y cómo debe ser utilizada.

```sh
├── src
│   ├── hooks
│   │   ├── useCounter.js
│   │   ├── useFetch.js
│   │   ├── useForm.js
│   │   ├── useTodos.js
│   ├── components
│   │   ├── CounterComponent.js
│   │   ├── FetchComponent.js
│   │   ├── FormComponent.js
│   │   ├── TodoComponent.js
│   ├── examples
│   │   ├── UseCounterExample.js
│   │   ├── UseFetchExample.js
│   │   ├── UseFormExample.js
│   │   ├── UseTodosExample.js
│   ├── App.js
│   ├── index.js
```

Siguiendo estas recomendaciones, podrás mantener tu repositorio ordenado y fácil de entender para otros desarrolladores que deseen utilizar tus custom hooks.
