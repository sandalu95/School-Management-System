import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/student";
import { StudentService } from "src/app/services/student.service";
import { Parent } from "src/app/models/parent";

@Component({
  selector: "app-teacher-view-students",
  templateUrl: "./teacher-view-students.component.html",
  styleUrls: ["./teacher-view-students.component.css"]
})
export class TeacherViewStudentsComponent implements OnInit {

  public student: Student;
  fullname: string;
  nameWithInitial: string;
  id: string;
  gender: string;
  dob: string;
  grade: string;
  class: string;
  admissionnumber: string;
  admissiondate: string;
  profileImage: string;
  parentName: string;
  parentEmail: string;
  parentContactNumber: string;
  relationship: string;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.currentStudent.subscribe(student => {
      this.student = student;
      console.log(student.parent);
    });
    if (this.student) {
      this.fullname = this.student.fullname;
      this.nameWithInitial = this.student.nameinitials;
      this.gender = this.student.gender;
      this.dob = this.student.dob;
      this.grade = this.student.grade;
      this.class = this.student.class;
      this.admissionnumber = this.student.admissionnumber;
      this.admissiondate = this.student.admissiondate;
      this.profileImage = this.student.profileImage;
      this.parentName = this.student.parent.nameinitials;
      this.parentEmail = this.student.parent.email;
      this.parentContactNumber = this.student.parent.contact;
      this.relationship = this.student.parent.relationship;
    }
  }
}
