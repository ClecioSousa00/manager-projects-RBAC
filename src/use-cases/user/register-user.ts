import { User } from "../../entities/user.ts";
import type { UserRepository } from "../../repositories/user-repository.ts";

type UseCaseInput = {
  email: string;
  password: string;
  username: string;
};

type UseCaseOutput = {
  id: string;
};

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
    username,
  }: UseCaseInput): Promise<UseCaseOutput> {
    const user = User.create({
      email,
      password,
      username,
    });

    await this.userRepository.create(user);

    return {
      id: user.id.toString(),
    };
  }
}
