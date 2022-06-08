const { Router } = require('express');
const { check } = require('express-validator');
const { ValidarCampos } = require('../middlewares/validar-campos');
const {login} = require('../controller/login')

const router = Router();


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es oblitatoria').not().isEmpty(),
    ValidarCampos
], login);



module.exports = router;