import React, {useEffect,useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';

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


const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de USA'},
        { codigo: 'ARG', nombre: 'Peso de Argentina'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'}
    ]
    //Utilizar useMoneda
    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','',
    MONEDAS
    );

    // state del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    
    //Utilizar useCriptoMonedas
    const [criptoMoneda,SelectCripto] = useCriptomoneda('Elige tu criptoMoneda','',listacripto);
    //Error de validacion de formulario
    const [error, guardarError] = useState(false);
    useEffect(() => {
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, [])

    //cuando el usuario envia el formulario
    const cotizarMoneda = e => {
        e.preventDefault();
        if(moneda === '' || criptoMoneda === ''){
            guardarError(true);
            return;
        }
    //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptoMoneda);
    }

    return ( 
        
        <form
        onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
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