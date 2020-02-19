import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const useMoneda = () => {

    //definicion del state de nuestro custom hook
    const [ state, actualizarState ] = useState('');

    const Seleccionar = () => (
        <Fragment>
            <label>Moneda</label>
            <select>
                <option value='MXN'>Peso Mexicano</option>
            </select>
        </Fragment>
    )

    //Para retornar el state, la interfaz y la funcion que modifica el state
    return [ state, Seleccionar, actualizarState ]
    
}

export default useMoneda;