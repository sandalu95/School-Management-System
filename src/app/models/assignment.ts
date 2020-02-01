import { AssignmentMark } from "./assignmentmark";

export class Assignment {
  _id: string;
  assignmentName: string;
  subject: string;
  grade: number;
  class: string;
  marks: AssignmentMark[];
  user: string;
}
