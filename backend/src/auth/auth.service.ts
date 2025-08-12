import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterUserDto): Promise<{ accessToken: string }> {
        const { username, email, password } = registerDto;

        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Email already registered.');
        }
        const existingUsername = await this.usersService.findByUsername(username);
        if (existingUsername) {
            throw new BadRequestException('Username already taken.');
        }

        const user = await this.usersService.create(registerDto);
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUserById(userId: string): Promise<any> {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}