import { Note } from "@prisma/client";

export type NoIdNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type UpdateNote = Partial<NoIdNote>
