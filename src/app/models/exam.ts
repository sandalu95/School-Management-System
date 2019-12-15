import { Result } from "./result";

export class Exam {
  constructor(
    results?: Result[],
    stream?: string,
    medium?: string,
    year?: string
  ) {
    this.results = results;
    this.year = year;
    this.stream = stream;
    this.medium = medium;
  }

  results: Result[];
  stream: string;
  medium: string;
  year: string;
}
