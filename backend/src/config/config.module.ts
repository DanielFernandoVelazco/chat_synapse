import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm.config';
import { JwtConfigService } from './jwt.config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [TypeOrmConfigService, JwtConfigService],
    exports: [TypeOrmConfigService, JwtConfigService],
})
export class ConfigModule {}
