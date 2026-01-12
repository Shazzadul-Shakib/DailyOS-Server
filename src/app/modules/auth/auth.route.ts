import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRouter: Router = Router();

authRouter.post('/login', AuthController.credentialsLogin);
authRouter.post('/logout', AuthController.logout);
