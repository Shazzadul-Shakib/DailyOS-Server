import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { Router } from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '../../../generated/prisma/enums';

export const userRouter: Router = express.Router();

userRouter.get('/', checkAuth(Role.ADMIN), userController.getAllUsers);

userRouter.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  userController.registerUser
);
