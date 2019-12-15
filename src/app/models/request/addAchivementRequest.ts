import { Exam } from "../exam";
import { Competition } from "../competition";

export class AddAchivementRequest {
  studentId: string;
  oLevel: Object;
  aLevel: Object;
  extraCuricular: Object;
  other: Object;
}
