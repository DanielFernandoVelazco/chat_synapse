export class CreateMessageDto {
    senderId: number;
    receiverId: number;
    text?: string;
    audioUrl?: string;
}