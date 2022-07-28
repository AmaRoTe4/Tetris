import UsuariosModel from '../models/models.js';

export const getAllUsuarios = async (req, res) => {
    try{
        const modelos = await UsuariosModel.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: error.message});
    }
}

export const getUsuarios = async (req, res) => {
    try{
        const modelos = await UsuariosModel.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: error.message});
    }
}

export const updateUsuarios = async (req, res) => {
    try{
        await UsuariosModel.update(req.body ,{
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: error.message});
    }
}

export const createUsuarios = async (req, res) => {
    try{
        await UsuariosModel.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: error.message});
    }
}