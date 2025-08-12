import { IsUUID, IsNotEmpty, IsArray, ArrayMinSize, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateChatDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsUUID('4', { each: true })
    participantIds: string[]; // IDs de los usuarios en el chat

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string; // Nombre del chat si es grupal

    @IsOptional()
    @IsBoolean()
    isGroup?: boolean = false;
}
