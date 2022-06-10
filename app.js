require('dotenv').config();
const Server = require('./models/server');
require('./associations');
//dotenv.config();

const server = new Server();


server.listen();
