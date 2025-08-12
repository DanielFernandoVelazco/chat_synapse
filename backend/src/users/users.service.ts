import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(registerDto: RegisterUserDto): Promise<User> {
        const newUser = this.usersRepository.create(registerDto);
        return this.usersRepository.save(newUser);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findUsersByIds(ids: string[]): Promise<User[]> {
        return this.usersRepository.findByIds(ids);
    }

    async findAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }
}