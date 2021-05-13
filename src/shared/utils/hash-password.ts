import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(password, salt);
  }
  