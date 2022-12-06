import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public page: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public list_size: number;

    constructor(data: PaginationDto) {
        this.page = data.page || 1;
        this.list_size = data.list_size || 10;
    }
}
