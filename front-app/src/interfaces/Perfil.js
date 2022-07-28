import axios from 'axios';
import {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

// const URI = "http://192.168.0.110:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";
//ver el error de inicio.
//porque esta aregado pero hasta ahi nomas

const Perfil = () =>{

    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{height: "100vh" , width: "100vw"}}>
            <Link to="/main" className="position-absolute top-0 start-0 m-3 border border-dark" style={{backgroundColor: "rgb(100 100 100" , borderRadius: '5%' , textDecoration: 'none' , color: 'white'}}>Volver</Link>
            <div className="border border-dark" style={{height: "500px" , width: "400px"}}>
                <div className="border" style={{height: "37.5%" , width: "100%"}}>
                    <div className="border m-3" style={{height: "150px" , width: "150px" , backgroundColor: "black"}}></div>
                </div>
                <div className="border d-flex flex-column justify-content-center" style={{height: "62.5%" , width: "100%"}}>
                    <p className="mb-3 text-center" style={{fontSize: '25px'}}>Id: {}</p>
                    <p className="mt-3 mb-3 text-center" style={{fontSize: '25px'}}>Nombre: {}</p>
                    <p className="mt-3 text-center" style={{fontSize: '25px'}}>Puntuacion Maxima: {}</p> 
                </div>
            </div>
        </div>
    )
}

export default Perfil;