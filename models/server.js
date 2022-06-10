const db      = require('../db/connection');
const express = require('express');
const cors    = require('cors');
const path    = require('path');
//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Test API",
            version: "1.0.0",
            contact:{
                email: "mattensohn64@gmail.com"
            }
        },
        servers:[{
            url:"http://localhost:8080"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    apis:[`${path.join(__dirname,"../routes/*.js")}`],
};

class Server{

   constructor(){
       this.app  = express();
       this.port = process.env.PORT;

       this.paths = {
        usuarios: '/api/usuarios',
        auth:     '/api/auth',
        tickets:  '/api/tickets',
        swagger:  '/api-doc'
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
        this.app.use(this.paths.swagger,swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


    }

    listen(){
        this.app.listen(this.port, ()=>{
                console.log('Servidor corriendo en el puerto ', this.port);
        })
    }


}


module.exports = Server;