import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import { setCookie } from './utils/setCookie';
import httpStatus from 'http-status';
import { envConfig } from '../../config';

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.credentialsLogin(req.body);

  setCookie(res, result.userToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login Successfull',
    data: result,
  });
});

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
    message: 'Your are Logged Out',
    data: null,
  });
});

export const AuthController = {
  credentialsLogin,
  logout,
};
