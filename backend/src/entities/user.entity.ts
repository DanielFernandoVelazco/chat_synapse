import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'https://via.placeholder.com/150' }) // URL de imagen de perfil predeterminada
    profilePicture: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Message, message => message.sender)
    messages: Message[];

    @ManyToMany(() => Chat, chat => chat.users)
    chats: Chat[];
}
