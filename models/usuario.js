const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Usuario = db.define('Usuario',{
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
       // require:[true,'la contraseña es obligatoria']
    }
});

module.exports = Usuario;