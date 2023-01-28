import { Server as SocketServer } from 'socket.io'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env;

let io;
export const socketInit = (server) => {
  io = new SocketServer(server, {
    cors: '*'
  });

  io.on('connect', (client) => {
    try {
      const { authorization = '' } = client.handshake.headers;
      const { userId } = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET)
      console.log(`user_${userId}`, 3434444)
      client.join(`user_${userId}`);
    } catch (e) {
      console.log(e)
    }
  })
}


export const socketEmit = (userId, event, message = {}) => {
  io.to(`user_${userId}`).emit(event, message)
}
