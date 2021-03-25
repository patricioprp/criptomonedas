import React, {Fragment,useState} from 'react';

const useMoneda = () => {

    //state de nuestro custom hook
    const [state, actualziarState] = useState('');
   const Seleccionar = () =>(
    <Fragment>
        <label>Moneda</label>
        <select>
            <option value="AR">Peso Argentino</option>
        </select>
    </Fragment>
   );
   //Retornar state, interfaz y fn que modifica el state test
   return [state,Seleccionar,actualziarState]
}
export default useMoneda;