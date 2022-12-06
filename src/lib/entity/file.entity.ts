import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    // Название файла
    @Column()
    originalname: string;
    // Расширение
    @Column()
    mimetype: string;
    // Размер
    @Column()
    size: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
