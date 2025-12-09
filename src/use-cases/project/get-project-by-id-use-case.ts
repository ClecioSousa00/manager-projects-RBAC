import type { ProjectRepository } from "@/repositories/project-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";

type InputDto = {
  userId: string;
  projectId: string;
};

type OutputDto = {
  id: string;
  name: string;
};

export class GetProjectByIdUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({ projectId, userId }: InputDto): Promise<OutputDto> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundError();
    }

    const isSameUser = project.userId.toString() === userId;

    if (!isSameUser) {
      throw new PermissionDeniedError();
    }

    return {
      id: project.id.toString(),
      name: project.name,
    };
  }
}
