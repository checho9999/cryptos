import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import axios from 'axios'
import useMoneda from '../hooks/useMoneda'
import useCriptomonedas from '../hooks/useCriptomonedas'
import Error from './Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = () => {

    //useState del Listado de croptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    //Importamos el custom hook useMoneda (los nombres pueden diferir aunque hay que tener en cuetna el orden)
    const [ moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS); //SelecMonedas es la interfaz
    //const [ moneda, SelectMonedas, actualizarState ] = useMoneda('Elige tu moneda', '', MONEDAS); /* No es necesario actualizar el state, ya que se actualiza dentro del useMoneda */

     //Importamos el custom hook useCriptomonedas (los nombres pueden diferir aunque hay que tener en cuetna el orden)
    const [ criptomoneda, SelectCripto] = useCriptomonedas('Elige tu criptomoneda', '', listacripto); //SelectCrypto es la interfaz
    
    //Se llama a la API de Criptomonedas
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
            //console.log(resultado.data.Data);
        }

        consultarAPI();
    }, []);

        // cuando el usuario hace submit
        const cotizarMoneda = e => {
            e.preventDefault(); // para que no envie los datos por el metodo GET con el querystring
    
            // validar si ambos campos estan llenos
            if( moneda === '' || criptomoneda === '' ) {
                guardarError(true);
                return;
            }
    
            // pasar los datos al componente principal
            guardarError(false);
            //guardarMoneda(moneda);
            //guardarCriptomoneda(criptomoneda);
        }

    return (  
        <form
            onSubmit={cotizarMoneda}
        > 

            { error ? <Error mensaje='Todos los campos son obligatorios'/> : null }

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;
