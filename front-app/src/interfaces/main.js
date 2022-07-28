// import axios from 'axios';
// import {useState , useEffect} from 'react';
// import { useNavigate , Link } from 'react-router-dom';

import { Link } from "react-router-dom";

// const URI = "http://192.168.0.108:8000/Usuarios/";
// const URI = "http://localhost:8000/Usuarios/";

const Main = () =>{

    // console.log(window.localStorage.getItem(1))

    return (
        <div className="d-flex align-items-center flex-column" style={{height: "100vh" , width: "100vw"}}>
            <p style={{fontSize: "100px" , letterSpacing:'15px'}}>Tetris</p>
            <div className="d-flex flex-column" style={{height: "350px" , width: "250px"}}>
                <Link style={{width: "100%" , height: '25%' , fontSize: '30px' , backgroundColor: 'rgb(200 , 200, 200)'}}className="links mt-2 border border-dark d-flex align-items-center justify-content-center" to="/Tetris">Jugar</Link>
                <Link style={{width: "100%" , height: '25%' , fontSize: '30px' , backgroundColor: 'rgb(200 , 200, 200)'}}className="links mt-2 border border-dark d-flex align-items-center justify-content-center" to="/Clasificaciones">Clasificaciones</Link>
                <Link style={{width: "100%" , height: '25%' , fontSize: '30px' , backgroundColor: 'rgb(200 , 200, 200)'}}className="links mt-2 border border-dark d-flex align-items-center justify-content-center" to="Perfil">Mi Perfil</Link>
                <Link style={{width: "100%" , height: '25%' , fontSize: '30px' , backgroundColor: 'rgb(200 , 200, 200)'}}className="links mt-2 border border-dark d-flex align-items-center justify-content-center" to="/">Salir</Link>
            </div>
        </div>
    )
}

export default Main;