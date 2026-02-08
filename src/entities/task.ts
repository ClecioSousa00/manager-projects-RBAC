import { Entity } from "@/shared/entities/entity.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";
import { TaskStatus } from "@/type/task-status.ts";
import type { CheckList } from "./checklist.ts";

export type TaskProps = {
  title: string;
  status: TaskStatus;
  checkList: CheckList[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Task extends Entity<TaskProps> {
  static create(props: TaskProps, id?: UniqueEntityId) {
    const task = new Task(
      {
        ...props,
        status: props.status ?? TaskStatus.TODO,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return task;
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.markAsUpdated();
  }

  changeStatus(status: TaskStatus) {
    this.props.status = status;
    this.markAsUpdated();
  }

  markAsUpdated() {
    this.props.updatedAt = new Date();
  }
}
