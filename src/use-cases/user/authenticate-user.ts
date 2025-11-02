import type { UserRepository } from "@/repositories/user-repository.ts";
import type { ICrypto } from "@/shared/cryptography/crypto-interface.ts";
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials-error.ts";
import { NotFoundError } from "@/shared/errors/not-foud-error.ts";

type InputDto = {
  email: string;
  password: string;
};

type OutputDto = {
  id: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private crypto: ICrypto
  ) {}
  async execute({ email, password }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError();
    }

    const isSamePassword = await this.crypto.compare(password, user.password);

    if (!isSamePassword) {
      throw new InvalidCredentialsError();
    }

    return {
      id: user.id.toString(),
    };
  }
}
