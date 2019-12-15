import { MapType } from "@angular/compiler";

export class Salary {
  constructor(
    name: string,
    year: number,
    month: string,
    user: string,
    earnings: any,
    deductions: any
  ) {
    this.name = name;
    this.year = year;
    this.month = month;
    this.user = user;
    this.earnings = earnings;
    this.deductions = deductions;
  }

  _id: string;
  name: string;
  year: number;
  month: string;
  user: string;
  earnings: any;
  deductions: any;
}
