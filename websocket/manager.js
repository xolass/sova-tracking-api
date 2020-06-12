import { getSocket } from './socketManager';

export const socketSendInfo = (socketId, message, description) => {
  const socket = getSocket(socketId);

  socket.emit('info', {
    message,
    description,
  });
};

export const socketSendError = (socketId, message, description) => {
  const socket = getSocket(socketId);

  socket.emit('error', { // change, error is a reserved word
    message,
    description,
  });
};
