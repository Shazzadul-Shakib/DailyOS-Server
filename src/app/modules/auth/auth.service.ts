import { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../config/db';
import AppError from '../../errors/appError';
import { comparePassword } from '../user/utils/hashPassword';
import httpStatus from 'http-status';
import { createToken } from './utils/token';

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
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect Password');
  }

  const { password: pass, ...rest } = isUserExist;

  const userToken = createToken(rest);

  return {
    userToken,
    user: rest,
  };
};

export const AuthService = {
  credentialsLogin,
};
