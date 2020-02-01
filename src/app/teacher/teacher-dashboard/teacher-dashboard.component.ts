import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { NoticeService } from "src/app/services/notice.service";
import { TeacherService } from "src/app/services/teacher.service";
import Swal from "sweetalert2";
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: "app-teacher-dashboard",
  templateUrl: "./teacher-dashboard.component.html",
  styleUrls: ["./teacher-dashboard.component.css"]
})
export class TeacherDashboardComponent implements OnInit {
  casualLeaves = 0;
  sickLeaves = 0;
  dutyLeaves = 0;
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
    public teacherService: TeacherService,
    private leaveService: LeaveService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getTeacherDetails();
    this.getLeavesCount();
  }

  getTeacherDetails() {
    this.teacherService.getTeacherById().subscribe(
      data => {
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
        this.teacherId = data.teachers[0].teacherid;
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

  getLeavesCount() {
    this.leaveService.getLeavesCount().subscribe(
      data => {
        this.sickLeaves = data.sickLeave;
        this.casualLeaves = data.casualLeave;
        this.dutyLeaves = data.dutyLeave;
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
