import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";
import { makeProject } from "@/test/factories/make-project.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryProjectRepository } from "@/test/in-memory-repositories/in-memory-project-repository.ts";
import { DeleteProjectUseCase } from "./delete-organization-use-case.ts";

let inMemoryProjectRepository: InMemoryProjectRepository;
let deleteProjectUseCase: DeleteProjectUseCase;

describe("Delete Project (Use Case)", () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    deleteProjectUseCase = new DeleteProjectUseCase(inMemoryProjectRepository);
  });

  it("Should be able to delete a project", async () => {
    const user = makeUser();
    const project = makeProject({ userId: user.id });

    inMemoryProjectRepository.items.push(project);

    const projectId = project.id.toString();
    const userId = user.id.toString();

    await deleteProjectUseCase.execute({ projectId, userId });

    expect(inMemoryProjectRepository.items).toHaveLength(0);
  });
  it("Should not be able to delete a project if difference user", async () => {
    const project = makeProject();

    inMemoryProjectRepository.items.push(project);

    const projectId = project.id.toString();

    await expect(() =>
      deleteProjectUseCase.execute({
        projectId,
        userId: "fake-user-id",
      })
    ).rejects.toBeInstanceOf(PermissionDeniedError);
  });
});
