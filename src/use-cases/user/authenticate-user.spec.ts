import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials-error.ts";
import { MockBcrypt } from "@/test/cryptography/mock-bcrypt.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryUserRepository } from "@/test/in-memory-repositories/in-memory-user-repository.ts";
import { AuthenticateUserUseCase } from "./authenticate-user.ts";

let inMemoryUseRepository: InMemoryUserRepository;
let mockBcrypt: MockBcrypt;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User (Use Case)", () => {
  beforeEach(() => {
    inMemoryUseRepository = new InMemoryUserRepository();
    mockBcrypt = new MockBcrypt();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUseRepository,
      mockBcrypt
    );
  });
  it("Should be able to authenticate a user", async () => {
    const user = makeUser({
      email: "userTest@gmail.com",
      password: await mockBcrypt.hash("12345678"),
    });
    inMemoryUseRepository.items.push(user);
    inMemoryUseRepository.items.push();
    const { id } = await authenticateUserUseCase.execute({
      email: "userTest@gmail.com",
      password: "12345678",
    });

    expect(id).toBeTypeOf("string");
    expect(inMemoryUseRepository.items[0].email).toBe("userTest@gmail.com");
  });
  it("Should not be able to authenticate a user with wrong password", async () => {
    const user = makeUser({
      email: "userTest@gmail.com",
      password: await mockBcrypt.hash("12345678"),
    });
    inMemoryUseRepository.items.push(user);
    inMemoryUseRepository.items.push();
    await expect(() =>
      authenticateUserUseCase.execute({
        email: "userTest@gmail.com",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
