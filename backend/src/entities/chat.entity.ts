import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true }) // Para chats grupales, puede tener un nombre
    name: string;

    @Column({ default: false })
    isGroup: boolean;

    @ManyToMany(() => User, user => user.chats)
    @JoinTable()
    users: User[];

    @OneToMany(() => Message, message => message.chat)
    messages: Message[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
