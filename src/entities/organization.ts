import { Entity } from "@/shared/entities/entity.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export type OrganizationProps = {
  userId: UniqueEntityId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Organization extends Entity<OrganizationProps> {
  static create(props: OrganizationProps, id?: UniqueEntityId) {
    const organization = new Organization(props, id);
    return organization;
  }

  get name() {
    return this.props.name;
  }
}
