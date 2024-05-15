import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

/**
 * This class defines the ChatGateway, which serves as a real-time communication channel for clients.
 * It utilizes the WebSocket protocol to establish two-way communication between the server and connected clients.
 */
@WebSocketGateway(8001, { cors: '*' }) // Set up WebSocket Gateway on port 8001 with CORS enabled
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name); // Create a logger instance for this gateway

  /**
   * Server instance obtained from the WebSocket library (Socket.IO).
   * This property will be injected by NestJS and used for broadcasting messages to connected clients.
   */
  @WebSocketServer() io: Server;

  /**
   * Lifecycle hook called after the gateway is initialized.
   * Logs a message indicating successful initialization.
   */
  afterInit() {
    this.logger.log('Initialized');
  }

  /**
   * Lifecycle hook called when a client connects to the gateway.
   * Logs the client's ID and the total number of connected clients.
   * @param client The Socket.IO client object representing the connected client.
   * @param args Additional arguments passed to the handler (not used in this case).
   */
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets; // Get the connected socket instances

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  /**
   * Lifecycle hook called when a client disconnects from the gateway.
   * Logs the client's ID that disconnected.
   * @param client The Socket.IO client object representing the disconnected client.
   */
  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  /**
   * Message handler for the 'ping' event received from clients.
   * Logs the message and its payload, then broadcasts a 'pong' event with the received data.
   * @param client The Socket.IO client object representing the sender of the message.
   * @param data The data payload received from the client (any type).
   */
  @SubscribeMessage('ping')
  handleMessage(client: any, data: any) {
    console.log(`Message received from client id: ${client.id}`);
    console.log(`Payload: ${data}`);
    this.io.emit('pong', data); // Broadcast a 'pong' event with the received data
  }
}
