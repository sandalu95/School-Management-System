import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Pay } from "src/app/models/pay";
import { SalaryService } from "src/app/services/salary.service";
import Swal from "sweetalert2";
import { Salary } from "src/app/models/salary";
import { Teacher } from "src/app/models/teacher";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-teacher-salary",
  templateUrl: "./teacher-salary.component.html",
  styleUrls: ["./teacher-salary.component.css"]
})
export class TeacherSalaryComponent implements OnInit {
  searchForm: FormGroup;
  pdfMake: any;

  name: string;
  designation: string;
  firstAppointmentDate: string;
  schoolAppointmentDate: string;
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

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Pay Report - '+this.searchForm.get('month').value+" "+this.searchForm.get('year').value,
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: "Name\t:\t"+this.name,
              style: 'name'
            },
            {
              text: "Designation\t:\t"+this.designation,
              style: 'name'
            },
            {
              text: "Date of first appointment\t:\t"+ new Date(this.firstAppointmentDate).toLocaleDateString(),
              style: 'name'
            },
            {
              text: "Date of appointment to the school\t:\t"+new Date(this.schoolAppointmentDate).toLocaleDateString(),
              style: 'name'
            },
            {
              text: "Basic Salary\t:\t"+this.basicSalary,
              style: 'name'
            },
            {
              table: {
                widths: [200, 'auto'],
                headerRows: 2,
                // keepWithHeaderRows: 1,
                body: [
                  [{text: 'Earnings', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {}],
                  ...this.earnings.map(earning => {
                    return [earning.name, earning.value];
                  }),
                  [{text: 'Gross Pay', style: 'tableHeader'}, this.getEarnings()],
                  [{text: 'Deductions', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {}],
                  ...this.deductions.map(earning => {
                    return [earning.name, earning.value];
                  }),
                  [{text: 'Total Deductions', style: 'tableHeader'}, this.getDeductions()],
                  [{text: 'Net Pay', style: 'tableHeader'}, this.getEarnings() - this.getDeductions()]
                ]
              }
            },
            { 
              text: "I do hereby certify that the foregoing is true and correct according to the pay sheet of school.",
              style: 'name'
              
            },
            {
              columns: [
                {
                  width: 340,
                  text: "",
                  style: 'name'
                },
                {
                  width: 'auto',
                  text: "..................................\nPrincipal signature",
                  style: 'name'
                }
              ]
            }
            ]
          ]
        },
      ],
      info: {
        title: 'Pay Report - '+this.searchForm.get('month').value+" "+this.searchForm.get('year').value,
        author: 'admin',
        subject: 'Pay Report',
        keywords: 'Pay Report',
      },
        styles: {
          name: {
            fontSize: 12,
            margin: [0, 10, 0, 0]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
    };
  }

  getEarnings(){
    let totalEarnings = 0;

    this.earnings.forEach(earning => {
      totalEarnings += parseInt(earning.value)
    })

    return totalEarnings;
  }

  getDeductions(){
    let totalDeductions = 0;
    this.deductions.forEach(deduction => {
      totalDeductions += parseInt(deduction.value); 
    })

    return totalDeductions;
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
