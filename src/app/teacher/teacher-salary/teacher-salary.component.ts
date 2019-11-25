import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pay } from 'src/app/models/pay';

@Component({
  selector: 'app-teacher-salary',
  templateUrl: './teacher-salary.component.html',
  styleUrls: ['./teacher-salary.component.css']
})
export class TeacherSalaryComponent implements OnInit {

  searchForm: FormGroup;
  // public salary: Salary;
  name: string;
  designation: string;
  firstAppointmentDate: string;
  schoolAppointmentDate: string;
  retirementDate: string;
  basicSalary: string;
  earnings: Pay[];
  deductions: Pay[];

  // constructor(private fb: FormBuilder, private salaryService: SalaryService) {}

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      year: [null, Validators.required],
      month: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.name="drgdg";
    this.designation= "dfvvf";
    this.firstAppointmentDate= "2019-08-12";
    this.schoolAppointmentDate= "2019-03-12";
    this.retirementDate= "2017-02-09";
    this.basicSalary= "4353";
    this.earnings= [
      {
        name:"Basic Salary",
        value:"4353"
      },
      {
        name:"Increments",
        value:"2020"
      },
      {
        name:"Arrears",
        value:"321"
      }
    ];
    this.deductions= [
      {
        name:"Stamp",
        value:"4353"
      },
      {
        name:"No Pay",
        value:"2020"
      },
      {
        name:"EDCS",
        value:"321"
      }
    ];
  }

  searchSalary(data){
    if (this.searchForm.invalid) return;
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

}
