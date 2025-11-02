import { Entity } from "../shared/entities/entity.ts";
import type { UniqueEntityId } from "../shared/entities/unique-entity-id.ts";

export type UserProps = {
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);
    return user;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }
}
