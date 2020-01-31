import { Component, OnInit } from "@angular/core";
import { Parent } from "src/app/models/parent";
import { StudentService } from "src/app/services/student.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Student } from "src/app/models/student";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-report-student-data",
  templateUrl: "./report-student-data.component.html",
  styleUrls: ["./report-student-data.component.css"]
})
export class ReportStudentDataComponent implements OnInit {
  admissionNumberForm: FormGroup;
  student: Student[];
  pdfMake: any;
  studentListLength: number = -1;

  fullname: string;
  nameWithInitial: string;
  gender: string;
  dob: string;
  grade: string;
  class: string;
  address: string;
  admissionNumber: string;
  admissionDate: string;
  parent: Parent;
  parentName: string;
  parentEmail: string;
  parentContactNumber: string;
  relationship: string;

  constructor(private fb: FormBuilder, public studentService: StudentService) {
    this.admissionNumberForm = fb.group({
      admissionNumber: [null, Validators.required]
    });
  }

  ngOnInit() {}

  getStudentDetails(data) {
    if (this.admissionNumberForm.invalid) return;

    this.studentService
      .getStudentByAddmissionNUmber(data.admissionNumber)
      .subscribe(
        data => {
          this.student = data.students;
          this.studentListLength = this.student.length;
          if (data.students.length > 0) {
            this.fullname = this.student[0].fullname;
            this.nameWithInitial = this.student[0].nameinitials;
            this.gender = this.student[0].gender;
            this.dob = this.student[0].dob;
            this.grade = this.student[0].grade;
            this.class = this.student[0].class;
            this.address = this.student[0].parent.address;
            this.admissionNumber = this.student[0].admissionnumber;
            this.admissionDate = this.student[0].admissiondate;

            this.parent = this.student[0].parent;
            this.parentName = this.parent.fullname;
            this.parentEmail = this.parent.email;
            this.parentContactNumber = this.parent.contact;
            this.relationship = this.parent.relationship;
          }
        },
        error => {
          this.handleResponseError(error);
        }
      );
  }

  generatePdf(action = "open") {
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
          text: "Student Data Report",
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
                text: "Admission Number\t:\t" + this.admissionNumber,
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
                text: "Date of birth\t:\t" + this.formatDate(this.dob),
                style: "name"
              },
              {
                text: "Grade\t:\t" + this.grade,
                style: "name"
              },
              {
                text: "Class\t:\t" + this.class,
                style: "name"
              },
              {
                text: "Address\t:\t" + this.address,
                style: "name"
              },
              {
                text:
                  "Admission Date\t:\t" + this.formatDate(this.admissionDate),
                style: "name"
              },
              {
                text: "Guardian's Name\t:\t" + this.parentName,
                style: "name"
              },
              {
                text: "Guardian's Email\t:\t" + this.parentEmail,
                style: "name"
              },
              {
                text: "Guardian's Contact\t:\t" + this.parentContactNumber,
                style: "name"
              },
              {
                text: "Guardian's Relationship\t:\t" + this.relationship,
                style: "name"
              }
            ]
          ]
        }
      ],
      info: {
        title: this.admissionNumber + "-Student Data",
        author: "admin",
        subject: "Student Data",
        keywords: "Student Data"
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
