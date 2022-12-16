import { EVENT_EMIT } from '../common/const/event-emit';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Orders } from '../orders/entities/orders.entity';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    client.emit('connection', 'Success connect to server');
  }
  updateStatus(payload: Orders) {
    this.server.emit(EVENT_EMIT.UPDATE_STATUS, payload);
  }
}
