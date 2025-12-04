import {
  Organization,
  type OrganizationProps,
} from "@/entities/organization.ts";
import { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export const makeOrganization = (
  organizationProps: Partial<OrganizationProps> = {},
  id?: UniqueEntityId
): Organization => {
  const organization = Organization.create(
    {
      name: "organization - a",
      userId: new UniqueEntityId(),
      ...organizationProps,
    },
    id
  );
  return organization;
};
