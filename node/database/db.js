import { Sequelize } from 'sequelize';

const db = new Sequelize('Tetris' , 'root' , '', {
    // host: '192.168.0.112',
    host: 'localhost',
    dialect: 'mysql',
})

export default db;