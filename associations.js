const Ticket = require('./models/ticket');
const Usuario = require('./models/usuario');

Usuario.hasMany(Ticket);

Ticket.belongsTo(Usuario);  