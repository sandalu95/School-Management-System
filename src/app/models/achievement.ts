import { Exam } from "./exam";
import { Competition } from "./competition";

export class Achievement {
  studentId: string;
  oLevel: Exam[];
  aLevel: Exam[];
  extraCuricular: Competition[];
  other: Competition[];
}
