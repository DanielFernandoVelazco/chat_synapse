import { User } from '../../user/entity/user.entity';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    text: string;

    @Column({ nullable: true })
    audioUrl: string;

    @ManyToOne(() => User, (user) => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages)
    receiver: User;

    @CreateDateColumn()
    createdAt: Date;
}