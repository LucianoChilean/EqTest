const Ticket = require('./ticket');
const Usuario = require('./usuario');

Ticket.belongsTo(Usuario,{ foreignKey : "usuario_id"});  
Usuario.hasMany(Ticket,{ foreignKey : "usuario_id"});