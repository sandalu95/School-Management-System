import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Salary } from "src/app/models/salary";
import { SalaryService } from "src/app/services/salary.service";
import Swal from "sweetalert2";
import { ClerkService } from "src/app/services/clerk.service";
import { TeacherService } from "src/app/services/teacher.service";
import { Clerk } from "src/app/models/clerk";
import { Teacher } from "src/app/models/teacher";

@Component({
  selector: "app-clerk-salary",
  templateUrl: "./clerk-salary.component.html",
  styleUrls: ["./clerk-salary.component.css"]
})
export class ClerkSalaryComponent implements OnInit {
  salaryForm: FormGroup;
  nameinitials: string;
  userId: string;
  year: string;
  month: string;

  grossPay: number = 0;
  totalDeductions: number = 0;
  netPay: number = 0;

  filteredUsers: Observable<User[]>;
  userlist: User[] = null;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private clerkService: ClerkService,
    private teacherService: TeacherService
  ) {
    this.salaryForm = fb.group({
      userId: [null, Validators.required],
      nameinitials: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      pricipalAllowance: [null],
      basicSalary: [null],
      speInterim: [null],
      increments: [null],
      arrears: [null],
      festivalAdvance: [null],
      adjustAll: [null],
      allowance: [null],
      colAllowance: [null],
      stamp: [null],
      noPay: [null],
      surcharge: [null],
      wop: [null],
      wopArrears: [null],
      edcs: [null],
      nUnion: [null],
      lifeInsurance: [null],
      schoolDeduction: [null],
      houseRent: [null],
      houseLoan: [null],
      distLoan: [null],
      distIntArr: [null],
      fidDstrsLo: [null]
    });
  }

  ngOnInit() {
    this.onChanges();
    this.getTUsers();
  }

  getTUsers() {
    this.salaryService.getUsers().subscribe(
      data => {
        this.userlist = data.users;
        this.filteredUsers = this.salaryForm.get("userId").valueChanges.pipe(
          startWith(""),
          map(user =>
            user ? this._filteredUsers(user) : this.userlist.slice()
          )
        );
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  private _filteredUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.userlist.filter(
      user => user.username.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addSalary(data) {
    if (this.salaryForm.invalid) return;

    let earnings = {
      pricipalAllowance: data.pricipalAllowance,
      basicSalary: data.basicSalary,
      speInterim: data.speInterim,
      increments: data.increments,
      arrears: data.arrears,
      festivalAdvance: data.festivalAdvance,
      adjustAll: data.adjustAll,
      allowance: data.allowance,
      colAllowance: data.colAllowance
    };

    let deductions = {
      stamp: data.stamp,
      noPay: data.noPay,
      surcharge: data.surcharge,
      wop: data.wop,
      wopArrears: data.wopArrears,
      edcs: data.edcs,
      nUnion: data.nUnion,
      lifeInsurance: data.lifeInsurance,
      schoolDeduction: data.schoolDeduction,
      houseRent: data.houseRent,
      houseLoan: data.houseLoan,
      distLoan: data.distLoan,
      distIntArr: data.distIntArr,
      fidDstrsLo: data.fidDstrsLo
    };

    let salary = new Salary(
      data.nameinitials,
      data.year,
      data.month,
      data.userId,
      earnings,
      deductions
    );

    Swal.showLoading();
    this.salaryService.addSalary(salary).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        });
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  onChanges(): void {
    this.salaryForm.valueChanges.subscribe(val => {
      const pricipalAllowance = this.salaryForm.controls["pricipalAllowance"]
        .value;
      const basicSalary = this.salaryForm.controls["basicSalary"].value;
      const speInterim = this.salaryForm.controls["speInterim"].value;
      const increments = this.salaryForm.controls["increments"].value;
      const arrears = this.salaryForm.controls["arrears"].value;
      const festivalAdvance = this.salaryForm.controls["festivalAdvance"].value;
      const adjustAll = this.salaryForm.controls["adjustAll"].value;
      const allowance = this.salaryForm.controls["allowance"].value;
      const colAllowance = this.salaryForm.controls["colAllowance"].value;

      const stamp = this.salaryForm.controls["stamp"].value;
      const noPay = this.salaryForm.controls["noPay"].value;
      const surcharge = this.salaryForm.controls["surcharge"].value;
      const wop = this.salaryForm.controls["wop"].value;
      const wopArrears = this.salaryForm.controls["wopArrears"].value;
      const edcs = this.salaryForm.controls["edcs"].value;
      const nUnion = this.salaryForm.controls["nUnion"].value;
      const lifeInsurance = this.salaryForm.controls["lifeInsurance"].value;
      const schoolDeduction = this.salaryForm.controls["schoolDeduction"].value;
      const houseRent = this.salaryForm.controls["houseRent"].value;
      const houseLoan = this.salaryForm.controls["houseLoan"].value;
      const distLoan = this.salaryForm.controls["distLoan"].value;
      const distIntArr = this.salaryForm.controls["distIntArr"].value;
      const fidDstrsLo = this.salaryForm.controls["fidDstrsLo"].value;

      this.grossPay =
        pricipalAllowance +
        basicSalary +
        speInterim +
        increments +
        arrears +
        festivalAdvance +
        adjustAll +
        allowance +
        colAllowance;
      this.totalDeductions =
        stamp +
        noPay +
        surcharge +
        wop +
        wopArrears +
        edcs +
        nUnion +
        lifeInsurance +
        schoolDeduction +
        houseRent +
        houseLoan +
        distLoan +
        distIntArr +
        fidDstrsLo;

      this.netPay = this.grossPay - this.totalDeductions;
    });
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
