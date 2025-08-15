import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';

@Module({
    imports: [AuthModule, UserModule, MessageModule],
    providers: [ChatGateway]
})
export class ChatModule { }
