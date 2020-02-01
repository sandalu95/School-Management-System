import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClerkService } from 'src/app/services/clerk.service';
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
  gender = null;

  constructor(private fb: FormBuilder, private teacherService: TeacherService, private clerkService: ClerkService) {
    this.letterDetailForm = fb.group({
      employeeId: [null, Validators.required]
      
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
              columns: [
                {
                  width: 'auto',
                  text: "...........................\nDate",
                  style: 'name'
                },
                {
                  width: 330,
                  text: " ",
                  style: 'name'
                },
                {
                  width: 'auto',
                  text: "................................\nPrincipal signature",
                  style: 'name'
                }
              ],
            }
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

    // console.log(data.employeeId.charAt(0) == 'T');
    this.employeeIdtxt = data.employeeId;
    if(data.employeeId.charAt(0) == 'T'){
      this.teacherService.getTeacherByTeacherId(data.employeeId).subscribe(
        data => {
          this.fullNametxt = data.teachers[0].fullname;
          this.appointmentDatetxt = new Date(data.teachers[0].scladmission).toLocaleDateString();
          this.subjecttxt = data.teachers[0].subject;
          this.gender = data.teachers[0].gender;
          this.nameWithInitialstxt = data.teachers[0].nameinitials;
          if(this.gender == 'Male'){
            this.titletxt = 'Mr'
          }else {
            this.titletxt = 'Mrs'
          }
          this.userTypetxt = "Teacher"
        },
        error => {
          this.handleResponseError(error);
        }
      );
    } else if(data.employeeId.charAt(0) == 'C'){
      this.clerkService.getClerkByClerkId(data.employeeId).subscribe(
        data => {
          this.fullNametxt = data.clerks[0].fullname;
          this.appointmentDatetxt = new Date(data.clerks[0].scladmission).toLocaleDateString();
          this.gender = data.clerks[0].gender;
          this.nameWithInitialstxt = data.clerks[0].nameinitials;
          if(this.gender == 'Male'){
            this.titletxt = 'Mr'
          }else {
            this.titletxt = 'Mrs'
          }
          this.userTypetxt = "Clerk"
        },
        error => {
          this.handleResponseError(error);
        }
      );
    }
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
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
