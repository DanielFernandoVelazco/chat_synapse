import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Chat } from './chat.entity';

export enum MessageType {
    TEXT = 'text',
    VOICE = 'voice',
}

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string; // Contenido del mensaje de texto o URL del archivo de voz

    @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
    type: MessageType;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @Column()
    senderId: string;

    @ManyToOne(() => Chat, chat => chat.messages)
    @JoinColumn({ name: 'chatId' })
    chat: Chat;

    @Column()
    chatId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
