
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server, } from 'socket.io';


@WebSocketGateway({ namespace: '/' })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private activeSockets = []
  private users = new Map()


  @SubscribeMessage('msgToServer')
  handleMessage(socket: Socket, payload: string): WsResponse<string> {
    // this.server.emit('msgToClient', payload);
    return { event: "msgToClient", data: payload }
  }


  @SubscribeMessage('CURRENT_USER')
  handleAnotherMessage(socket: Socket, payload: string): WsResponse<string> {
    console.log("🚀 ~ file: socket.gateway.ts ~ line 33 ~ SocketGateway ~ handleAnotherMessage ~ payload", payload)
    // this.server.emit('msgToClient', payload);
    return { event: "CURRENT_USER", data: payload }
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Init....');
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(socket: Socket, ...args: any[]) {

    console.log("ME NOW: ", socket.id)



    socket.on('chat-message', (payload: { from: string, name: string, message: string }) => {
      console.log("message -> payload", payload)
      const otherUser = this.users.get(payload.name)
      if (otherUser) {
        otherUser.emit('chat-message', payload);
      } else {
        socket.emit('user-status',"User offline")
      }
    });



  }


}