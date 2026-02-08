import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryProjectRepository } from "@/test/in-memory-repositories/in-memory-project-repository.ts";
import { InMemoryUserRepository } from "@/test/in-memory-repositories/in-memory-user-repository.ts";
import { CreateProjectUseCase } from "./create-project-use-case.ts";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryProjectRepository: InMemoryProjectRepository;
let createProjectUseCase: CreateProjectUseCase;

describe("Create Project (Use Case)", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository();
    createProjectUseCase = new CreateProjectUseCase(
      inMemoryUserRepository,
      inMemoryProjectRepository,
    );
  });

  it("Should be able of create a project", async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const { id } = await createProjectUseCase.execute({
      name: "project A",
      userId: user.id.toString(),
    });

    expect(id).toBeTypeOf("string");
    expect(inMemoryProjectRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "project A",
      }),
    );
  });

  it("Should not be able of create a project if not exists user", async () => {
    await expect(() =>
      createProjectUseCase.execute({
        name: "project A",
        userId: "fake-user-id",
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
