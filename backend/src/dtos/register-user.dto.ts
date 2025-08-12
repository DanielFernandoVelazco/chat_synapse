import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
