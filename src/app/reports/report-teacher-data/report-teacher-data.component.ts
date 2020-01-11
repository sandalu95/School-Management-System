import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Teacher } from "src/app/models/teacher";
import { TeacherService } from "src/app/services/teacher.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-report-teacher-data",
  templateUrl: "./report-teacher-data.component.html",
  styleUrls: ["./report-teacher-data.component.css"]
})
export class ReportTeacherDataComponent implements OnInit {
  teacherIdForm: FormGroup;
  teacher: Teacher;
  pdfMake: any;

  fullname: string;
  nameWithInitial: string;
  teacherId: string;
  position: string;
  subject: string;
  gender: string;
  dob: string;
  nic: string;
  address: string;
  contact: string;
  email: string;
  firstadmission: string;
  scladmission: string;

  constructor(private fb: FormBuilder, public teacherService: TeacherService) {
    this.teacherIdForm = fb.group({
      teacherId: [null, Validators.required]
    });
  }

  ngOnInit() {}

  getTeacherDetails(data) {
    if (this.teacherIdForm.invalid) return;

    // this.teacherService.getTeacherByTeacherId(data.teacherId).subscribe(
    //   data => {
    //     this.teacher = data.teacher;
    //   },
    //   error => {
    //     this.handleResponseError(error);
    //   }
    // );
    this.teacherId = "345345";
    this.fullname = "Sandalu Kalpanee";
    this.nameWithInitial = "U.S.Kalpanee";
    this.gender = "Female";
    this.dob = "1994-02-09";
    this.nic = "125464565v";
    this.address = "Kurunegala";
    this.email = "sandy@gmail.com";
    this.contact = "2018-09-18";
    this.position = "Teacher";
    this.firstadmission = "2018-09-23";
    this.scladmission = "2010-12-12";
    this.subject = "Maths";
  }

  generatePdf(action = "open") {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: "Teacher Data Report",
          bold: true,
          fontSize: 15,
          decoration: "underline",
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: "Teacher ID\t:\t" + this.teacherId,
                style: "name"
              },
              {
                text: "Fullname\t:\t" + this.fullname,
                style: "name"
              },
              {
                text: "Name with initials\t:\t" + this.nameWithInitial,
                style: "name"
              },
              {
                text: "Gender\t:\t" + this.gender,
                style: "name"
              },
              {
                text:
                  "Date of birth\t:\t" + this.formatDate(this.firstadmission),
                style: "name"
              },
              {
                text: "NIC Number\t:\t" + this.nic,
                style: "name"
              },
              {
                text: "Address\t:\t" + this.address,
                style: "name"
              },
              {
                text: "Email Address\t:\t" + this.email,
                style: "name"
              },
              {
                text: "Contact Number\t:\t" + this.contact,
                style: "name"
              },
              {
                text: "Position\t:\t" + this.position,
                style: "name"
              },
              {
                text:
                  "Date of first appointment\t:\t" +
                  this.formatDate(this.firstadmission),
                style: "name"
              },
              {
                text:
                  "Date of appointment to school\t:\t" +
                  this.formatDate(this.firstadmission),
                style: "name"
              },
              {
                text: "Subject\t:\t" + this.subject,
                style: "name"
              }
            ]
          ]
        }
      ],
      info: {
        title: this.teacherId + "-Teacher Data",
        author: "admin",
        subject: "Teacher Data",
        keywords: "Teacher Data"
      },
      styles: {
        name: {
          fontSize: 12,
          margin: [0, 20, 0, 0]
        }
      }
    };
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

  formatDate(date: string): string {
    var newDate = new Date(date);
    var formattedDate = new Intl.DateTimeFormat("en-AU").format(newDate);

    return formattedDate;
  }
}
