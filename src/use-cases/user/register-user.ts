import bcrypt from "bcryptjs";
import { User } from "../../entities/user.ts";
import type { UserRepository } from "../../repositories/user-repository.ts";
import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error.ts";

type UseCaseInput = {
  email: string;
  password: string;
  username: string;
};

type UseCaseOutput = {
  id: string;
};

const SALT = 8;

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
    username,
  }: UseCaseInput): Promise<UseCaseOutput> {
    const existsUserSameEmail = await this.userRepository.findByEmail(email);

    if (existsUserSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(password, SALT);

    const user = User.create({
      email,
      password: passwordHash,
      username,
    });

    await this.userRepository.create(user);

    return {
      id: user.id.toString(),
    };
  }
}
