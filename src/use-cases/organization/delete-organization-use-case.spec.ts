import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";
import { makeOrganization } from "@/test/factories/make-organization.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryOrganizationRepository } from "@/test/in-memory-repositories/in-memory-organization-repository.ts";
import { DeleteOrganizationUseCase } from "./delete-organization-use-case.ts";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let deleteOrganizationUseCase: DeleteOrganizationUseCase;

describe("Delete Organization (Use Case)", () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    deleteOrganizationUseCase = new DeleteOrganizationUseCase(
      inMemoryOrganizationRepository
    );
  });

  it("Should be able to delete a organization", async () => {
    const user = makeUser();
    const organization = makeOrganization({ userId: user.id });

    inMemoryOrganizationRepository.items.push(organization);

    const organizationId = organization.id.toString();
    const userId = user.id.toString();

    await deleteOrganizationUseCase.execute({ organizationId, userId });

    expect(inMemoryOrganizationRepository.items).toHaveLength(0);
  });
  it("Should not be able to delete a organization if difference user", async () => {
    const organization = makeOrganization();

    inMemoryOrganizationRepository.items.push(organization);

    const organizationId = organization.id.toString();

    await expect(() =>
      deleteOrganizationUseCase.execute({
        organizationId,
        userId: "fake-user-id",
      })
    ).rejects.toBeInstanceOf(PermissionDeniedError);
  });
});
