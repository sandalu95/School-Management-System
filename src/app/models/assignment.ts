import { AssignmentMark } from "./assignmentmark";

export class Assignment {
  assignmentName: string;
  subject: string;
  grade: number;
  class: string;
  marks: AssignmentMark[];
  user: string;
}
