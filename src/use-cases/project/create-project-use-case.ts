import { Project } from "@/entities/project.ts";
import type { ProjectRepository } from "@/repositories/project-repository.ts";
import type { UserRepository } from "@/repositories/user-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";

type InputDto = {
  name: string;
  userId: string;
};

type OutputDto = {
  id: string;
};

export class CreateProjectUseCase {
  constructor(
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute({ name, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    const project = Project.create({ name, userId: user.id });

    await this.projectRepository.create(project);

    return {
      id: project.id.toString(),
    };
  }
}
