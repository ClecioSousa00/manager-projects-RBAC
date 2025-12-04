import type { OrganizationRepository } from "@/repositories/organization-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";
import { PermissionDeniedError } from "@/shared/errors/permission-denied-error.ts";

type InputDto = {
  organizationId: string;
  userId: string;
  name?: string;
};

type OutputDto = {
  id: string;
};

export class EditOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    name,
    userId,
    organizationId: id,
  }: InputDto): Promise<OutputDto> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new NotFoundError();
    }

    const organizationId = organization.userId.toString();

    const isSameUser = organizationId === userId;

    if (!isSameUser) {
      throw new PermissionDeniedError();
    }

    if (name) {
      organization.changeName(name);
    }

    return {
      id: organizationId,
    };
  }
}
