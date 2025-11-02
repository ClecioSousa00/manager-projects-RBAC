import type { ICrypto } from "@/shared/cryptography/crypto-interface.ts";
import { User } from "../../entities/user.ts";
import type { UserRepository } from "../../repositories/user-repository.ts";
import { UserAlreadyExistsError } from "../../shared/errors/user-already-exists-error.ts";

type InputDto = {
  email: string;
  password: string;
  username: string;
};

type OutputDto = {
  id: string;
};

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private crypto: ICrypto
  ) {}

  async execute({ email, password, username }: InputDto): Promise<OutputDto> {
    const existsUserSameEmail = await this.userRepository.findByEmail(email);

    if (existsUserSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await this.crypto.hash(password);

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
