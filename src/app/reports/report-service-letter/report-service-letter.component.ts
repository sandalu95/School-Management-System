import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-service-letter',
  templateUrl: './report-service-letter.component.html',
  styleUrls: ['./report-service-letter.component.css']
})
export class ReportServiceLetterComponent implements OnInit {

  letterDetailForm: FormGroup;
  pdfMake: any;
  fullNametxt = '_____';
  employeeIdtxt = '_____';
  titletxt = '_____';
  appointmentDatetxt = '_____';
  nameWithInitialstxt = '_____';
  userTypetxt = '_____';
  subjecttxt = '_____';

  constructor(private fb: FormBuilder) {
    this.letterDetailForm = fb.group({
      employeeId: [null, Validators.required],
      fullName: [null, Validators.required],
      title: [null, Validators.required],
      schoolAppointedDate: [null, Validators.required],
      nameWithInitials: [null, Validators.required],
      userType: [null, Validators.required],
      subject: [null],
    });
   }

  ngOnInit() {
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
          text: 'Service Letter',
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: "To whom it may concern,",
              style: 'name'
            },
            {
              text: "This is to certify that "+this.titletxt+". "+this.fullNametxt+" ("+this.employeeIdtxt+") is employed at MR/Pitabeddara Secondary School since "+
              this.appointmentDatetxt+" onwards.",
              style: 'name'
            },
            {
              text: this.titletxt+". "+this.nameWithInitialstxt+"'s designation at the moment is "+
              this.userTypetxt+". During the tenture we finds the employee's sincere, honest and hardworking.",
              style: 'name'
            },
            {
              text: "..............................",
              style: 'name'
            },
            {
              text: "Principal",
              style: 'name'
            },
            {
              text: "Date : ..............................",
              style: 'name'
            },
            ]
          ]
        },
      ],
      info: {
        title: this.employeeIdtxt+'-Service Letter',
        author: 'admin',
        subject: 'Service Letter',
        keywords: 'Service Letter',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 12,
            margin: [0, 20, 0, 0]
          }
        }
    };
  }

  // getEmployeeDetails(data) {
  //   if (this.employeeIdForm.invalid) return;
  // }

  saveDetail(data){
    if (this.letterDetailForm.invalid) return;
    this.fullNametxt = data.fullName;
    this.titletxt = data.title;
    this.employeeIdtxt = data.employeeId;
    this.appointmentDatetxt = data.schoolAppointedDate.getFullYear() + "-" + (data.schoolAppointedDate.getMonth() + 1) + "-" + data.schoolAppointedDate.getDate();
    this.nameWithInitialstxt = data.nameWithInitials;
    this.userTypetxt = data.userType;
    this.subjecttxt = data.subject;
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

  handleResponseError(error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
