import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Student } from "src/app/models/student";
import { Observable } from "rxjs";
import { StudentService } from "src/app/services/student.service";
import { startWith, map } from "rxjs/operators";
import { Result } from "src/app/models/result";
import { Exam } from "src/app/models/exam";
import { Achievement } from "src/app/models/achievement";
import { Competition } from "src/app/models/competition";
import { AchivementService } from "src/app/services/achivement.service";
import { AddAchivementRequest } from "src/app/models/request/addAchivementRequest";

@Component({
  selector: "app-clerk-achievements",
  templateUrl: "./clerk-achievements.component.html",
  styleUrls: ["./clerk-achievements.component.css"]
})
export class ClerkAchievementsComponent implements OnInit {
  achievementForm: FormGroup;
  addSubjectForm: FormGroup;
  studenttxt: string = "";
  typetxt: string = "";

  filteredStudents: Observable<Student[]>;
  studentlist: Student[] = null;

  yearArray = [...Array(30).keys()].map(i => i + 2000);
  gradeList = ["A", "B", "C", "S", "F"];

  results: Result[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService,
    private achivementService: AchivementService
  ) {
    this.achievementForm = fb.group({
      student: [null, Validators.required],
      year: [null, Validators.required],
      type: [null],
      subType: [null],
      subject: [null],
      stream: [null],
      medium: [null],
      competition: [null],
      event: [null],
      place: [null],
      description: [null]
    });

    this.addSubjectForm = fb.group({
      subject: [null],
      grade: [null]
    });

    this.studentService.getAllStudents().subscribe(
      data => {
        this.studentlist = data.students;
        console.log(this.studentlist);
        this.filteredStudents = this.achievementForm
          .get("student")
          .valueChanges.pipe(
            startWith(""),
            map(student =>
              parent
                ? this._filteredStudents(student)
                : this.studentlist.slice()
            )
          );
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  ngOnInit() {
    this.achievementForm.get("type").setValue("academic");
    this.achievementForm.get("subType").setValue("oLevel");
  }

  private _filteredStudents(value: string): Student[] {
    const filterValue = value.toLowerCase();

    return this.studentlist.filter(
      student => student.nameinitials.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addResult(subject, grade) {
    const result = new Result();
    result.subject = subject;
    result.grade = grade;
    this.results.push(result);
  }

  Save(data) {
    if (this.achievementForm.invalid) return;

    let oLevelResults;
    let aLevelResults;
    let extraCurricular;
    let other;
    let achivement = new AddAchivementRequest();

    if (data.type == "academic") {
      if (data.subType == "oLevel") {
        oLevelResults = new Exam(this.results, null, data.medium, data.year);
        achivement.oLevel = oLevelResults;
      } else if (data.subType == "aLevel") {
        aLevelResults = new Exam(
          this.results,
          data.stream,
          data.medium,
          data.year
        );
        achivement.aLevel = aLevelResults;
      } else if (data.subType == "other") {
        other = new Competition(
          data.type,
          data.competition,
          data.event,
          data.place,
          data.year,
          data.description
        );
        achivement.other = other;
      }
    } else if (data.type == "extraCurricular") {
      extraCurricular = new Competition(
        data.type,
        data.competition,
        data.event,
        data.place,
        data.year,
        data.description
      );
      achivement.extraCuricular = extraCurricular;
    }

    achivement.studentId = data.student;

    Swal.showLoading();

    this.achivementService.addAchivements(achivement).subscribe(
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
