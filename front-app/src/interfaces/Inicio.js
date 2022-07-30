import axios from 'axios';
import {useState , useEffect} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import md5 from 'md5';

// const URI = "http://192.168.0.112:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";
let turno = 0;

const Inicio = () =>{
    const navigate = useNavigate();
    const [datosUsuarios, setDatosUsuarios] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [indentificador , setIndentificador] = useState(['color2', 'color2']);

    useEffect(() => {
        getNombresUsuarios();
    }, [])

    const getNombresUsuarios = async () => {
        const res = await axios.get(URI);
        setDatosUsuarios(res.data);
    }

    const iniciarSesion = (e) =>{
        let aux = datosUsuarios.filter(n => n.nombre === nombre);
        if(aux[0] !== undefined && aux[0].contrasenia === md5(contrasenia)){
            window.localStorage.setItem(1 , aux[0].id)
            navigate('/Main');
        }else if(aux[0] === undefined){
            setIndentificador(['color1' , 'color2'])
            const link = document.getElementById('link');
            link.classList.remove('opacidad');
        }else if(aux[0].contrasenia !== md5(contrasenia)){
            setIndentificador(['color2' , 'color1'])
        }
        // console.log(aux);
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{height: "100vh" , width: "100vw"}}>
            <div className="border " style={{height: "200px" , width: "260px"}}>
            <form className="d-flex justify-content-center flex-column" onSubmit={ev => {ev.preventDefault(); iniciarSesion()}}>
                <label className="m-2">
                    nombre:<br />
                    <span className={`${indentificador[0]} ; m-1`}  onClick={() => alert("Usuario incorrecto o inexistente")}><i className="fa-solid fa-ban"></i></span>
                    <input type="text" autoComplete="off"  name="nombre" maxLength={30} style={{width: "90%"}} value={nombre} onChange={n => {n.preventDefault(); setNombre(n.target.value)}}/>
                </label>
                <label className="m-2">
                    contrasña:<br />
                    <span className={`${indentificador[1]} ; m-1`} onClick={() => alert("Contraseña incorrecto")}><i className="fa-solid fa-ban"></i></span>
                    <input type={turno % 2 === 0 ? 'password' : 'text'} autoComplete="off" maxLength={20} name="nombre" style={{width: "80%"}} value={contrasenia} onChange={n => {n.preventDefault(); setContrasenia(n.target.value)}}/>
                    <button className="d-inline-flex justify-content-center ms-1" type="button" style={{width: "8%"}} onClick={n => {n.preventDefault() ; turno++}}><i className="fa-solid fa-eye"></i></button>
                </label>
                <button type="submit" className="mt-2">Iniciar</button>
                </form>
            </div>
            <Link id="link" to="/CrearCuenta" className='mt-2 links opacidad'>Crear una cuenta</Link>
        </div>
    )
}

export default Inicio;