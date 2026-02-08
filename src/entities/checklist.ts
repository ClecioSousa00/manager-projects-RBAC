import { Entity } from "@/shared/entities/entity.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export type CheckListProps = {
  title: string;
  checked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CheckList extends Entity<CheckListProps> {
  static create(props: CheckListProps, id?: UniqueEntityId) {
    const checkList = new CheckList(
      {
        ...props,
        checked: props.checked ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return checkList;
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.markAsUpdated();
  }

  setChecked(value: boolean) {
    this.props.checked = value;
    this.markAsUpdated();
  }

  markAsUpdated() {
    this.props.updatedAt = new Date();
  }
}
