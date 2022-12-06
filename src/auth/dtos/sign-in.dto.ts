import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    public readonly id: string;

    @IsNotEmpty()
    @IsString()
    public readonly password: string;
}
