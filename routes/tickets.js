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
const {getTickets,
       postTicket,
       putTicket,
       deleteTicket } = require('../controller/tickets');

const router = Router();


router.get('/',[validarJWT],getTickets);

router.put('/:id',[validarJWT],putTicket);

router.post('/',[validarJWT],postTicket);

router.delete('/:id',[validarJWT],deleteTicket);




module.exports = router;
