import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clerk-salary',
  templateUrl: './clerk-salary.component.html',
  styleUrls: ['./clerk-salary.component.css']
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

  constructor(private fb: FormBuilder) {
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
      fidDstrsLo: [null],
    });
  }

  ngOnInit() {
    this.onChanges();
  }

  addSalary(data){
    if (this.salaryForm.invalid) return;
  }

  onChanges(): void {
    this.salaryForm.valueChanges.subscribe(val => {
      const pricipalAllowance = this.salaryForm.controls['pricipalAllowance'].value;
      const basicSalary = this.salaryForm.controls['basicSalary'].value;
      const speInterim = this.salaryForm.controls['speInterim'].value;
      const increments = this.salaryForm.controls['increments'].value;
      const arrears = this.salaryForm.controls['arrears'].value;
      const festivalAdvance = this.salaryForm.controls['festivalAdvance'].value;
      const adjustAll = this.salaryForm.controls['adjustAll'].value;
      const allowance = this.salaryForm.controls['allowance'].value;
      const colAllowance = this.salaryForm.controls['colAllowance'].value;

      const stamp = this.salaryForm.controls['stamp'].value;
      const noPay = this.salaryForm.controls['noPay'].value;
      const surcharge = this.salaryForm.controls['surcharge'].value;
      const wop = this.salaryForm.controls['wop'].value;
      const wopArrears = this.salaryForm.controls['wopArrears'].value;
      const edcs = this.salaryForm.controls['edcs'].value;
      const nUnion = this.salaryForm.controls['nUnion'].value;
      const lifeInsurance = this.salaryForm.controls['lifeInsurance'].value;
      const schoolDeduction = this.salaryForm.controls['schoolDeduction'].value;
      const houseRent = this.salaryForm.controls['houseRent'].value;
      const houseLoan = this.salaryForm.controls['houseLoan'].value;
      const distLoan = this.salaryForm.controls['distLoan'].value;
      const distIntArr = this.salaryForm.controls['distIntArr'].value;
      const fidDstrsLo = this.salaryForm.controls['fidDstrsLo'].value;

      this.grossPay = pricipalAllowance + basicSalary + speInterim + increments + arrears + festivalAdvance + adjustAll + allowance + colAllowance;
      this.totalDeductions = stamp + noPay + surcharge + wop + wopArrears + edcs + nUnion + lifeInsurance + schoolDeduction + houseRent + houseLoan + distLoan + distIntArr + fidDstrsLo;

      this.netPay = this.grossPay - this.totalDeductions;
    })
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

}
