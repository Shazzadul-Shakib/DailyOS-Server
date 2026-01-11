import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import status from 'http-status';
import { userService } from './user.service';
import { IUser } from './user.interface';
import { Request, Response } from 'express';

// ----- Register a new user ----- //
const registerUser = catchAsync(async (req, res) => {
  const user: IUser = req.body;
  const result = await userService.registerUser(user);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const userController = {
  registerUser,
  getAllUsers,
};
