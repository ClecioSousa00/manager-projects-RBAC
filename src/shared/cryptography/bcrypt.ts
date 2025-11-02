import bcrypt from "bcryptjs";
import type { ICrypto } from "./crypto-interface.ts";

const SALT = 10;
export class Bcrypt implements ICrypto {
  async hash(plain: string): Promise<string> {
    const passwordHash = await bcrypt.hash(plain, SALT);
    return passwordHash;
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
