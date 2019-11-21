import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { NoticeService } from "src/app/services/notice.service";
import { TeacherService } from "src/app/services/teacher.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-teacher-dashboard",
  templateUrl: "./teacher-dashboard.component.html",
  styleUrls: ["./teacher-dashboard.component.css"]
})
export class TeacherDashboardComponent implements OnInit {
  leaveCount = 2;
  notices: Notice[];

  fullname: string;
  nameWithInitial: string;
  position: string;
  gender: string;
  dob: string;
  firstAppoinment;
  appoinmentToSchool;
  nic: string;
  address: string;
  profileImage: string;
  contactNumber: string;
  email: string;
  subject: string;
  teacherId: string;

  constructor(
    private noticeService: NoticeService,
    public teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getTeacherDetails();
  }

  getTeacherDetails() {
    this.teacherService.getTeacherById().subscribe(
      data => {
        console.log(data.teachers[0]);
        this.fullname = data.teachers[0].fullname;
        this.nameWithInitial = data.teachers[0].nameinitials;
        this.position = data.teachers[0].position;
        this.gender = data.teachers[0].gender;
        this.dob = data.teachers[0].dob;
        this.firstAppoinment = data.teachers[0].firstadmission;
        this.appoinmentToSchool = data.teachers[0].scladmission;
        this.nic = data.teachers[0].nic;
        this.address = data.teachers[0].address;
        this.profileImage = data.teachers[0].file;
        this.contactNumber = data.teachers[0].contact;
        this.email = data.teachers[0].email;
        this.subject = data.teachers[0].subject;
        this.teacherId = data.teachers[0].id;
      },
      error => {
        handleResponseError(error);
      }
    );
  }

  /**
   * call getAllNotices web service
   */
  getAllNotices() {
    this.noticeService.getAllNotices().subscribe(
      data => {
        this.notices = data.notices;
      },
      error => {
        handleResponseError(error);
      }
    );
  }
}

function handleResponseError(error) {
  console.log(error);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.error.error
  });
}
