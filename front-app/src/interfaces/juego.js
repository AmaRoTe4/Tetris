/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import axios from 'axios';
import {useEffect, useState} from 'react';
import Tablero from './elementosDom/Tablero.js'
import { Link } from 'react-router-dom';
let suma = 0;
let evento = 7;
let posicion = 0;
const tiempo = 2500;
let juego;
let partida;
let Pintados = [240 , 241 , 242 , 243 , 244 , 245 , 246 , 247 , 248 , 249];
let obj = [];
for(let i = 0; i< 250 ; i++){
    obj[i] = i;
} 
let posiciones = [];

// const URI = "http://192.168.0.112:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";

const Juego = () =>{
    let id = localStorage.getItem(1)
    const [grilla] = useState(obj);
    const [puntos , setPuntos] = useState(0);
    const [puntucionActual , setPuntucionActual] = useState(0);
    const [CuboActual , setCuboActual] = useState([7,7,7,7,7]);
    const [RetornoApantalla , setRetornoApantalla] = useState([7,7,7,7,7]);

    useEffect(() => {
        PuntoActual();
    });

    const PuntoActual = async () =>{
        const pun = await axios.get(URI+id)
        setPuntucionActual(pun.data[0].puntuacionMax);
    }

    const bloques = () =>{
        if(evento === 7){
            let estandar = CuboActual;
            for(let i = 0; i < 5; i++){
                estandar[i] = Math.floor(Math.random()*7)
            }
            setCuboActual({estandar});
            setRetornoApantalla(CuboActual)
        }else{
            CuboActual.shift()
            let estandar = CuboActual.push(Math.floor(Math.random()*7));
            setCuboActual({estandar});
            setRetornoApantalla(CuboActual)
        }
        if(CuboActual[0] === 0){
            evento = 0;
            posiciones = [4,5,14,15];
        }else if(CuboActual[0] === 1){
            posiciones = [4,5,6,7];
            evento = 1;
        }else if(CuboActual[0] === 2){
            posiciones = [5,14,15,16];
            evento = 2
        }else if(CuboActual[0] === 3){
            posiciones = [5,6,14,15]; 
            evento = 3;
        }else if(CuboActual[0] === 4){
            posiciones = [4,5,15,16]; 
            evento = 4;
        }else if(CuboActual[0] === 5){
            posiciones = [4,5,6,14]; 
            evento = 5;
        }else if(CuboActual[0] === 6){
            posiciones = [4,5,6,16]; 
            evento = 6;
        }
        generarForma()
    }

    const editar = async () =>{
        await axios.put(URI+id , {puntuacionMax: suma});
        alert(`perdiste pero superaste tu record , este ahora es de ${suma} , el juego se reiniciar en 5 segundos!`);
    }

    const finalDelJuego = () =>{
        const filtrados = Pintados.filter(n => n >= 0 && n <= 19)
        if(filtrados[0] !== undefined){
            if(puntucionActual < suma){
                editar();
            }else{
                alert("perdiste el juego se reiniciara en 5 segundo:")
            }
            setTimeout(() =>{
                window.location.reload()
            } , 5000);
            clearInterval(partida);
        }
    }

    const filtrados = () =>{
        Pintados = Pintados.filter((n , i)=>{
            return Pintados.indexOf(n) === i;
        })
        
    }
    
    const detectorDePuntos = () =>{
        let veces = 0;
        let nuevoP = Pintados.filter(n => n%10 === 0);
        nuevoP.map((cal , i)=>{
            if(i !== 0){
                const Obj = document.getElementById(`${nuevoP[i]}`);
                if(Obj.classList.contains("color10")){
                    if(Pintados.includes(nuevoP[i] + 1) && Pintados.includes(nuevoP[i] + 2) && Pintados.includes(nuevoP[i] + 3) && Pintados.includes(nuevoP[i] + 4) && Pintados.includes(nuevoP[i] + 5) && Pintados.includes(nuevoP[i] + 6) && Pintados.includes(nuevoP[i] + 7) && Pintados.includes(nuevoP[i] + 8) && Pintados.includes(nuevoP[i] + 9)) {
                        Pintados = Pintados.filter(n => n > (nuevoP[i] + 9) || n < nuevoP[i] || (n >= 240 && n <= 249));
                        Pintados.forEach((n , s) => {
                            n < nuevoP[i] ? Pintados[s] += 10 : n;
                        });
                        veces++;
                    }
                }
            }
        })
        if(veces > 0){
            if(veces === 1){
                suma += 100;
                setPuntos(suma );
            }else if(veces === 2){
                suma += 250;
                setPuntos(suma);
            }else if(veces === 3){
                suma += 450;
                setPuntos(suma);
            }else if(veces === 4){
                suma += 800;
                setPuntos(suma);
            }
        }
    }

    const generarForma = () =>{
        juego = setInterval(() => {
            if(!Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[1] + 10) && !Pintados.includes(posiciones[2] + 10) && !Pintados.includes(posiciones[3] + 10)){
                posiciones.map((n , i) =>{
                    posiciones[i] += 10
                    const bloque = document.getElementById(posiciones[i]);
                    if(!(bloque.classList.contains('color10'))){
                        bloque.classList.add('color10')
                    }
                })
                grilla.map((n , i) =>{
                    const bloque = document.getElementById(`${grilla[i]}`);
                    !Pintados.includes(bloque) && bloque.classList.contains('color10') && grilla[i] !== posiciones[0] && grilla[i] !== posiciones[1] && grilla[i] !== posiciones[2] && grilla[i] !== posiciones[3] ? bloque.classList.remove('color10') : '';
                    Pintados.map((na) => {
                        const blo = document.getElementById(`${na}`)
                        if(!blo.classList.contains('color10')){
                            blo.classList.add('color10');
                        }
                    })
                })
            }
            else{
                Pintados.push(posiciones[0],posiciones[1],posiciones[2],posiciones[3]);         
                clearInterval(juego);
            }
            detectorDePuntos();
        }, 100);
    }

    const intervalos = () =>{
        bloques();
        partida = setInterval(() => {
            filtrados(); 
            bloques();
            posicion = 0; 
            finalDelJuego();
        }, tiempo);
    }

    document.addEventListener('keyup' , (e)=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        if(e.key === 'ArrowRight' && (posiciones[1] - 9) % 10 !== 0 && (posiciones[3] - 9) % 10 !== 0 && (posiciones[2] - 9) % 10 !== 0 && (posiciones[0] - 9) % 10 !== 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[1] + 1) && !Pintados.includes(posiciones[2] + 1) && !Pintados.includes(posiciones[3] + 1)){
            for(let i = 0 ; i < 4; i++){
                posiciones[i] += 1;
            }
        }
        else if(e.key === 'ArrowLeft' && posiciones[0] % 10 !== 0 && posiciones[2] % 10 !== 0 && posiciones[1] % 10 !== 0 && posiciones[3] % 10 !== 0 && !Pintados.includes(posiciones[0] - 1) && !Pintados.includes(posiciones[1] - 1) && !Pintados.includes(posiciones[2] - 1) && !Pintados.includes(posiciones[3] - 1)){
            for(let i = 0 ; i < 4; i++){
                    posiciones[i] -= 1;
            }
        }
        else if(e.key === 'ArrowDown' && posiciones[0] + 10 < 240 && posiciones[1] + 10 < 240 && posiciones[2] + 10 < 240 && posiciones[3] + 10 < 240 && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[1] + 10) && !Pintados.includes(posiciones[2] + 10) && !Pintados.includes(posiciones[3] + 10)){
            for(let i = 0 ; i < 4; i++){
                posiciones[i] += 10;
            }
        }else if(e.key === 'ArrowUp' && evento === 1){
            if(posicion === 0 && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[0] + 20) && !Pintados.includes(posiciones[0] + 30) && !Pintados.includes(posiciones[0])){
                posiciones[1] = posiciones[0] + 10;
                posiciones[2] = posiciones[0] + 20;
                posiciones[3] = posiciones[0] + 30;
                posicion += 1;
            }else if(posicion === 1 && (posiciones[0] + 1) % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2) && !Pintados.includes(posiciones[0] + 3) && !Pintados.includes(posiciones[0])){
                posiciones[0] -= 3;
                posiciones[1] = posiciones[0] + 1;
                posiciones[2] = posiciones[0] + 2;
                posiciones[3] = posiciones[0] + 3;
                posicion -= 1;
            }else if(posicion === 1 && (posiciones[0] + 2) % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2) && !Pintados.includes(posiciones[0] + 3) && !Pintados.includes(posiciones[0])){
                posiciones[0] -= 2;
                posiciones[1] = posiciones[0] + 1;
                posiciones[2] = posiciones[0] + 2;
                posiciones[3] = posiciones[0] + 3;
                posicion -= 1;
            }else if(posicion === 1 && (posiciones[0] + 3) % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2) && !Pintados.includes(posiciones[0] + 3) && !Pintados.includes(posiciones[0])){
                posiciones[0] -= 1;
                posiciones[1] = posiciones[0] + 1;
                posiciones[2] = posiciones[0] + 2;
                posiciones[3] = posiciones[0] + 3;
                posicion -= 1;
            }else if(posicion === 1 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2) && !Pintados.includes(posiciones[0] + 3) && !Pintados.includes(posiciones[0])){
                posiciones[1] = posiciones[0] + 1;
                posiciones[2] = posiciones[0] + 2;
                posiciones[3] = posiciones[0] + 3;
                posicion -= 1;
            }
        }else if(e.key === 'ArrowUp' && evento === 2){
            if(posicion === 0  && !Pintados.includes(posiciones[0] + 20)){
                posiciones[1] = posiciones[0] + 20;    
                posicion = 1;
            }else if(posicion === 1 && posiciones[2] % 10 === 0 && !Pintados.includes(posiciones[3] + 10) && !Pintados.includes(posiciones[3] + 1) && !Pintados.includes(posiciones[3] - 1)){
                posiciones[0] = posiciones[3] - 1;
                posiciones[1] = posiciones[3] + 10;
                posiciones[2] = posiciones[3] + 1;
                posicion = 2;
            }else if(posicion === 1 && !Pintados.includes(posiciones[1] - 10) && !Pintados.includes(posiciones[1] - 9) && !Pintados.includes(posiciones[1] - 11)){
                posiciones[0] = posiciones[1] - 11;
                posiciones[3] = posiciones[1] - 10;
                posiciones[2] = posiciones[1] - 9;
                posicion = 2;
            }else if(posicion === 2 && !Pintados.includes(posiciones[0] - 9 && !Pintados.includes(posiciones[0] + 1))){
                posiciones[3] = posiciones[0] - 9;
                posiciones[2] = posiciones[0] + 1;
                posicion = 3;
            }else if(posicion === 3  && (posiciones[2] + 1) % 10 === 0 && !Pintados.includes(posiciones[2] - 11) && !Pintados.includes(posiciones[2] - 1) && !Pintados.includes(posiciones[2] - 2) && !Pintados.includes(posiciones[2])){
                posiciones[0] = posiciones[2] - 11;
                posiciones[2] -= 1;
                posiciones[1] = posiciones[2] - 1;
                posiciones[3] = posiciones[2] + 1;
                posicion = 0;
            }else if(posicion === 3  && posiciones[0] === posiciones[2] - 1 && !Pintados.includes(posiciones[2] - 10) && !Pintados.includes(posiciones[2] + 1) && !Pintados.includes(posiciones[2] - 1) && !Pintados.includes(posiciones[2])){
                posicion = 0;
                posiciones[0] = posiciones[2] - 10;
                posiciones[1] = posiciones[2] - 1;
                posiciones[3] = posiciones[2] + 1;
            }
        }else if(e.key === 'ArrowUp' && evento === 3){
            if(posicion === 0 && !Pintados.includes(posiciones[3] + 11) && !Pintados.includes(posiciones[3] + 1)){
                posicion = 1;
                posiciones[1] = posiciones[3] + 11;
                posiciones[2] = posiciones[3] + 1;
            }
            else if(posicion === 1 &&  posiciones[3] % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2) && !Pintados.includes(posiciones[2]) && !Pintados.includes(posiciones[3])){
                posicion = 0;
                posiciones[0] += 1;
                posiciones[1] = posiciones[0] + 1;
                [posiciones[3] , posiciones[2]] = [posiciones[2] , posiciones[3]]
            }else if(posicion === 1 && posiciones[0] !== (posiciones[1] - 1) && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[3] - 1)){
                posicion = 0;
                posiciones[1] = posiciones[0] + 1;
                posiciones[2] = posiciones[3] - 1;
            }
            
        }else if(e.key === 'ArrowUp' && evento === 4){
            if(posicion === 0 && !Pintados.includes(posiciones[3] - 10) && !Pintados.includes(posiciones[2] + 10)){
                posicion = 1;
                posiciones[0] = posiciones[3] - 10;
                posiciones[1] = posiciones[2] + 10;
            }else if(posicion === 1 && posiciones[2] % 10 === 0 && !Pintados.includes(posiciones[3] + 1) && !Pintados.includes(posiciones[3]) && !Pintados.includes(posiciones[3] - 11) && !Pintados.includes(posiciones[3]) - 10){
                posicion = 0;
                posiciones[3] += 1;
                posiciones[2] = posiciones[3] - 1;
                posiciones[0] = posiciones[3] - 12;
                posiciones[1] = posiciones[3] - 11;
            }else if(posicion === 1 && posiciones[0] !== (posiciones[1] - 1) && !Pintados.includes(posiciones[2] - 10) && !Pintados.includes(posiciones[2] - 11)){
                posicion = 0;
                posiciones[1] = posiciones[2] - 10;
                posiciones[0] = posiciones[2] - 11;
            }
        }else if(e.key === 'ArrowUp' && evento === 5){
            if(posicion === 0 && !Pintados.includes(posiciones[1] + 10) && !Pintados.includes(posiciones[1] + 20)){
                    posicion = 1;
                    posiciones[2] = posiciones[1] + 10;
                    posiciones[3] = posiciones[1] + 20;
            }else if(posicion === 1 && posiciones[0] % 10 === 0 &&!Pintados.includes(posiciones[1] + 1) && !Pintados.includes(posiciones[1] + 11) &&!Pintados.includes(posiciones[1] + 10) && !Pintados.includes(posiciones[1] + 9) ){
                posicion = 2;
                posiciones[1] += 1;
                posiciones[2] = posiciones[1] + 10;
                posiciones[0] = posiciones[1] + 9;
                posiciones[3] = posiciones[1] + 8;
            }else if(posicion === 1 && !Pintados.includes(posiciones[2] - 1) && !Pintados.includes(posiciones[2] - 2) ){
                posicion = 2;
                posiciones[0] = posiciones[2] - 1;
                posiciones[3] = posiciones[2] - 2;
            }else if(posicion === 2 && (posiciones[1] + 1) % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] - 20) && !Pintados.includes(posiciones[0]) && !Pintados.includes(posiciones[0] - 10)){
                posicion = 3;
                posiciones[0] += 1;
                posiciones[3] = posiciones[0] - 21;
                posiciones[1] = posiciones[0] - 11;
                posiciones[2] = posiciones[0] - 1;
            }else if(posicion === 2 && !Pintados.includes(posiciones[2] + 1) && !Pintados.includes(posiciones[2] - 20)){
                posicion = 3;
                posiciones[0] = posiciones[2] + 1;
                posiciones[3] = posiciones[2] - 20;
            }else if(posicion === 3 && (posiciones[1]) % 10 === 0 && !Pintados.includes(posiciones[1] + 9) && !Pintados.includes(posiciones[1] - 1) && !Pintados.includes(posiciones[1] + 1) && posiciones[2] === posiciones[0] - 1){
                posicion = 0
                posiciones[1] += 1;
                posiciones[0] = posiciones[1] - 1;
                posiciones[3] = posiciones[1] + 9;
                posiciones[2] = posiciones[1] + 1;
            }else if(posicion === 3 && (posiciones[1] + 1) % 10 === 0 && (posiciones[1] - 1) % 10 === 0  && !Pintados.includes(posiciones[1] + 9) && !Pintados.includes(posiciones[1] - 1) && !Pintados.includes(posiciones[1] + 1)){
                posicion = 0;
                posiciones[3] = posiciones[1] + 9;
                posiciones[0] = posiciones[1] - 1;
                posiciones[2] = posiciones[1] + 1;
            }else if(posicion === 3 && posiciones[2] === posiciones[0] - 1 && !Pintados.includes(posiciones[2] + 8) && !Pintados.includes(posiciones[2] - 1) && !Pintados.includes(posiciones[2] - 2)){
                posicion = 0;
                posiciones[3] = posiciones[2]  + 8;
                posiciones[0] = posiciones[2] - 2;
                posiciones[1] = posiciones[2] - 1;
            }
        }else if(e.key === 'ArrowUp' && evento === 6){
            if(posicion === 0 && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[0] + 20)){
                posicion = 1;
                posiciones[2] = posiciones[0] + 10;
                posiciones[3] = posiciones[0] + 20;
            }else if(posicion === 1 && (posiciones[0] + 2) % 10 === 0 && !Pintados.includes(posiciones[0] -1) && !Pintados.includes(posiciones[0] + 9) && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[0] + 11)){
                posicion = 2;
                posiciones[0] -= 1;
                posiciones[2] = posiciones[0] + 10;
                posiciones[1] = posiciones[0] + 11;
                posiciones[3] = posiciones[0] + 12;
            }else if(posicion === 1 && !Pintados.includes(posiciones[2] + 1) && !Pintados.includes(posiciones[2] + 2)){
                posicion = 2;
                posiciones[1] = posiciones[2] + 1;
                posiciones[3] = posiciones[2] + 2;
            }
            else if(posicion === 2 && posiciones[0] % 10 === 0 && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 11) && !Pintados.includes(posiciones[0] + 21) && !Pintados.includes(posiciones[0] + 20)){
                posicion = 3;
                posiciones[0] += 1;
                posiciones[2] = posiciones[0] + 10;
                posiciones[1] = posiciones[0] + 20;
                posiciones[3] = posiciones[0] + 19; 
            }else if(posicion === 2 && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[0] + 19) && !Pintados.includes(posiciones[0] + 20)){
                posicion = 3;
                posiciones[2] = posiciones[0] + 10;
                posiciones[1] = posiciones[0] + 20;
                posiciones[3] = posiciones[0] + 19; 
            }        
            else if(posicion === 3 && posiciones[0] + 10 === posiciones[2] && (posiciones[1] + 1) % 10 === 0 && !Pintados.includes(posiciones[0] + 10) && !Pintados.includes(posiciones[0] - 1) && !Pintados.includes(posiciones[0]) && !Pintados.includes(posiciones[0] - 2)){
                posicion = 0;
                posiciones[0] -= 2;
                posiciones[3] = posiciones[0]  + 12;
                posiciones[2] = posiciones[0] + 2;
                posiciones[1] = posiciones[0] + 1;
            }else if(posicion === 3 && posiciones[0] + 10 === posiciones[2] && (posiciones[1] + 2) % 10 === 0 && !Pintados.includes(posiciones[0] + 11) && !Pintados.includes(posiciones[0]) && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] - 1)){
                posicion = 0;
                posiciones[0] -= 1;
                posiciones[3] = posiciones[0]  + 12;
                posiciones[2] = posiciones[0] + 2;
                posiciones[1] = posiciones[0] + 1;
            }else if(posicion === 3 && !Pintados.includes(posiciones[0] + 12) && !Pintados.includes(posiciones[0] + 1) && !Pintados.includes(posiciones[0] + 2)){
                posicion = 0;
                posiciones[3] = posiciones[0]  + 12;
                posiciones[2] = posiciones[0] + 2;
                posiciones[1] = posiciones[0] + 1; 
            }
        }
    })

    return (
        <div className="container d-flex justify-content-center" style={{height: '100vh', width: '100vw', flexDirection: 'column',}}>
            <Link to="/main" className="badge text-wrap position-absolute formaDeFlecha top-0 start-0 m-3 border border-dark" style={{backgroundColor: "rgb(100 100 100", textDecoration: 'none' , color: 'white'}}><p className="mt-3">Volver</p></Link>
            <div className='d-flex row position-absolute bottom-0 start-50 translate-middle-x' style={{height: '99vh', width: '400px'}}>
                <Tablero puntos={puntos} numeros={RetornoApantalla} className="col-2"/>
                <div id="tetris" className="col-9 d-flex align-items-center" style={{flexDirection: 'column'}}>
                    <div className="d-flex justify-content-around" style={{height: '8vh' , width: '300px' , borderTop: '1px solid black' , borderRight: '1px solid black' , borderLeft: '1px solid black'}}>
                        <button id="btnStart" type="button" className="btn btn-danger mt-2" style={{height: '70%',}} onClick={e => {e.preventDefault(); intervalos()}}>Start</button>
                        <h1>TETRIS</h1>
                    </div>
                    <div id="grilla" className="row border border-dark d-flex " style={{height: '90vh'}}>
                    {grilla.map((n , i) => (
                        Pintados.includes(i) ? 
                        <div id={i} key={i} className="border color10" style={{width: '10%', height:'4%'}}></div>
                        :
                        <div id={i} key={i} className="border" style={{width: '10%', height:'4%'}}></div>
                    ))}
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Juego