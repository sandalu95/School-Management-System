import { Component, OnInit } from "@angular/core";
import { Teacher } from "src/app/models/teacher";
import { TeacherService } from "src/app/services/teacher.service";

@Component({
  selector: "app-view-teachers",
  templateUrl: "./view-teachers.component.html",
  styleUrls: ["./view-teachers.component.css"]
})
export class ViewTeachersComponent implements OnInit {
  teacher: Teacher;
  fullname: string;
  nameWithInitial: string;
  position: string;
  gender: string;
  dob: string;
  firstAppoinment: string;
  appoinmentToSchool: string;
  nic: string;
  address: string;
  profileImage: string;
  contactNumber: string;
  email: string;
  subject: string;
  teacherId: string;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService.currentTeacher.subscribe(teacher => {
      console.log(teacher);
      this.teacher = teacher;
    });
    if (this.teacher) {
      this.fullname = this.teacher.fullname;
      this.nameWithInitial = this.teacher.nameinitials;
      this.position = this.teacher.position;
      this.gender = this.teacher.gender;
      this.dob = this.teacher.dob;
      this.firstAppoinment = this.teacher.firstadmission;
      this.appoinmentToSchool = this.teacher.scladmission;
      this.nic = this.teacher.nic;
      this.address = this.teacher.address;
      this.profileImage = this.teacher.file;
      this.contactNumber = this.teacher.contact;
      this.email = this.teacher.email;
      this.subject = this.teacher.subject;
      this.teacherId = this.teacher.teacherid;
    }
  }
}
