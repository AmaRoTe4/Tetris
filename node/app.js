import express from "express";
import cors from "cors";
import db from './database/db.js'
import route from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/Usuarios' , route);

try{
    await db.authenticate();
    console.log("anda un masa");
}catch(error){
    console.log(error);
}

app.get('/', (req, res)=>{
   res.send("hola")
})

app.listen(8000 , ()=>{
    console.log('Server running at http://localhost:8000/');
})