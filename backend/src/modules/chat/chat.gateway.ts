import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
  }
 
  @SubscribeMessage('chat message')
handleMessage(@MessageBody() message: string): void {
  this.server.emit('chat message', message);
}

  @SubscribeMessage('move')
  handleMove(@MessageBody() move: { from: string, to: string }): void {
    console.log('Move received:', move);
    this.server.emit('move', move);
  }
}