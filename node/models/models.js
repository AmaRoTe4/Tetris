import db from '../database/db.js'
import { DataTypes } from 'sequelize';

const UsuariosModel = db.define('Usuarios',{
    nombre: {type: DataTypes.STRING },
    contrasenia: {type: DataTypes.STRING },
    puntuacionMax: {type: DataTypes.INTEGER },
})

export default UsuariosModel;