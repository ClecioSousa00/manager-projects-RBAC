import { Project, type ProjectProps } from "@/entities/project.ts";
import { UniqueEntityId } from "@/shared/entities/unique-entity-id.ts";

export const makeProject = (
  projectProps: Partial<ProjectProps> = {},
  id?: UniqueEntityId
): Project => {
  const project = Project.create(
    {
      name: "project - a",
      userId: new UniqueEntityId(),
      ...projectProps,
    },
    id
  );
  return project;
};
