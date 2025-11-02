import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error.ts";
import { MockBcrypt } from "@/test/cryptography/mock-bcrypt.ts";
import { InMemoryUserRepository } from "../../test/in-memory-repositories/in-memory-user-repository.ts";
import { RegisterUserUseCase } from "./register-user.ts";

let inMemoryUserRepository: InMemoryUserRepository;
let mockBcrypt: MockBcrypt;
let registerUserUseCase: RegisterUserUseCase;

describe("Register User (Use Case)", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    mockBcrypt = new MockBcrypt();
    registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      mockBcrypt
    );
  });
  it("Should create new user", async () => {
    const { id } = await registerUserUseCase.execute({
      email: "johnDoe@gmail.com",
      password: "12345678",
      username: "John Doe",
    });

    expect(id).toBeTypeOf("string");
  });
  it("Should not be able create a new user if same email exists", async () => {
    await registerUserUseCase.execute({
      email: "johnDoe@gmail.com",
      password: "12345678",
      username: "John Doe",
    });

    await expect(() =>
      registerUserUseCase.execute({
        email: "johnDoe@gmail.com",
        password: "12345678",
        username: "John Doe",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
