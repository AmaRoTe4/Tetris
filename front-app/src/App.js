import './App.css';
import Inicio from './interfaces/Inicio.js'
import Juego from './interfaces/juego.js'
import Crear from './interfaces/crearCuenta.js'
import Main from './interfaces/main.js'
import Clasificaciones from './interfaces/clasificaciones.js'
import Perfil from './interfaces/Perfil.js'
import { BrowserRouter , Route , Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Inicio /> } />
          <Route path='/Tetris' element={ <Juego /> } />
          <Route path='/CrearCuenta' element={ <Crear /> } />
          <Route path='/Main' element={ <Main /> } />
          <Route path='/Clasificaciones' element={ <Clasificaciones /> } />
          <Route path='/Main/Perfil' element={ <Perfil /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
