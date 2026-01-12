import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { userService } from './user.service';
import { IUser } from './user.interface';
import { Request, Response } from 'express';
import { setCookie } from './utils/setCookie';
import { envConfig } from '../../config';
import { TCredentialsLoginPayload, UserValidation } from './user.validation';

// ----- Register a new user ----- //
const registerUser = catchAsync(async (req, res) => {
  const user: IUser = req.body;
  const result = await userService.registerUser(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//--------------- LOGIN -------------------//
const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const credentialUser: TCredentialsLoginPayload = req.body;
  const result = await userService.credentialsLogin(credentialUser);

  setCookie(res, result.userToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login Successfull',
    data: result,
  });
});

//--------------- LOGOUT -------------------//
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false,
    sameSite: envConfig.node_env === 'production' ? 'none' : 'lax',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: envConfig.node_env === 'production' ? 'none' : 'lax',
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Logged Out Successfully',
    data: null,
  });
});

export const userController = {
  registerUser,
  credentialsLogin,
  logout,
};
