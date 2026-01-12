import { Prisma } from '../../../../generated/prisma/client';
import { envConfig } from '../../../config';
import { generateToken } from './jwt';

export const createToken = (user: Partial<Prisma.UserWhereUniqueInput>) => {
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload as unknown as string,
    envConfig.jwt.jwt_access_secret as string,
    envConfig.jwt.jwt_access_expires as string
  );

  const refreshToken = generateToken(
    jwtPayload as unknown as string,
    envConfig.jwt.jwt_refresh_secret as string,
    envConfig.jwt.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
