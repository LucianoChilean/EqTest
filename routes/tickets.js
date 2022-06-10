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
       deleteTicket, 
       getTicket} = require('../controller/tickets');

const router = Router();


/**
 *@swagger
 *components:
 *  schemas:
 *    tickets:
 *       type: object
 *       properties: 
 *          titulo:
 *            type: string
 *            descripcion: nombre del ticket
 *          descipcion:
 *            type: string
 *            descripcion: detalle del ticket
 *          estatus:
 *            type: string
 *            descripcion: estado en que se encuentra el ticket
 *       example:
 *          titulo: Primer ticket
 *          descripcion: ticket de prueba
 *          estatus: Pendiente
 */


/**
 *@swagger
 * /api/tickets:
 *   get:
 *      security: 
 *       - bearerAuth: []
 *      summary: Lista Tickets
 *      tags: [ticket]
 *      responses:
 *        200:
 *          description: Listado de tickets
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/tickets' 
 */
router.get('/',[validarJWT],getTickets);


/**
 *@swagger
 * /api/tickets/{id}:
 *   get:
 *      security: 
 *       - bearerAuth: []
 *      summary: Obtiene ticket
 *      tags: [ticket]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID Ticket
 *      responses:
 *        200:
 *          description: Obtiene Ticket
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/tickets' 
 *        404:
 *          description: Ticket not found
 */
 router.get('/:id',[validarJWT],getTicket);

/**
 *@swagger
 * /api/tickets:
 *   post:
 *      security: 
 *       - bearerAuth: []
 *      summary: Crea ticket
 *      tags: [ticket]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/tickets' 
 *      responses:
 *        200:
 *          description: nuevo ticket creado
 */
 router.post('/',[validarJWT],postTicket);

/**
 *@swagger
 * /api/tickets/{id}:
 *   put:
 *      security: 
 *       - bearerAuth: []
 *      summary: Actualiza ticket
 *      tags: [ticket]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID ticket
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/tickets' 
 *      responses:
 *        200:
 *          description: Ticket Actualizado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/tickets'   
 *        404:
 *          description: ticket not found
 */
router.put('/:id',[validarJWT],putTicket);

/**
 *@swagger
 * /api/tickets/{id}:
 *   delete:
 *      security: 
 *       - bearerAuth: []
 *      summary: Elimina Ticket
 *      tags: [ticket]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID ticket
 *      responses:
 *        200:
 *          description: ticket Eliminado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/tickets'
 */
router.delete('/:id',[validarJWT],deleteTicket);




module.exports = router;
