import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../common/exceptions/unauthorized.exception';
import config from '../lib/configuration/jwt/config';
import { JwtPayloadInterface } from './jwt-payload.interface';

export default new (class JwtService {
    public generateTokens(payload: JwtPayloadInterface) {
        const accessToken = jwt.sign(payload, config.accessToken.secret, {
            expiresIn: config.accessToken.expiresIn
        });

        const refreshToken = jwt.sign(payload, config.refreshToken.secret, {
            expiresIn: config.refreshToken.expiresIn
        });

        const cookieSettings = {
            expires: new Date(
                Date.now() + Number(config.cookieExpire) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        return {
            accessToken,
            refreshToken,
            cookieSettings
        };
    }

    public verifyRefreshToken(refreshToken: string): JwtPayloadInterface {
        try {
            return jwt.verify(
                refreshToken,
                config.refreshToken.secret
            ) as JwtPayloadInterface;
        } catch (e) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }
    }
})();
