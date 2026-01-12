import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { Router } from 'express';

export const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  userController.registerUser
);
userRouter.post(
  '/login',
  validateRequest(UserValidation.credentialsLoginSchema),
  userController.credentialsLogin
);
userRouter.post('/logout', userController.logout);
