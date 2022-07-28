import axios from 'axios';
import {useEffect, useState} from 'react';
// import { useNavigate , Link } from 'react-router-dom';

// import { Link } from "react-router-dom";

// const URI = "http://192.168.0.108:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";

const Clasificaciones = () =>{
    const [usuarios , setUsuarios] = useState([]);

    useEffect(()=>{
        setUsuario();
    })

    const setUsuario = async () =>{
        const pun = await axios.get(URI)
        setUsuarios((pun.data).sort((a , b) => b.puntuacionMax - a.puntuacionMax));
    }

    return (
        <div className="d-flex align-items-center flex-column justify-content-center" style={{height: "100vh" , width: "100vw"}}>
            <table className='table' style={{width: "50%" , overflowx: "hidden" , overflowy: "auto" , maxHeight: "500px"}}>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>   
                                <th>Puntcion Maxima</th>
                                <th>Puesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((item , i) => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.puntuacionMax}</td>
                                    <td>{i + 1}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
        </div>
    )
}

export default Clasificaciones;