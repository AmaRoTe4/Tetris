import {getAllUsuarios , getUsuarios ,createUsuarios , updateUsuarios} from '../controles/controles.js'
import express  from 'express'

const router = express.Router()

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarios);
router.post('/', createUsuarios);
router.put('/:id', updateUsuarios);

export default router;