import { UserEntity } from '../lib/entity/user.entity';
import { Repository, getRepository } from 'typeorm';

export default new (class UsersService {
    readonly userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = getRepository(UserEntity);
    }

    public async findById(id: string): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .where({
                id
            })
            .getOne();
    }

    public async create(user: UserEntity): Promise<void> {
        await this.userRepository.save(user);
    }

    public async getUserByRefershToken(
        refreshToken: string
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select('user.refreshToken')
            .where({ refreshToken })
            .getOne();
    }
})();
