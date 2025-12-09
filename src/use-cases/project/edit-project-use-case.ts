import type { ProjectRepository } from "@/repositories/project-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";

type InputDto = {
  projectId: string;
  userId: string;
  name?: string;
};

type OutputDto = {
  id: string;
};

export class EditProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({ name, userId, projectId: id }: InputDto): Promise<OutputDto> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundError();
    }

    const projectId = project.userId.toString();

    const isSameUser = projectId === userId;

    if (!isSameUser) {
      throw new PermissionDeniedError();
    }

    if (name) {
      project.changeName(name);
    }

    return {
      id: projectId,
    };
  }
}
