import bcrypt from 'bcryptjs';
import { config } from '../../../config';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(Number(config.salt));
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
