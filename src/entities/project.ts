import { Entity } from "@/shared/entities/entity.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";
import type { Task } from "./task.ts";

export type ProjectProps = {
  userId: UniqueEntityId;
  name: string;
  tasks: Task[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Project extends Entity<ProjectProps> {
  static create(props: ProjectProps, id?: UniqueEntityId) {
    const project = new Project(
      {
        ...props,
        tasks: props.tasks ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
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
