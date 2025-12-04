import { makeOrganization } from "@/test/factories/make-organization.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryOrganizationRepository } from "@/test/in-memory-repositories/in-memory-organization-repository.ts";
import { EditOrganizationUseCase } from "./edit-organization-use-case.ts";

let inMemoryOrganizationRepository: InMemoryOrganizationRepository;
let editOrganizationUseCase: EditOrganizationUseCase;

describe("Edit Organization (Use Case)", () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
    editOrganizationUseCase = new EditOrganizationUseCase(
      inMemoryOrganizationRepository
    );
  });

  it("Should be able to edit organization", async () => {
    const user = makeUser();
    const organization = makeOrganization({ userId: user.id });

    inMemoryOrganizationRepository.items.push(organization);

    const organizationId = organization.id.toString();
    const userId = user.id.toString();

    await editOrganizationUseCase.execute({
      name: "new organization",
      organizationId,
      userId,
    });

    expect(inMemoryOrganizationRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "new organization",
      })
    );
  });
});
