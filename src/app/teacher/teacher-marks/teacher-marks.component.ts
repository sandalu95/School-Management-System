import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/models/result';
import Swal from 'sweetalert2';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher-marks',
  templateUrl: './teacher-marks.component.html',
  styleUrls: ['./teacher-marks.component.css']
})
export class TeacherMarksComponent implements OnInit {

  ttMarksForm: FormGroup;
  assignmentForm: FormGroup;
  addSubjectForm: FormGroup;
  studenttxt: string = "";
  typetxt: string = "";
  
  yearArray=[...Array(30).keys()].map(i=>i+2000);
  subjectGradeList=['A','B','C','S','F'];
  
  results: Result[]=[];
  studentlist: Student[] = null;

  constructor(private fb: FormBuilder,
    public router: Router, private studentService: StudentService) {
      this.ttMarksForm = fb.group({
        studentNumber: [null, Validators.required],
        grade: [null, Validators.required],
        class: [null, Validators.required],
        year: [null, Validators.required],
        term: [null, Validators.required],
      });
      this.addSubjectForm = fb.group({
        subject: [null],
        subjectGrade: [null],
      });
      this.assignmentForm = fb.group({
        assignmentName: [null, Validators.required],
        subject: [null, Validators.required],
        grade: [null, Validators.required],
        class: [null, Validators.required],
      });
      this.studentService.getAllStudents().subscribe(
        data => {
          this.studentlist = data.students;
          console.log(this.studentlist);
        },
        error => {
          this.handleResponseError(error);
        }
      );
  }

  ngOnInit() {
  }

  addResult(subject,grade){
    const result = new Result();
    result.subject=subject;
    result.grade=grade;
    this.results.push(result);
  }

  Save(data) {
    if (this.ttMarksForm.invalid) return;
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
