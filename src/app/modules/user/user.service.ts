import { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../config/db';
import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import { comparePassword, hashPassword } from './utils/hashPassword';
import httpStatus from 'http-status';
import { createToken } from './utils/token';

// ----- Register a new user ----- //
const registerUser = async (user: IUser) => {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await hashPassword(user.password),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return result;
};

const credentialsLogin = async (payload: Prisma.UserWhereUniqueInput) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exists");
  }

  const isPasswordMatched = await comparePassword(
    password as string,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not matched');
  }

  const { password: pass, ...rest } = isUserExist;

  const userToken = createToken(rest);

  return {
    userToken,
    user: rest,
  };
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
};

export const userService = {
  registerUser,
  credentialsLogin,
  getAllUsers,
};
