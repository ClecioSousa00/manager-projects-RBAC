import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";
import { makeProject } from "@/test/factories/make-project.ts";
import { makeUser } from "@/test/factories/make-user.ts";
import { InMemoryProjectRepository } from "@/test/in-memory-repositories/in-memory-project-repository.ts";
import { EditProjectUseCase } from "./edit-project-use-case.ts";

let inMemoryProjectRepository: InMemoryProjectRepository;
let editProjectUseCase: EditProjectUseCase;

describe("Edit Project (Use Case)", () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    editProjectUseCase = new EditProjectUseCase(inMemoryProjectRepository);
  });

  it("Should be able to edit project", async () => {
    const user = makeUser();
    const project = makeProject({ userId: user.id });

    inMemoryProjectRepository.items.push(project);

    const projectId = project.id.toString();
    const userId = user.id.toString();

    await editProjectUseCase.execute({
      name: "new project",
      projectId,
      userId,
    });

    expect(inMemoryProjectRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "new project",
      })
    );
  });

  it("Should not be able to edit a project if difference user", async () => {
    const project = makeProject();
    inMemoryProjectRepository.items.push(project);
    const projectId = project.id.toString();

    await expect(() =>
      editProjectUseCase.execute({
        name: "new project",
        projectId,
        userId: "fake-user-id",
      })
    ).rejects.toBeInstanceOf(PermissionDeniedError);
  });
});
