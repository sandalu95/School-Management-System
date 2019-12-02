import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from 'src/app/models/student';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { startWith, map } from 'rxjs/operators';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-clerk-achievements',
  templateUrl: './clerk-achievements.component.html',
  styleUrls: ['./clerk-achievements.component.css']
})
export class ClerkAchievementsComponent implements OnInit {
  achievementForm: FormGroup;
  addSubjectForm: FormGroup;
  studenttxt: string = "";
  typetxt: string = "";

  filteredStudents: Observable<Student[]>;
  studentlist: Student[] = null;
  
  yearArray=[...Array(30).keys()].map(i=>i+2000);
  gradeList=['A','B','C','S','F'];
  
  results: Result[]=[];

  constructor(private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService) 
  {
      this.achievementForm = fb.group({
        student: [null, Validators.required],
        type: [null, Validators.required],
        subType: [null, Validators.required],
        year: [null, Validators.required],
        subject: [null, Validators.required],
        stream: [null, Validators.required],
        medium: [null, Validators.required],
        competition: [null, Validators.required],
        event: [null, Validators.required],
        place: [null, Validators.required],
        email: [
          null,
          Validators.compose([Validators.required, Validators.email])
        ],
        firstadmission: [null, Validators.required],
        scladmission: [null, Validators.required],
        file: [null, null]
      });

      this.addSubjectForm = fb.group({
        subject: [null],
        grade: [null],
      });

      this.studentService.getAllStudents().subscribe(
        data => {
          this.studentlist = data.students;
          console.log(this.studentlist);
          this.filteredStudents = this.achievementForm.get("student").valueChanges.pipe(
            startWith(""),
            map(student =>
              parent ? this._filteredStudents(student) : this.studentlist.slice()
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

  addResult(subject,grade){
    const result = new Result();
    result.subject=subject;
    result.grade=grade;
    this.results.push(result);
  }

  Save(data) {
    if (this.achievementForm.invalid) return;

    // Swal.showLoading();

    // data.file = this.selectedFile;

    // this.teacherService.registerTeacher(data).subscribe(
    //   data => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Great!",
    //       text: data.message
    //     }).then(result => {
    //       this.router.navigate(["./home/clerk/achievements"], {});
    //     });
    //   },
    //   error => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: error.error.error
    //     });
    //   }
    // );
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
