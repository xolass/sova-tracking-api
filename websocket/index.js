import io from 'socket.io';
import http from 'http';
import express from 'express';

const wsApp = express();
const server = http.createServer(wsApp);

const wsPort = process.env.WSPORT || 6970;

server.listen(wsPort, () => {
  console.log(`listening on socket(${wsPort})`);
});

export default io(server);
