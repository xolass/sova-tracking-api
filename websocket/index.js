import io from 'socket.io';
import http from 'http';
import express from 'express';

const wsApp = express();
const server = http.createServer(wsApp);

const wsPort = process.env.WSPORT || 6970;

server.listen(wsPort, () => {
  console.log(`listening on socket(${wsPort})`);
});

const socketIO = io(server);

socketIO.on('connection', (socket) => {

  console.log(`Uma conexão foi estabelecida. ID: ${socket.id}`);

  setTimeout(function() {

    socket.emit('welcome', { server: 'Bem vindo ao servidor SOVA!'});

    socket.on('disconnect', () => console.log(`Uma conexão foi interrompida. ID: ${socket.id}`))
    
    socket.on('location', (data) => { console.log(data) })

 }, 4000);
})

export default socketIO;
