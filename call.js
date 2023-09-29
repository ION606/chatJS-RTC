const express = require('express');
const turn = require('node-turn');

const app = express();
const server = require('http').createServer(app);


const config = {
    "listeningPort": 4000,
    // "relayIps": ["127.0.0.1"],
    "useUdp": false,
    "useTcp": true
  }
  
// Create and configure the STUN server
const turnServer = new turn({
    authMech: 'none',
    debugLevel: 'DEBUG',
    // listeningIps: ['0.0.0.0'],
    config
});


// Attach the STUN server to the Express.js server
turnServer.start();
turnServer.on('listening', () => {
    console.log('STUN server is running on port', turnServer.listeningPort);
});


turnServer.on('connection', async (connection) => {
    console.log(connection);
})

turnServer.on('error', async (err) => {
    console.log(err);
})

// Your Express.js routes and other application logic

// Start the Express.js server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
