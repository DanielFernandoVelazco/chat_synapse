import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return this.userService.findById(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        // Devuelve todos los usuarios excepto el actual
        return this.userService.findAllExcept(req.user.userId);
    }
}