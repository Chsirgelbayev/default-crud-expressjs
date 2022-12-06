import { UserEntity } from '../lib/entity/user.entity';
import { validate } from 'class-validator';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { UnauthorizedException } from '../common/exceptions/unauthorized.exception';
import jwtService from '../jwt/jwt.service';
import usersService from '../users/users.service';

export default new (class AuthService {
    public async signUp(signUpDto: SignUpDto) {
        const errors = await validate(plainToClass(SignUpDto, signUpDto));

        if (errors.length > 0) {
            throw new BadRequestException(...errors);
        }

        const user = await usersService.findById(signUpDto.id);

        if (user) {
            throw new BadRequestException('Пользователь уже существует');
        }

        const tokens = jwtService.generateTokens({ id: signUpDto.id });

        await usersService.create({
            ...signUpDto,
            refreshToken: tokens.refreshToken
        });

        return {
            ...tokens,
            user: signUpDto
        };
    }

    public async signIn(signInDto: SignInDto) {
        const errors = await validate(plainToClass(SignInDto, signInDto));

        if (errors.length > 0) {
            throw new BadRequestException(...errors);
        }
        const user = await usersService.findById(signInDto.id);

        if (!user) {
            throw new BadRequestException('Пользователь не существует');
        }

        if (user.password !== signInDto.password) {
            throw new UnauthorizedException('Неправильный пароль');
        }

        const tokens = jwtService.generateTokens({ id: signInDto.id });

        return {
            ...tokens,
            user: signInDto
        };
    }

    public async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }

        const verifiedUserByRefersh =
            jwtService.verifyRefreshToken(refreshToken);

        const FoundRefreshToken =
            usersService.getUserByRefershToken(refreshToken);

        if (!verifiedUserByRefersh && !FoundRefreshToken) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }

        const user = await usersService.findById(verifiedUserByRefersh.id);
        const tokens = jwtService.generateTokens({ id: user.id });

        return {
            ...tokens,
            user
        };
    }
})();
