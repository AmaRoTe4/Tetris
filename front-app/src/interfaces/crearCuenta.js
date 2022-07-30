import axios from 'axios';
import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';


// const URI = "http://192.168.0.112:8000/Usuarios/";
const URI = "http://localhost:8000/Usuarios/";
let turno = 0;

const Crear = () => {
    const navigate = useNavigate();
    const [datosUsuarios, setDatosUsuarios] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
    const [indentificador , setIndentificador] = useState(['color2', 'color2' , 'color2']);
    const expresionDeNombre = /[^a-z0-9]/id;

    useEffect(() => {
        getNombresUsuarios();
    }, [])

    const crearCuenta = async (e) =>{
        // e.preventDefault()
        axios.post(URI , {nombre: nombre , contrasenia: md5(contrasenia) , puntuacionMax: 0});
        navigate('/');
    }
    const getNombresUsuarios = async () => {
        const res = await axios.get(URI);
        setDatosUsuarios(res.data);
    }
    const crearSesion = (e) =>{
        let aux = datosUsuarios.filter(n => n.nombre === nombre);
        let aux2 = nombre.match(expresionDeNombre)
        let aux3 = contrasenia.match(expresionDeNombre)
        if(aux[0] === undefined && aux3 === null && contrasenia === confirmarContrasenia && aux2 === null && contrasenia.length >= 4 && nombre.length >= 4){
            crearCuenta();
        }else if(aux[0] !== undefined){
            alert('error: el nombre ya esta ocupado');
            setIndentificador(['color1', 'color2' , 'color2']);
        }else if(aux2 !== null){
            alert('error: el nombre es invalido porque tiene caracteres que no son numeros o letras');
            setIndentificador(['color1', 'color2' , 'color2']);
        }else if(aux3 !== null){
            alert('error: la contraseña es invalido porque tiene caracteres que no son numeros o letras');
            setIndentificador(['color2', 'color1' , 'color2']);
        }else if(contrasenia !== confirmarContrasenia){
            alert('error: las contraseñas no son iguales');
            setIndentificador(['color2', 'color2' , 'color1']);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{height: "100vh" , width: "100vw"}}>
            <div style={{height: "280px" , width: "260px"}}>
            <form className="d-flex justify-content-center flex-column" onSubmit={ev => {ev.preventDefault(); crearSesion()}}>
                <label className="m-2">
                    nombre:<br />
                    <span className={`${indentificador[0]} ; m-1`}  onClick={() => alert("Nombre Usuario ocupado o no disponible , recuerda que el nombre tiene un limite de 30 caracteres los cuales tienen que ser numeros y letras solamente")}><i className="fa-solid fa-ban"></i></span>
                    <input type="text" autoComplete="off"  name="nombre" minLength={4} maxLength={30} style={{width: "90%"}} value={nombre} onChange={n => {n.preventDefault(); setNombre(n.target.value)}}/>
                </label>
                <label className="m-2">
                    contrasña:<br />
                    <span className={`${indentificador[1]} ; m-1`} onClick={() => alert("Contraseña incorrecto")}><i className="fa-solid fa-ban"></i></span>
                    <input type={turno % 2 === 0 ? 'password' : 'text'} autoComplete="off" minLength={4} maxLength={20} name="nombre" style={{width: "80%"}} value={contrasenia} onChange={n => {n.preventDefault(); setContrasenia(n.target.value)}}/>
                    <button className="d-inline-flex justify-content-center ms-1" type="button" style={{width: "8%"}} onClick={n => {n.preventDefault() ; turno++}}><i className="fa-solid fa-eye"></i></button>
                </label>
                <label className="m-2">
                    Confirmar contrasña:<br />
                    <span className={`${indentificador[2]} ; m-1`} onClick={() => alert("las Contraseña no son iguales")}><i className="fa-solid fa-ban"></i></span>
                    <input type={turno % 2 === 0 ? 'password' : 'text'} autoComplete="off" minLength={4} maxLength={20} name="nombre" style={{width: "80%"}} value={confirmarContrasenia} onChange={n => {n.preventDefault(); setConfirmarContrasenia(n.target.value)}}/>
                    <button className="d-inline-flex justify-content-center ms-1" type="button" style={{width: "8%"}} onClick={n => {n.preventDefault() ; turno++}}><i className="fa-solid fa-eye"></i></button>
                </label>
                <button type="submit" className="mt-2">Crear</button>
                </form>
            </div>
        </div>
    )
}

export default Crear