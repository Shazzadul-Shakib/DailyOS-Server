export const Role = ['ADMIN', 'USER'] as const;
export type Role = (typeof Role)[number];
export const AccounType = ['PERSONAL', 'FAMILY'] as const;
export type AccounType = (typeof AccounType)[number];

export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: Role;
  accountType?: AccounType;
}
