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
  teacherListLength: number = -1;

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

    this.teacherService.getTeacherByTeacherId(data.teacherId).subscribe(
      data => {
        this.teacherListLength = data.teachers.length;
        this.teacher = data.teachers[0];
        this.teacherId = this.teacher.teacherid;
        this.fullname = this.teacher.fullname;
        this.nameWithInitial = this.teacher.nameinitials;
        this.gender = this.teacher.gender;
        this.dob = this.teacher.dob;
        this.nic = this.teacher.nic;
        this.address = this.teacher.address;
        this.email = this.teacher.email;
        this.contact = this.teacher.contact;
        this.position = this.teacher.position;
        this.firstadmission = this.teacher.firstadmission;
        this.scladmission = this.teacher.scladmission;
        this.subject = this.teacher.subject;
      },
      error => {
        this.handleResponseError(error);
      }
    );
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
