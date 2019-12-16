import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Student } from "src/app/models/student";
import { StudentService } from "src/app/services/student.service";
import { AssignmentMark } from "src/app/models/assignmentmark";
import { Assignment } from "src/app/models/assignment";
import { MarksService } from "src/app/services/marks.service";
import { Mark } from "src/app/models/mark";
import { TermTestMarks } from "src/app/models/termtestmarks";

@Component({
  selector: "app-teacher-marks",
  templateUrl: "./teacher-marks.component.html",
  styleUrls: ["./teacher-marks.component.css"]
})
export class TeacherMarksComponent implements OnInit {
  ttMarksForm: FormGroup;
  assignmentForm: FormGroup;
  addSubjectForm: FormGroup;
  studenttxt: string = "";
  typetxt: string = "";

  yearArray = [...Array(30).keys()].map(i => i + 2000);
  classList = ["A", "B", "C", "D", "E", "F"];

  results: Mark[] = [];
  studentlist: Student[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService,
    private markService: MarksService
  ) {
    this.ttMarksForm = fb.group({
      studentNumber: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required],
      year: [null, Validators.required],
      term: [null, Validators.required]
    });

    this.addSubjectForm = fb.group({
      subject: [null],
      mark: [null]
    });

    this.assignmentForm = fb.group({
      assignmentName: [null, Validators.required],
      subject: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required]
    });
  }

  ngOnInit() {}

  apply(grade: string, _class: string) {
    Swal.showLoading();
    this.studentService.getStudentsByClass(grade, _class).subscribe(
      data => {
        Swal.hideLoading();
        this.studentlist = data.students;
      },
      error => {
        Swal.hideLoading();
        this.handleResponseError(error);
      }
    );
  }

  addResult(subject, mark) {
    const result = new Mark();
    result.subject = subject;
    result.mark = mark;
    this.results.push(result);
  }

  saveTermTestMarks(data) {
    if (this.ttMarksForm.invalid) return;

    let termTestMark = new TermTestMarks();
    termTestMark.admissionNumber = data.studentNumber;
    termTestMark.class = data.class;
    termTestMark.grade = data.grade;
    termTestMark.term = data.term;
    termTestMark.year = data.year;
    termTestMark.marks = this.results;

    Swal.showLoading();

    this.markService.saveTermTestMarks(termTestMark).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        });
      },
      error => {
        Swal.hideLoading();
        this.handleResponseError(error);
      }
    );
  }

  saveAssignment(data) {
    if (this.assignmentForm.invalid) return;

    var markList = [];
    var finalMarkList = [];

    var fieldList = document.getElementsByClassName("mark");
    Array.prototype.forEach.call(fieldList, function(field) {
      markList.push(field.value);
    });

    for (let i = 0; i < markList.length; i++) {
      let mark = new AssignmentMark();
      mark.studentId = this.studentlist[i].studentId;
      mark.studentName = this.studentlist[i].nameinitials;
      mark.admissionNumber = this.studentlist[i].admissionnumber;
      mark.mark = markList[i];

      finalMarkList.push(mark);
    }

    let assignment = new Assignment();
    assignment.assignmentName = data.assignmentName;
    assignment.class = data.class;
    assignment.grade = data.grade;
    assignment.subject = data.subject;
    assignment.marks = finalMarkList;

    Swal.showLoading();

    this.markService.saveAssignmentMarks(assignment).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        });
      },
      error => {
        Swal.hideLoading();
        this.handleResponseError(error);
      }
    );
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
