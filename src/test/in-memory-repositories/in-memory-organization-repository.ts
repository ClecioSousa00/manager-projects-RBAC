import type { Organization } from "@/entities/organization.ts";
import type { OrganizationRepository } from "@/repositories/organization-repository.ts";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  items: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id.toString() === id);

    return organization ?? null;
  }
  async update(organization: Organization): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === organization.id.toString()
    );

    if (index !== -1) {
      this.items[index] = organization;
    }
  }
}
