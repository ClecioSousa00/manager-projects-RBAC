import { Entity } from "@/shared/entities/entity.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export type ProjectProps = {
  userId: UniqueEntityId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Project extends Entity<ProjectProps> {
  static create(props: ProjectProps, id?: UniqueEntityId) {
    const project = new Project(props, id);
    return project;
  }

  get name() {
    return this.props.name;
  }

  get userId() {
    return this.props.userId;
  }

  changeName(name: string) {
    this.props.name = name;
    this.markAsUpdated();
  }

  markAsUpdated() {
    this.props.updatedAt = new Date();
  }
}
