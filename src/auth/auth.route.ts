import { Router } from 'express';
import { checkJwt } from '../jwt/check-jwt.middleware';
import authController from './auth.controller';

const route = Router();

route.post('/signup', authController.signUp);
route.post('/signin', authController.signIn);
route.post('/signin/new_token', authController.refresh);
route.get('/info', checkJwt, authController.info);
route.get('/logout', checkJwt, authController.logout);

export default route;
