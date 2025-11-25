import type { Organization } from "@/entities/organization.ts";
import type { OrganizationRepository } from "@/repositories/organization-repository.ts";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  items: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }
}
