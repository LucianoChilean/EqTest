const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticket');
const Usuario = require('../models/usuario');



const getTickets = async(req, res = response) =>{

   
    const tickets = await Ticket.findAll({
        include:{
            model: Usuario,
            attributes:['email']
        }
    });

    res.json({tickets});

}

const getTicket = async(req, res = response) =>{

   
    const {id} = req.params;

    const ticket = await Ticket.findByPk(id);

    res.json({ticket});

}

const postTicket = async(req, res = response) => {

   
    const {titulo,descripcion,estatus = 'Pendiente'} = req.body;

    const ticket = Ticket.build({titulo,descripcion,estatus});


    await ticket.save();
    
    res.json({ticket})

}


const putTicket = async(req,res = response) => {

    const {id} = req.params;
    const {titulo,descripcion,estatus} = req.body;
 
    try{

        const ticket = await Ticket.findByPk(id);
        if(!ticket){
            return res.status(404).json({
                msg: `no existe un ticket con el id ${id}`
            })
        }

        var   auth       = req.header('Authorization');
        const TokenSplit = auth.split(" ");

   
        const token = (TokenSplit[0] === 'Bearer') ? TokenSplit[1] : auth;

        const {uid} = jwt.verify(token, 'test');
        const UsuarioId = uid;

        await ticket.update({titulo,descripcion,estatus,UsuarioId});

        res.json(ticket);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteTicket = async(req, res = response) =>{

    const {id} = req.params;

    const ticket = await Ticket.findByPk(id);
    if(!ticket){
        return res.status(404).json({
            msg: `no existe un ticket con el id ${id}`
        })
    }
    
    await ticket.destroy({
        where: {
           id : id
        }
    })

    res.json(ticket);


}

module.exports = {getTickets,
    getTicket,
    postTicket,
    putTicket,
    deleteTicket}