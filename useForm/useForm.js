/* Explicación:
1. Definición del hook personalizado useForm:

- Este hook se encarga de gestionar el estado de un formulario en React.
- Utiliza el hook useState para gestionar el estado del formulario.

2. Funciones para manipular el formulario:

- onInputChange: Esta función se utiliza para manejar el cambio en los campos del formulario. Cuando se llama con un evento de cambio (onChange), actualiza el estado del formulario con el nuevo valor del campo correspondiente.
- onResetForm: Esta función se utiliza para restablecer el formulario al estado inicial. Cuando se llama, restablece el estado del formulario al valor inicial especificado en initialForm.

3. Retorno del estado del formulario y las funciones:

- El hook useForm retorna un objeto que contiene el estado actual del formulario (formState) y las funciones para manipularlo (onInputChange y onResetForm). */


import { useState } from 'react';

// Definición del hook personalizado useForm
export const useForm = ( initialForm = {} ) => {
  
  // Estado local para el formulario
  const [ formState, setFormState ] = useState( initialForm );

  // Función para manejar el cambio en los campos del formulario
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    // Actualiza el estado del formulario con el nuevo valor
    setFormState({
      ...formState,
      [ name ]: value,
    });
  };

  // Función para restablecer el formulario al estado inicial
  const onResetForm = () => {
    // Restablece el estado del formulario al estado inicial
    setFormState( initialForm );
  };

  // Retorna el estado actual del formulario y las funciones para manipularlo
  return {
    ...formState, // Retorna cada campo del formulario como una propiedad individual
    formState, // Retorna el objeto formState que contiene todos los campos del formulario
    onInputChange, // Función para manejar el cambio en los campos del formulario
    onResetForm, // Función para restablecer el formulario al estado inicial
  };
};
