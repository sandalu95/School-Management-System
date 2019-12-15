import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Pay } from "src/app/models/pay";
import { SalaryService } from "src/app/services/salary.service";
import Swal from "sweetalert2";
import { Salary } from "src/app/models/salary";
import { Teacher } from "src/app/models/teacher";

@Component({
  selector: "app-teacher-salary",
  templateUrl: "./teacher-salary.component.html",
  styleUrls: ["./teacher-salary.component.css"]
})
export class TeacherSalaryComponent implements OnInit {
  searchForm: FormGroup;

  name: string;
  designation: string;
  firstAppointmentDate: string;
  schoolAppointmentDate: string;
  retirementDate: string;
  basicSalary: string;
  earnings: Pay[];
  deductions: Pay[];

  salary: Salary;
  teacher: Teacher;

  constructor(private fb: FormBuilder, private salaryService: SalaryService) {
    this.searchForm = fb.group({
      year: [null, Validators.required],
      month: [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.earnings = [
    //   {
    //     name: "Basic Salary",
    //     value: "4353"
    //   },
    //   {
    //     name: "Increments",
    //     value: "2020"
    //   },
    //   {
    //     name: "Arrears",
    //     value: "321"
    //   }
    // ];
    // this.deductions = [
    //   {
    //     name: "Stamp",
    //     value: "4353"
    //   },
    //   {
    //     name: "No Pay",
    //     value: "2020"
    //   },
    //   {
    //     name: "EDCS",
    //     value: "321"
    //   }
    // ];
  }

  searchSalary(data) {
    if (this.searchForm.invalid) return;
    Swal.showLoading();
    this.salaryService.getSalaryByUser(data.year, data.month).subscribe(
      data => {
        Swal.hideLoading();
        this.salary = data.salary;
        this.teacher = data.teacher[0];

        let tempEarnings = [
          {
            name: "Pricipal Allowance",
            value: this.salary.earnings.pricipalAllowance
          },
          {
            name: "Basic Salary",
            value: this.salary.earnings.basicSalary
          },
          {
            name: "SPE Interim",
            value: this.salary.earnings.speInterim
          },
          {
            name: "Increments",
            value: this.salary.earnings.increments
          },
          {
            name: "Arrears",
            value: this.salary.earnings.arrears
          },
          {
            name: "Festival Advance",
            value: this.salary.earnings.festivalAdvance
          },
          {
            name: "Adjust All",
            value: this.salary.earnings.adjustAll
          },
          {
            name: "Allowance",
            value: this.salary.earnings.allowance
          },
          {
            name: "Co Allowance",
            value: this.salary.earnings.colAllowance
          }
        ];

        let tempDeductions = [
          {
            name: "Stamp",
            value: this.salary.deductions.stamp
          },
          {
            name: "No Pay",
            value: this.salary.deductions.noPay
          },
          {
            name: "Surcharge",
            value: this.salary.deductions.surcharge
          },
          {
            name: "W & OP",
            value: this.salary.deductions.wop
          },
          {
            name: "W & OP Arrears",
            value: this.salary.deductions.wopArrears
          },
          {
            name: "EDCS",
            value: this.salary.deductions.edcs
          },
          {
            name: "N. Union",
            value: this.salary.deductions.nUnion
          },
          {
            name: "Life Insuarance",
            value: this.salary.deductions.lifeInsurance
          },
          {
            name: "School Deduction",
            value: this.salary.deductions.schoolDeduction
          },
          {
            name: "House Rent",
            value: this.salary.deductions.houseRent
          },
          {
            name: "House Loan",
            value: this.salary.deductions.houseLoan
          },
          {
            name: "Dist. Loan",
            value: this.salary.deductions.distLoan
          },
          {
            name: "Dist. Int. Arr",
            value: this.salary.deductions.distIntArr
          },
          {
            name: "FID. DStrs. Lo",
            value: this.salary.deductions.fidDstrsLo
          }
        ];

        this.earnings = tempEarnings.filter(item => {
          return item.value != null;
        });

        this.deductions = tempDeductions.filter(item => {
          return item.value != null;
        });

        this.name = this.teacher.nameinitials;
        this.designation = this.teacher.position;
        this.firstAppointmentDate = this.teacher.firstadmission;
        this.schoolAppointmentDate = this.teacher.scladmission;
        this.basicSalary = this.salary.earnings.basicSalary;
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

  handleResponseError(error) {
    Swal.hideLoading();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
