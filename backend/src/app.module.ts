import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { FilesModule } from './files/files.module';
import { User } from './entities/user.entity';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
                          username: process.env.DB_USERNAME,
                          password: process.env.DB_PASSWORD,
                          database: process.env.DB_NAME,
                          entities: [User, Chat, Message],
                          synchronize: true, // ¡Solo usar en desarrollo! En producción, usa migraciones.
                          logging: false,
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
