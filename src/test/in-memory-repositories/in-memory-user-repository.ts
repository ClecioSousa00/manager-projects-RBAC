import type { User } from "../../entities/user.ts";
import type { UserRepository } from "../../repositories/user-repository.ts";

export class InMemoryUserRepository implements UserRepository {
  items: User[] = [];
  async create(user: User) {
    this.items.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    return user ?? null;
  }
  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id);
    return user ?? null;
  }
}
