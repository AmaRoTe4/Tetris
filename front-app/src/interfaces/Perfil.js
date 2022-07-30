import axios from 'axios';
import {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

// const URI = "http://192.168.0.112:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";
//ver el error de inicio.
//porque esta aregado pero hasta ahi nomas

const Perfil = () =>{
    const [usuario , setUsuario] = useState('');

    useEffect(() =>{
        cargadePerfil();
    })

    const cargadePerfil = async() =>{
        const numeroDeUsuario = localStorage.getItem(1) 
        const pun = await axios.get(URI + '/' + numeroDeUsuario)
        setUsuario(pun.data);
    }

    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{height: "100vh" , width: "100vw"}}>
            <Link to="/main" className="badge text-wrap position-absolute formaDeFlecha top-0 start-0 m-3 border border-dark" style={{backgroundColor: "rgb(100 100 100", textDecoration: 'none' , color: 'white'}}><p className="mt-3">Volver</p></Link>
            <div className="border border-dark" style={{height: "500px" , width: "400px"}}>
                <div className="border" style={{height: "37.5%" , width: "100%"}}>
                    <div className="border m-3" style={{height: "150px" , width: "150px" , backgroundColor: "black"}}></div>
                </div>
                <div className="border d-flex flex-column justify-content-center" style={{height: "62.5%" , width: "100%"}}>
                   {usuario !== '' &&  <p className="mb-3 text-center" style={{fontSize: '25px'}}>Id: {usuario[0].id}</p>}
                    {usuario !== ''  && <p className="mt-3 mb-3 text-center" style={{fontSize: '25px'}}>Nombre: {usuario[0].nombre}</p> }
                    {usuario !== ''  && <p className="mt-3 text-center" style={{fontSize: '25px'}}>Puntuacion Maxima: {usuario[0].puntuacionMax}</p> } 
                </div>
            </div>
        </div>
    )
}

export default Perfil;