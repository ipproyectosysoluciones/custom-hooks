# custom-hooks

En este repositorio, hemos implementado y probado varios custom hooks que pueden ser reutilizados en diferentes proyectos. A continuación, se describe cada uno de los hooks implementados y cómo pueden ser utilizados.

## Hooks Implementados

### 1. useCounter

Este hook es utilizado para gestionar un contador con funciones para incrementar, decrementar y resetear el valor del contador.

```javascript
import { useState } from 'react';

export const useCounter = ( initialValue = 10 ) => {
    const [counter, setCounter] = useState(initialValue);

    const increment = (value = 1) => {
        setCounter(counter + value);
    }

    const decrement = (value = 1) => {
        setCounter(counter - value);
    }

    const reset = () => {
        setCounter(initialValue);
    }

    return {
        counter,
        increment,
        decrement,
        reset,
    };
}
```

### 2. useFetch

Este hook es utilizado para realizar solicitudes HTTP y manejar el estado de carga, errores y datos recibidos.

```javascript
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    });

    const getFetch = async () => {
        setState({
            ...state,
            isLoading: true,
        });

        try {
            const resp = await fetch(url);
            const data = await resp.json();
            setState({
                data,
                isLoading: false,
                hasError: null,
            });
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                hasError: error,
            });
        }
    }

    useEffect(() => {
        getFetch();
    }, [url]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };
}
```

### 3. useForm

Este hook es utilizado para gestionar el estado de un formulario y proporcionar funciones para manejar cambios en los inputs y resetear el formulario.

```javascript
import { useState } from 'react';

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    };
}
```

### 4. useTodos

Este hook es utilizado para gestionar una lista de tareas, permitiendo agregar, eliminar y marcar tareas como completadas.

```javascript
import { useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [];

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState);

    const handleNewTodo = (todo) => {
        dispatch({
            type: '[TODO] Add Todo',
            payload: todo,
        });
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    };
}
```

## Subir código a nuestro repositorio

Para subir el código de tus custom hooks a tu repositorio, sigue estos pasos:

1. Asegúrate de tener Git instalado en tu máquina.
2. Clona tu repositorio o navega a tu directorio de trabajo.
3. Añade los archivos de tus custom hooks.
4. Realiza un commit con un mensaje descriptivo.
5. Sube los cambios a tu repositorio remoto.

```sh
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO>
# Añade tus archivos de custom hooks
git add .
git commit -m "Añadir custom hooks useCounter, useFetch, useForm y useTodos"
git push origin main
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
