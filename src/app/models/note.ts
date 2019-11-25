import { Teacher } from "./teacher";

export class Note {
  id: string;
  subject: string;
  grade: string;
  class: string;
  description: string;
  notes: any;
  userId: string;
  teacher: Teacher;
}
