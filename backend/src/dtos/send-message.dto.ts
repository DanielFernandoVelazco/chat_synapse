import { IsUUID, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { MessageType } from '../entities/message.entity';

export class SendMessageDto {
    @IsUUID()
    chatId: string;

    @IsNotEmpty()
    @IsString()
    content: string; // Mensaje de texto o URL del archivo de voz

    @IsEnum(MessageType)
    @IsOptional()
    type: MessageType = MessageType.TEXT; // 'text' o 'voice'
}
