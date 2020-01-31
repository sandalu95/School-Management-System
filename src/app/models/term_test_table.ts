import { TableMarks } from "./table_marks";

export class TermTestTable {
    constructor(
        name?: string,
        series?: TableMarks[]
    ) {
      this.name = name;
      this.series = series;
    }
  
    name: string;
    series: TableMarks[]
}