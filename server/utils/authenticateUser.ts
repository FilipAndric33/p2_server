import { matchPassword } from '../config/bcryptConfig';

export async function authenticateUser(
  password: string,
  hashedPassword: string,
) {
  return await matchPassword(password, hashedPassword);
}
