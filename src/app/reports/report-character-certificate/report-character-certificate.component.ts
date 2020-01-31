import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Achievement } from 'src/app/models/achievement';
import { Student } from 'src/app/models/student';
import { AchivementService } from 'src/app/services/achivement.service';
import { Competition } from 'src/app/models/competition';
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
  achievement: Competition[] = [];

  achivementLength: number = -1;
  studentInfoLength: number = -1;

  characterLevels=['None','Outstanding','Satisfactory','Needs'];
  discipline:string='None';
  leadership:string='None';
  takeResponsibilities:string='None';
  respectTeachers:string='None';
  dedicationStudies:string='None';
  dedicationSchool:string='None';
  participateExtraCurricular:string='None';

  constructor(private fb: FormBuilder, public studentService: StudentService, private achivementService: AchivementService) { 
    this.admissionNumberForm = fb.group({
      admissionNumber: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  getStudentDetails(data) {
    if (this.admissionNumberForm.invalid) return;

    this.studentService.getStudentByAddmissionNUmber(data.admissionNumber).subscribe(
      data => {
        this.student = data.students[0];
        this.studentInfoLength = data.students.length;
        if(data.students.length > 0){
          this.fullname = this.student.fullname;
          this.nameWithInitial = this.student.nameinitials;
          this.gradeOfLeaving = "13";
          this.admissionNumber = this.student.admissionnumber;
          this.admissionDate = this.student.admissiondate;
        }
      },
      error => {
        this.handleResponseError(error);
      }
    );

    this.achivementService.getAchivementByAddmissionNumber(data.admissionNumber).subscribe(
      data => {
        if(data.achivement.length > 0){
          this.achivementLength = data.achivement[0].other.length + data.achivement[0].extraCuricular.length;
          this.achievement = data.achivement[0].extraCuricular
          this.achievement.concat(data.achivement[0].other)
        }
      },
      error => {
        this.handleResponseError(error);
      }
    )
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
              text: "Admission Date\t:\t"+new Date(this.admissionDate).toLocaleDateString(),
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
            },
            {
              text: "\n\nI do hereby certify that the foregoing is true and correct.",
              style: 'name'
            },
            {
              columns: [
                {
                  width: 'auto',
                  text: "...........................\nClass Teacher",
                  style: 'name'
                },
                {
                  width: 350,
                  text: " ..",
                  style: 'name'
                },
                {
                  width: 'auto',
                  text: "...........................\nPrincipal",
                  style: 'name'
                }
              ],
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
