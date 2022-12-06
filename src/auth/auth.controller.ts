import { NextFunction, Request, Response } from 'express';
import { ExpressRequest } from 'src/common/express-request.interface';
import { HttpStatus } from '../common/http-status.enum';
import { asyncWrapper } from '../utils/async-wrapper';
import authService from './auth.service';

export default new (class AuthController {
    public signUp = asyncWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            const { accessToken, refreshToken, cookieSettings, user } =
                await authService.signUp(req.body);

            res
                .cookie('accessToken', accessToken, cookieSettings)
                .cookie('refreshToken', refreshToken, cookieSettings)
                .status(HttpStatus.CREATED)
                .json({ accessToken, refreshToken, user });
        }
    );

    public signIn = asyncWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            const { accessToken, refreshToken, cookieSettings, user } =
                await authService.signIn(req.body);

            res
                .cookie('accessToken', accessToken, cookieSettings)
                .cookie('refreshToken', refreshToken, cookieSettings)
                .status(HttpStatus.CREATED)
                .json({ accessToken, refreshToken, user });
        }
    );

    public refresh = asyncWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            const { accessToken, refreshToken, cookieSettings, user } =
                await authService.refresh(req.cookies.refreshToken);

            res
                .cookie('accessToken', accessToken, cookieSettings)
                .cookie('refreshToken', refreshToken, cookieSettings)
                .status(HttpStatus.CREATED)
                .json({ accessToken, refreshToken, user });
        }
    );

    public info = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            res.status(HttpStatus.OK).json({ user: req.user });
        }
    );

    public logout = asyncWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            res.clearCookie('refreshToken').status(HttpStatus.OK).end();
        }
    );
})();
