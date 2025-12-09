import type { Organization } from "@/entities/organization.ts";

export interface OrganizationRepository {
  create(organization: Organization): Promise<void>;
  findById(id: string): Promise<Organization | null>;
  update(organization: Organization): Promise<void>;
  delete(id: string): Promise<void>;
}
