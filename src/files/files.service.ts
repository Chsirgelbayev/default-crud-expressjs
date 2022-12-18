import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository, getRepository, getManager } from 'typeorm';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { FileEntity } from '../lib/entity/file.entity';
import { UploadFileDto } from './dtos/upload-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';

export default new (class FilesService {
    public async upload(uploadFileDto: UploadFileDto): Promise<FileEntity> {
        const errors = await validate(
            plainToClass(UploadFileDto, uploadFileDto)
        );

        if (errors.length > 0) {
            throw new BadRequestException(...errors);
        }
        const fileRepository = getRepository(FileEntity);
        return fileRepository.save(uploadFileDto);
    }

    public async list(paginationDto: PaginationDto): Promise<FileEntity[]> {
        const fileRepository = getRepository(FileEntity);
        return await fileRepository
            .createQueryBuilder('file')
            .take(paginationDto.list_size)
            .skip(--paginationDto.page)
            .getMany();
    }

    public async get(id: string): Promise<FileEntity> {
        const fileRepository = getRepository(FileEntity);
        const file = await fileRepository
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
        const fileRepository = getRepository(FileEntity);

        const file = await fileRepository.findOne({
            where: {
                id: Number(id)
            }
        });

        if (!file) {
            throw new NotFoundException('Файл не найден');
        }

        return await fileRepository.save({
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
        const fileRepository = getRepository(FileEntity);

        const file = await fileRepository.findOne({
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
