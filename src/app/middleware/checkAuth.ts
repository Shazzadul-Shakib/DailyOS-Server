import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import { verifyToken } from '../modules/auth/utils/jwt';
import { envConfig } from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/db';

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;

      if (!token) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'No Token Recieved, You may need to log in.'
        );
      }

      const verifiedToken = verifyToken(
        token,
        envConfig.jwt.jwt_access_secret as string
      ) as JwtPayload;

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });

      if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User doesn't exists");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'Permission Denied. You are not authorized.'
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
