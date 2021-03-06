const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Ticket = db.define('Ticket',{
    titulo:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    estatus:{
        type: DataTypes.BOOLEAN
    },
    UsuarioId:{
        type: DataTypes.BIGINT
    }
});

module.exports = Ticket;