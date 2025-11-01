import type { User } from "../entities/user.ts";

export interface UserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
