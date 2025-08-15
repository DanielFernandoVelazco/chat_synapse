import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        private userService: UserService
    ) { }

    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const { senderId, receiverId, text, audioUrl } = createMessageDto;
        const sender = await this.userService.findById(senderId);
        const receiver = await this.userService.findById(receiverId);

        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }

        const message = this.messageRepository.create({
            text,
            audioUrl,
            sender,
            receiver,
        });

        return this.messageRepository.save(message);
    }

    async getMessages(userId1: number, userId2: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: [
                { sender: { id: userId1 }, receiver: { id: userId2 } },
                { sender: { id: userId2 }, receiver: { id: userId1 } },
            ],
            relations: ['sender', 'receiver'],
            order: { createdAt: 'ASC' },
        });
    }
}