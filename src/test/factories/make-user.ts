import { User, type UserProps } from "@/entities/user.ts";
import type { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export const makeUser = (
  userProps: Partial<UserProps> = {},
  id?: UniqueEntityId
): User => {
  const user = User.create(
    {
      email: "johnDoe@gmail.com",
      password: "12345678",
      username: "john Doe",
      ...userProps,
    },
    id
  );
  return user;
};
