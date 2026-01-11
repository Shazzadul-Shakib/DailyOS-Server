import { prisma } from '../../config/db';
import { IUser } from './user.interface';
import { hashPassword } from './utils/hashPassword';

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

const getAllUsers = async () => {
  return await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
};

export const userService = {
  registerUser,
  getAllUsers,
};
