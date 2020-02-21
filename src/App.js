import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png';
import axios from 'axios'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after { /* para definir un pseudo elemento siguiente al Heading */
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`

function App() {

  //moneda validada desde Formulario
  const [moneda, guardarMoneda] = useState('');
  //criptomoneda validada desde Formulario
  const [criptomoneda, guardarCriptomoneda] = useState('');
  //resultado de la cotizacion de la criptomoneda, usado en Cotizacion
  const [resultado, guardarResultado] = useState({});
  //para visualizar o no el spinner
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {

    const cotizarCriptomoneda = async () => {
        // evitamos la ejecución la primera vez, ya que no hay cambios si moneda esta vacia
        if(moneda === '') return;

        // consultar la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url); //funciona tambien sin get (por defecto implementa get)

        //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);

        // mostrar el spinner
        guardarCargando(true);

        // ocultar el spinner y mostrar el resultado luego de 3 segundos
        setTimeout(() => {

          // cambiar el estado de cargando
          guardarCargando(false);

          //guardar cotizacion
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );

        }, 3000);
        
    }

    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado (carga condicional de componente en un intervalo de tiempo)
  const componente = (cargando) ? <Spinner /> :  <Cotizacion  resultado={resultado} />

  return (
    <Contenedor>

      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}
      </div>

    </Contenedor>
 
  );
}

export default App;
