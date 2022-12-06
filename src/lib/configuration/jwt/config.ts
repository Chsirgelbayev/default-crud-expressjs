import dotenv from 'dotenv';
dotenv.config();

export default {
    accessToken: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'lol',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES
            ? process.env.JWT_ACCESS_TOKEN_EXPIRES
            : '15m'
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'lol',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES
            ? process.env.JWT_REFRESH_TOKEN_EXPIRES
            : '30d'
    },
    cookieExpire: process.env.JWT_COOKIE_EXPIRE
};
