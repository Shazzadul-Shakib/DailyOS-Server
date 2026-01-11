import { z } from 'zod';
import { AccounType } from './user.interface';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }),
    email: z.email({
      message: 'Email is required',
    }),
    password: z.string({
      message: 'Password is required',
    }),
    image: z.string().optional(),
    role: z.string().optional(),
    accountType: z
      .enum(Object.values(AccounType) as [AccounType, ...AccounType[]])
      .optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
