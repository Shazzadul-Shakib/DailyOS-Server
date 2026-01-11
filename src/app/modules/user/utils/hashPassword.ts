import bcrypt from 'bcryptjs';
import { envConfig } from '../../../config';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(Number(envConfig.salt));
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  password: string,
  isUserPassword: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, isUserPassword);

  return compare;
}
