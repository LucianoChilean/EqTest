const { Router } = require('express');
const { check }  = require('express-validator');

//Obtiene los middlewares desde el archivo index en la carpeta misma
const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');

/*
const { 
        emailExiste,
        ExisteUsuarioPorId } = require('../helpers/db-validators');
*/
const {getUsuarios,
       postUsuario,
       putUsuario, 
       deleteUsuario } = require('../controller/usuarios');

const router = Router();


router.get('/',getUsuarios);

router.put('/:id',putUsuario);

router.post('/',postUsuario);

router.delete('/:id',[validarJWT],deleteUsuario);




module.exports = router;
