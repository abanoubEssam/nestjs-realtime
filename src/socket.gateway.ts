import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  //  to send public message
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('SocketGateway');
  afterInit(server: Server) {
    this.logger.log('initialized');
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log('TCL: SocketGateway -> handleConnection -> args', ...args);
    this.logger.log(`client ${client.id} connected`);
    // throw new Error("Method not implemented.");
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client ${client.id} disconnected`);
    // throw new Error("Method not implemented.");
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('msgToClient', text);

    // start send public messages
    //  this.wss.emit('msgToClient', text);
    // end send public messages

    return { event: 'msgToClient', data: text };
  }
}