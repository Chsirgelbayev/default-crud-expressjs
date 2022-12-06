import dotenv from 'dotenv';
import { logger } from '../../../utils/logger';
import { ConnectionOptions, Connection, createConnection } from 'typeorm';
dotenv.config();

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME || 'root',
    password: process.env.TYPEORM_PASSWORD || 'password',
    database: process.env.TYPEORM_DATABASE || 'users',
    connectTimeout: 100000,
    synchronize: true,
    entities: [
        'src/lib/entity/user.entity.ts',
        'src/lib/entity/file.entity.ts'
    ],
    logging: process.env.TYPEORM_LOGGING
        ? JSON.parse(process.env.TYPEORM_LOGGING)
        : true
};

export const TypeOrmCreateConnection = async (): Promise<Connection | null> => {
    try {
        const conn = await createConnection(config);
        logger.info(
            `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`
        );
    } catch (err) {
        logger.error(err);
    }
    return;
};
