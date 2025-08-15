import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message]), UsersModule],
    providers: [ChatGateway, ChatService],
    exports: [ChatService], // Para que otros módulos puedan usar ChatService
})
export class ChatModule { }