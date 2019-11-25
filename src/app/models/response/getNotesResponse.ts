import { Note } from "../note";

export class GetNotesResponse {
  count: number;
  status: number;
  notes: Note[];
}
