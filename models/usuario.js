const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Usuario = db.define('Usuario',{
    usuario_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
       // require:[true,'la contraseña es obligatoria']
    }
});

module.exports = Usuario;