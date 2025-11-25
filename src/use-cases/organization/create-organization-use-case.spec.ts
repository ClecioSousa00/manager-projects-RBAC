import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryOrganizationRepository } from "@/test/in-memory-repositories/in-memory-organization-repository.ts";
import { InMemoryUserRepository } from "@/test/in-memory-repositories/in-memory-user-repository.ts";
import { CreateOrganizationUseCase } from "./create-organization-use-case.ts";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let createOrganizationUseCase: CreateOrganizationUseCase;

describe("Create Organization (Use Case)", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    createOrganizationUseCase = new CreateOrganizationUseCase(
      inMemoryUserRepository,
      inMemoryOrganizationRepository
    );
  });

  it("Should be able of create a organization", async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const { id } = await createOrganizationUseCase.execute({
      name: "organization A",
      userId: user.id.toString(),
    });

    expect(id).toBeTypeOf("string");
    expect(inMemoryOrganizationRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "organization A",
      })
    );
  });
});
