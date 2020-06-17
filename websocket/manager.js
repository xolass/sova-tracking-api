import getSocket from './helpers';

export const socketSendInfo = (socketId, message, description) => {
  const socket = getSocket(socketId);

  socket.emit('info', {
    message,
    description,
  });
};

export const socketSendError = (socketId, message, description) => {
  const socket = getSocket(socketId);

  socket.emit('fail', {
    message,
    description,
  });
};
