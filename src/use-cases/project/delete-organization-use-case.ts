import type { ProjectRepository } from "@/repositories/project-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";

type InputDto = {
  projectId: string;
  userId: string;
};

type OutputDto = {};

//TODO: olhar o inMemory, pois como podemos ter projetos dentro de organizações
// acho que tenho que por um construtor de projects nele, olhar novamente essa aula.

export class DeleteProjectUseCase {
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

    this.projectRepository.delete(projectId);

    return {};
  }
}
