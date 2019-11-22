import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Parent } from 'src/app/models/parent';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-edit-students',
  templateUrl: './teacher-edit-students.component.html',
  styleUrls: ['./teacher-edit-students.component.css']
})
export class TeacherEditStudentsComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  selectedFile = null;

  filteredParents: Observable<Parent[]>;
  parentlist: Parent[] = [
    {
      fullname: 'Manel',
      nameinitials: 'H.M.Manel',
      id: 'fbdfrg',
      relationship: 'Mother',
      nic: '95029384v',
      address: 'Colombo',
      contact: '0773456789',
      email: 'manel@gmail.com',
      parentId: '345',
    },
    {
      fullname: 'Sarath',
      nameinitials: 'K.A.Sarath',
      id: 'sefde',
      relationship: 'Father',
      nic: '93029384v',
      address: 'Colombo',
      contact: '0773456759',
      email: 'sarath@gmail.com',
      parentId: '245',
    },
    {
      fullname: 'Kamal',
      nameinitials: 'S.A.Kamal',
      id: 'iukuy',
      relationship: 'Mother',
      nic: '92029384v',
      address: 'Colombo',
      contact: '0773656789',
      email: 'kamal@gmail.com',
      parentId: '325',
    }
  ];

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
      this.filteredParents = this.studentForm.get('parent').valueChanges
      .pipe(
        startWith(''),
        map(parent => parent ? this._filteredParents(parent) : this.parentlist.slice())
      );
  }

  ngOnInit() {
    this.studentService.currentStudent.subscribe(
      student => (this.student = student)
    );
    if (this.student) {
      this.studentForm.get("fullname").setValue(this.student.fullname);
      this.studentForm.get("nameinitials").setValue(this.student.nameinitials);
      this.studentForm.get("gender").setValue(this.student.gender);
      this.studentForm.get("grade").setValue(this.student.grade);
      this.studentForm.get("class").setValue(this.student.class);
      this.studentForm.get("dob").setValue(this.student.dob);
      this.studentForm.get("admissionnumber").setValue(this.student.admissionnumber);
      this.studentForm.get("admissiondate").setValue(this.student.admissiondate);
      this.studentForm.get("parent").setValue(this.student.parent);
      this.studentForm.get("file").setValue(null);
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  private _filteredParents(value: string): Parent[] {
    const filterValue = value.toLowerCase();

    return this.parentlist.filter(parent => parent.nameinitials.toLowerCase().indexOf(filterValue) === 0);
  }

  editStudent(data) {
    if (this.studentForm.invalid) return;

    Swal.showLoading();

    data.file = this.selectedFile;

    this.studentService.editStudent(this.student.id, data).subscribe(
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
        console.log(error);
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

}
