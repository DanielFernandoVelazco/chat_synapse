import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly messageService: MessageService) { }

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    private users = new Map<number, string>(); // userId -> socketId

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, payload: { receiverId: number; text?: string; audioUrl?: string; }): Promise<void> {
        const senderId = [...this.users.entries()].find(([key, val]) => val === client.id)?.[0];
        if (!senderId) return;

        const messageData = {
            senderId: senderId,
            receiverId: payload.receiverId,
            text: payload.text,
            audioUrl: payload.audioUrl,
        }

        const savedMessage = await this.messageService.createMessage(messageData);

        const receiverSocketId = this.users.get(payload.receiverId);
        if (receiverSocketId) {
            this.server.to(receiverSocketId).emit('receiveMessage', savedMessage);
        }
        // Opcional: enviar confirmación de vuelta al emisor
        client.emit('messageSent', savedMessage);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const userId = [...this.users.entries()].find(([key, val]) => val === client.id)?.[0];
        if (userId) {
            this.users.delete(userId);
        }
    }

    handleConnection(client: Socket, ...args: any[]) {
        const userId = Number(client.handshake.query.userId);
        if (userId) {
            this.logger.log(`Client connected: ${client.id} with userId: ${userId}`);
            this.users.set(userId, client.id);
        } else {
            this.logger.log(`Client connected without userId: ${client.id}`);
            client.disconnect();
        }
    }
}