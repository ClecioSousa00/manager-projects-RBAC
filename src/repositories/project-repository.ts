import type { Project } from "@/entities/project.ts";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  update(project: Project): Promise<void>;
  delete(id: string): Promise<void>;
}
