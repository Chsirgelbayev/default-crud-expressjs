import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
    @IsNotEmpty()
    public readonly originalname: string;
    @IsNotEmpty()
    public readonly mimetype: string;
    @IsNotEmpty()
    public readonly size: number;
}
