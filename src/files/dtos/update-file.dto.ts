import { IsNotEmpty } from "class-validator";

export class UpdateFileDto {
    @IsNotEmpty()
    public readonly originalname: string;
    @IsNotEmpty()
    public readonly mimetype: string;
    @IsNotEmpty()
    public readonly size: number;
}