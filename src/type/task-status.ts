export const TaskStatus = {
  TODO: "To do",
  IN_PROGRESS: "On Progress",
  DONE: "Done",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
