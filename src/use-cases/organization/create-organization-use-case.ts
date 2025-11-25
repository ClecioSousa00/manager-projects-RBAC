import { Organization } from "@/entities/organization.ts";
import type { OrganizationRepository } from "@/repositories/organization-repository.ts";
import type { UserRepository } from "@/repositories/user-repository.ts";
import { NotFoundError } from "@/shared/errors/not-found-error.ts";

type InputDto = {
  name: string;
  userId: string;
};

type OutputDto = {
  id: string;
};

export class CreateOrganizationUseCase {
  constructor(
    private userRepository: UserRepository,
    private organizationRepository: OrganizationRepository
  ) {}

  async execute({ name, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    const organization = Organization.create({ name, userId: user.id });

    await this.organizationRepository.create(organization);

    return {
      id: organization.id.toString(),
    };
  }
}
