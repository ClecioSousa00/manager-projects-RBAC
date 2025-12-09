import type { OrganizationRepository } from "@/repositories/organization-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";

type InputDto = {
  organizationId: string;
  userId: string;
};

type OutputDto = {};

//TODO: olhar o inMemory, pois como podemos ter projetos dentro de organizações
// acho que tenho que por um construtor de projects nele, olhar novamente essa aula.

export class DeleteOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}
  async execute({ organizationId, userId }: InputDto): Promise<OutputDto> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new NotFoundError();
    }

    const isSameUser = organization.userId.toString() === userId;

    if (!isSameUser) {
      throw new PermissionDeniedError();
    }

    this.organizationRepository.delete(organizationId);

    return {};
  }
}
