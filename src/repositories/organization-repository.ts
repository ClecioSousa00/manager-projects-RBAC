import type { Organization } from "@/entities/organization.ts";

export interface OrganizationRepository {
  create(organization: Organization): Promise<void>;
}
