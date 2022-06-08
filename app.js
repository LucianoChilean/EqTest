require('dotenv').config();
const Server = require('./models/server');
//dotenv.config();

const server = new Server();


server.listen();