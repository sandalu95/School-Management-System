import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Achievement } from 'src/app/models/achievement';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-character-certificate',
  templateUrl: './report-character-certificate.component.html',
  styleUrls: ['./report-character-certificate.component.css']
})
export class ReportCharacterCertificateComponent implements OnInit {

  admissionNumberForm: FormGroup;
  student:Student;
  pdfMake: any;
  fullname:string;
  nameWithInitial:string;
  gradeOfLeaving:string;
  admissionNumber:string;
  admissionDate:string;
  achievement:any;

  characterLevels=['None','Outstanding','Satisfactory','Needs'];
  discipline:string='None';
  leadership:string='None';
  takeResponsibilities:string='None';
  respectTeachers:string='None';
  dedicationStudies:string='None';
  dedicationSchool:string='None';
  participateExtraCurricular:string='None';

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
    this.gradeOfLeaving = "12-C";
    this.admissionNumber = "345";
    this.admissionDate = "2018-09-18";
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
          text: 'Character Certificate',
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: "Admission Number\t:\t"+this.admissionNumber,
              style: 'name'
            },
            {
              text: "Fullname\t:\t"+this.fullname,
              style: 'name'
            },
            {
              text: "Name with initials\t:\t"+this.nameWithInitial,
              style: 'name'
            },
            {
              text: "Admission Date\t:\t"+this.admissionDate,
              style: 'name'
            },
            {
              text: "Grade of leaving\t:\t"+this.gradeOfLeaving,
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
              text: "Discipline\t:\t"+this.discipline,
              style: 'name'
            },
            {
              text: "Leadership\t:\t"+this.leadership,
              style: 'name'
            },
            {
              text: "Taking Responsibilities\t:\t"+this.takeResponsibilities,
              style: 'name'
            },
            {
              text: "Respect for Teachers\t:\t"+this.respectTeachers,
              style: 'name'
            },
            {
              text: "Dedication for studies\t:\t"+this.dedicationStudies,
              style: 'name'
            },
            {
              text: "Dedication for School\t:\t"+this.dedicationSchool,
              style: 'name'
            },
            {
              text: "Participation extra-curricular activities\t:\t"+this.participateExtraCurricular,
              style: 'name'
            }
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
