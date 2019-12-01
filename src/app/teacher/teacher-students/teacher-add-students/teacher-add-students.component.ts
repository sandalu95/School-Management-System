import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/student";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StudentService } from "src/app/services/student.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Parent } from "src/app/models/parent";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ParentService } from "src/app/services/parent.service";

@Component({
  selector: "app-teacher-add-students",
  templateUrl: "./teacher-add-students.component.html",
  styleUrls: ["./teacher-add-students.component.css"]
})
export class TeacherAddStudentsComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;

  selectedFile = null;
  fullnametxt: string = "";
  nameinitialstxt: string = "";
  gendertxt: string = "";
  gradetxt: string = "";
  classtxt: string = "";
  dobtxt: string = "";
  admissionnumbertxt: string = "";
  admissiondatetxt: string = "";
  parenttxt: string = "";

  filteredParents: Observable<Parent[]>;
  parentlist: Parent[] = null;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService,
    private parentService: ParentService
  ) {
    this.studentForm = fb.group({
      fullname: [null, Validators.required],
      nameinitials: [null, Validators.required],
      gender: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required],
      dob: [null, Validators.required],
      admissionnumber: [null, Validators.required],
      admissiondate: [null, Validators.required],
      parent: [null, Validators.required],
      file: [null, null],
      year: [null, Validators.required],
      month: [null, Validators.required],
    });

    this.parentService.getAllParents().subscribe(
      data => {
        this.parentlist = data.parents;
        console.log(this.parentlist);
        this.filteredParents = this.studentForm.get("parent").valueChanges.pipe(
          startWith(""),
          map(parent =>
            parent ? this._filteredParents(parent) : this.parentlist.slice()
          )
        );
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  private _filteredParents(value: string): Parent[] {
    const filterValue = value.toLowerCase();

    return this.parentlist.filter(
      parent => parent.nameinitials.toLowerCase().indexOf(filterValue) === 0
    );
  }

  save(data) {
    if (this.studentForm.invalid) return;

    Swal.showLoading();

    data.file = this.selectedFile;

    this.studentService.registerStudent(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.router.navigate(["./home/teacher/students"], {});
        });
      },
      error => {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
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
