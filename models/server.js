const db      = require('../db/connection');
const express = require('express');
const cors    = require('cors');



class Server{

   constructor(){
       this.app  = express();
       this.port = process.env.PORT;

       this.paths = {
        usuarios: '/api/usuarios',
        auth:     '/api/auth',
        tickets:  '/api/tickets',
       };

       this.connectDB();
       this.middlewares();
       this.routes();

   }

   async connectDB(){
     try {
        await db.authenticate();
     }catch(e){
        throw new Error('error en conectar BD');
     }
    }

    middlewares(){
         //Cors
         this.app.use(cors());
         //Lectura del body
         this.app.use(express.json());
         //Ver express levantado
         this.app.use(express.static('public'));

    }

    routes(){

        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.tickets,require('../routes/tickets'));


    }

    listen(){
        this.app.listen(this.port, ()=>{
                console.log('Servidor corriendo en el puerto ', this.port);
        })
    }


}


module.exports = Server;