import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher-view-students',
  templateUrl: './teacher-view-students.component.html',
  styleUrls: ['./teacher-view-students.component.css']
})
export class TeacherViewStudentsComponent implements OnInit {
  student: Student;
  fullname: string;
  nameinitials: string;
  id: string;
  gender: string;
  dob: string;
  grade: string;
  class: string;
  admissionnumber: string;
  admissiondate: string;
  profileImage: string;
  parent: string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.currentStudent.subscribe(student => {
      console.log(student);
      this.student = student;
    });
    if (this.student) {
      this.fullname = this.student.fullname;
      this.nameinitials = this.student.nameinitials;
      this.id = this.student.id;
      this.gender = this.student.gender;
      this.dob = this.student.dob;
      this.grade = this.student.grade;
      this.class = this.student.class;
      this.admissionnumber = this.student.admissionnumber;
      this.admissiondate = this.student.admissiondate;
      this.profileImage = this.student.profileImage;
      this.parent = this.student.parent;
    }
  }

}
