import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    getProfile(@GetUser() user: User) {
        // Retorna el usuario autenticado (sin el hash de la contraseña)
        const { password, ...result } = user;
        return result;
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        const users = await this.usersService.findAllUsers();
        // Excluir contraseñas de la respuesta
        return users.map(user => {
            const { password, ...rest } = user;
            return rest;
        });
    }
}