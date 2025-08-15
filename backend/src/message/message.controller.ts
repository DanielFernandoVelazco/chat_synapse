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
} 