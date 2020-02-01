import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mark } from 'src/app/models/mark';
import { Student } from 'src/app/models/student';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { MarksService } from 'src/app/services/marks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-assignment-marks',
  templateUrl: './report-assignment-marks.component.html',
  styleUrls: ['./report-assignment-marks.component.css']
})
export class ReportAssignmentMarksComponent implements OnInit {
  assignmentForm: FormGroup;

  classList = ["A", "B", "C", "D", "E", "F"];

  studentMarksList: any = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService,
    private markService: MarksService
  ) { 
    this.assignmentForm = fb.group({
      assignmentName: [null, Validators.required],
      subject: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  viewAssignment(data) {
    this.markService.getAssignmentMarks(data.assignmentName, data.subject, data.class, data.grade).subscribe(
      data => {
        this.studentMarksList = data.assignmentMarks.marks;
      }
    )
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
