import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Get, Param, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post('upload-audio')
    @UseInterceptors(
        FileInterceptor('audio', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    uploadAudio(@UploadedFile() file: Express.Multer.File) {
        // Retornamos la URL relativa para el cliente
        return { url: `/uploads/${file.filename}` };
    }

    @Get(':userId')
    getMessages(@Req() req, @Param('userId') otherUserId: string) {
        const currentUserId = req.user.userId;
        return this.messageService.getMessages(currentUserId, +otherUserId);
    }
} ```

#### **`backend / src / message / message.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { In, Repository } from 'typeorm';
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