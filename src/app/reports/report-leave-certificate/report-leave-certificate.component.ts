import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-leave-certificate',
  templateUrl: './report-leave-certificate.component.html',
  styleUrls: ['./report-leave-certificate.component.css']
})
export class ReportLeaveCertificateComponent implements OnInit {
  
  admissionNumberForm: FormGroup;
  student:Student;
  pdfMake: any;

  fullname:string;
  nameWithInitial:string;
  dob:string;
  address:string;
  guardian:string;
  admissionNumber:string;
  admissionDate:string;
  dateOfLeaving:string;
  gradeOfLeaving:string;
  reasonForLeaving:string;
  achievement:any;

  characterLevels=['None','Outstanding','Satisfactory','Needs'];
  conduct:string='None';
  leadership:string='None';
  participateExtraCurricular:string='None';
  medicalInspection:string;
  matterOfInspection:string = '-';

  constructor(private fb: FormBuilder, public studentService: StudentService) {
    this.admissionNumberForm = fb.group({
      admissionNumber: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  getStudentDetails(data) {
    if (this.admissionNumberForm.invalid) return;

    // this.studentService.getStudentByAdmission(data.admissionNumber).subscribe(
    //   data => {
    //     this.student = data.student;
    //   },
    //   error => {
    //     this.handleResponseError(error);
    //   }
    // );

    this.fullname = "tharidu lakshan";
    this.nameWithInitial = "T.M.Thake";
    this.dob = "2018-09-18";
    this.address = "Baththaramulla";
    this.guardian = "Manel Sarathchandra";
    this.admissionNumber = "345";
    this.admissionDate = "2018-09-18";
    let current_datetime = new Date();
    this.dateOfLeaving = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    this.gradeOfLeaving = "12-C";
    this.achievement=[
      {
        type:'Other',
        competition:'vfswfc',
        event:'sdce',
        place:'rsfvcesw',
        year:'2019',
        description:'dfcerfe'
      },
      {
        type:'Other',
        competition:'ertfgrf',
        event:'rfersdgv',
        place:'rfvbgbn',
        year:'2019',
        description:'uiku'
      }
    ];
  }

  onKeyReason(event) {
    this.reasonForLeaving = event.target.value;
  }

  onKeyMatter(event) {
    this.matterOfInspection = event.target.value;
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
          text: 'Leave Certificate',
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
            {
              text: "Fullname\t:\t"+this.fullname,
              style: 'name'
            },
            {
              text: "Name with initials\t:\t"+this.nameWithInitial,
              style: 'name'
            },
            {
              text: "Date of Birth\t:\t"+this.dob,
              style: 'name'
            },
            {
              text: "Permanent Address\t:\t"+this.address,
              style: 'name'
            },
            {
              text: "Guardian's Name\t:\t"+this.guardian,
              style: 'name'
            },
            {
              text: "School Name\t:\tMR/Pitabeddara Secondary School",
              style: 'name'
            },
            {
              text: "Admission Date\t:\t"+this.admissionDate,
              style: 'name'
            },
            {
              text: "Admission Number\t:\t"+this.admissionNumber,
              style: 'name'
            },
            {
              text: "Date of leaving\t:\t"+this.dateOfLeaving,
              style: 'name'
            },
            {
              text: "Grade of leaving\t:\t"+this.gradeOfLeaving,
              style: 'name'
            },
            {
              text: "Reason for leaving\t:\t"+this.reasonForLeaving,
              style: 'name'
            },
            {
              text: 'Special Aptitudes',
              style: 'header'
            },
            {
              columns : [[
                {
                  ul : [
                    ...this.achievement.filter((value, index) => index % 5 === 0).map(s => s.competition)
                  ]
                },
                {
                  ul : [
                    ...this.achievement.filter((value, index) => index % 5 === 1).map(s => s.competition)
                  ]
                },
                {
                  ul : [
                    ...this.achievement.filter((value, index) => index % 5 === 2).map(s => s.competition)
                  ]
                },
                {
                  ul : [
                    ...this.achievement.filter((value, index) => index % 5 === 3).map(s => s.competition)
                  ]
                },
                {
                  ul : [
                    ...this.achievement.filter((value, index) => index % 5 === 4).map(s => s.competition)
                  ]
                }
              ]]
            },
            {
              text: "Conduct\t:\t"+this.conduct,
              style: 'name'
            },
            {
              text: "Leadership\t:\t"+this.leadership,
              style: 'name'
            },
            {
              text: "Participation extra-curricular activities\t:\t"+this.participateExtraCurricular,
              style: 'name'
            },
            {
              text: "Dedicated at medical inspection still unremedied\t:\t"+this.medicalInspection,
              style: 'name'
            },
            {
              text: "Matter of Inspection\t:\t"+this.matterOfInspection,
              style: 'name'
            },
            {
              text: "Principal: ..............................",
              style: 'name'
            },
            {
              text: "Date of issuing: ..............................",
              style: 'name'
            },
            ]
          ]
        },
      ],
      info: {
        title: this.admissionNumber+'-Character Certificate',
        author: 'admin',
        subject: 'Character Certificate',
        keywords: 'Character Certificate',
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
