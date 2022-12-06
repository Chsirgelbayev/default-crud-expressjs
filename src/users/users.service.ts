import { UserEntity } from '../lib/entity/user.entity';
import { getRepository } from 'typeorm';

export default new (class UsersService {
    public async findById(id: string): Promise<UserEntity> {
        const userRepository = getRepository(UserEntity);

        return await userRepository
            .createQueryBuilder('user')
            .where({
                id
            })
            .getOne();
    }

    public async create(user: UserEntity): Promise<void> {
        const userRepository = getRepository(UserEntity);
        await userRepository.save(user);
    }

    public async getUserByRefershToken(
        refreshToken: string
    ): Promise<UserEntity> {
        const userRepository = getRepository(UserEntity);

        return await userRepository
            .createQueryBuilder('user')
            .select('user.refreshToken')
            .where({ refreshToken })
            .getOne();
    }
})();
