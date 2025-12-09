import type { Project } from "@/entities/project.ts";
import type { ProjectRepository } from "@/repositories/project-repository.ts";

export class InMemoryProjectRepository implements ProjectRepository {
  items: Project[] = [];

  async create(project: Project): Promise<void> {
    this.items.push(project);
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.items.find((item) => item.id.toString() === id);

    return project ?? null;
  }
  async update(project: Project): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === project.id.toString()
    );

    if (index !== -1) {
      this.items[index] = project;
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }
}
