import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-add-students',
  templateUrl: './teacher-add-students.component.html',
  styleUrls: ['./teacher-add-students.component.css']
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

  constructor(private fb: FormBuilder,
    public router: Router,
    private studentService: StudentService) {
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
        file: [null, null]
      });
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  Save(data) {
    if (this.studentForm.invalid) return;

    Swal.showLoading();

    data.file = this.selectedFile;

    // this.studentService.registerStudent(data).subscribe(
    //   data => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Great!",
    //       text: data.message
    //     }).then(result => {
    //       this.router.navigate(["./home/teacher/students"], {});
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
}
