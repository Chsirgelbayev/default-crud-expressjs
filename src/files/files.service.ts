import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository, getRepository } from 'typeorm';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { FileEntity } from '../lib/entity/file.entity';
import { UploadFileDto } from './dtos/upload-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';

export default new (class FilesService {
    readonly fileRepository: Repository<FileEntity>;

    constructor() {
        this.fileRepository = getRepository(FileEntity);
    }

    public async upload(uploadFileDto: UploadFileDto): Promise<FileEntity> {
        const errors = await validate(
            plainToClass(UploadFileDto, uploadFileDto)
        );

        if (errors.length > 0) {
            throw new BadRequestException(...errors);
        }

        return this.fileRepository.save(uploadFileDto);
    }

    public async list(paginationDto: PaginationDto): Promise<FileEntity[]> {
        return await this.fileRepository
            .createQueryBuilder('file')
            .take(paginationDto.list_size)
            .skip(--paginationDto.page)
            .getMany();
    }

    public async get(id: string): Promise<FileEntity> {
        const file = await this.fileRepository
            .createQueryBuilder('file')
            .where({ id })
            .getOne();

        if (!file) {
            throw new NotFoundException('Файл не найден');
        }

        return file;
    }

    public async update(
        updateFileDto: UpdateFileDto,
        id: string
    ): Promise<FileEntity> {
        const file = await this.fileRepository.findOne({
            where: {
                id: Number(id)
            }
        });

        if (!file) {
            throw new NotFoundException('Файл не найден');
        }

        return await this.fileRepository.save({
            ...file,
            ...updateFileDto
        });
    }

    public async delete(id: string): Promise<void> {
        const fileRepository = getRepository(FileEntity);
        const file = await fileRepository.delete({ id: Number(id) });

        if (!file) {
            throw new NotFoundException('Файл не найден');
        }
    }

    public async download(id: string): Promise<string> {
        const file = await this.fileRepository.findOne({
            where: {
                id: Number(id)
            }
        });

        if (!file) {
            throw new NotFoundException('Файл не найден');
        }

        return file.originalname;
    }
})();
