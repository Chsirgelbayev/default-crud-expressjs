import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ExpressRequest } from 'src/common/express-request.interface';
import { UnauthorizedException } from '../common/exceptions/unauthorized.exception';
import config from '../lib/configuration/jwt/config';
import { JwtPayloadInterface } from './jwt-payload.interface';

export const checkJwt = (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
) => {
    const cookToken = req.cookies.accessToken;
    const headToken = req.get('Authorization');
    let token: string;

    if (!headToken?.startsWith('Bearer')) {
        token = headToken?.split(' ')[1];
    }

    if (cookToken) {
        token = cookToken;
    }

    if (!token) {
        throw new UnauthorizedException('Пользователь не авторизован');
    }

    try {
        req.user = jwt.verify(
            token,
            config.accessToken.secret
        ) as JwtPayloadInterface;

        next();
    } catch (e) {
        throw new UnauthorizedException('Пользователь не авторизован');
    }
};
