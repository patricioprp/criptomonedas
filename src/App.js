import React, {useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenerdor = styled.div`
max-width: 900px;
margin:0 auto;
@media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap:2rem;
}
`;

const Imagen  = styled.img`
max-width:100%;
margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

  const [moneda,guardarMoneda] = useState('');
  const [criptoMoneda,guardarCriptomoneda] = useState('');
  const [resultado,guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(async() => {
    const cotizarCritomoneda = async () => {
    //Evitamos la ejecucion por primera vez
    if(moneda === '') return;
    // consultar la api para obtener la cotizacion
   const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
   const resultado = await axios.get(url);
   //guardar cargando
   guardarCargando(true);
   //ocular el spinner y guardar el resultado
   setTimeout(() => {
     //cambiar el estado de cargando
     guardarCargando(false);
     //guardar cotizacion
     guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
   },3000);

    }
    cotizarCritomoneda();
  }, [moneda,criptoMoneda])

  //Mostrar spinner y resultado
  const Componente = (cargando) ? <Spinner /> : <Cotizacion resultado = {resultado} />

  return (
    <Contenerdor>
        <div>
            <Imagen 
            src={imagen}
            alt="Imagen Cripto"
            />
        </div>

        <div>
            <Heading>
                Cotiza Criptomonedas al Instante
            </Heading>

            <Formulario
            guardarMoneda = {guardarMoneda}
            guardarCriptomoneda = {guardarCriptomoneda}
            />
            {Componente}
        </div>
    </Contenerdor>
  );
}

export default App;
