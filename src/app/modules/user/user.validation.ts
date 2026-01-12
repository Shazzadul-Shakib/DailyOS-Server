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

const credentialsLoginSchema = z.object({
  body: z.object({
    email: z.email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  credentialsLoginSchema,
};

export type TCredentialsLoginPayload = z.infer<typeof credentialsLoginSchema>['body'];
