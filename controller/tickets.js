const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticket');


const getTickets = async(req, res = response) =>{

    const tickets = await Ticket.findAll();

    res.json({tickets});

}

const postTicket = async(req, res = response) => {

   
    const {titulo,descripcion,estatus} = req.body;

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

        const token = req.header('Authorization');
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario_id = uid;

        await ticket.update({titulo,descripcion,estatus,usuario_id});

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
    postTicket,
    putTicket,
    deleteTicket}