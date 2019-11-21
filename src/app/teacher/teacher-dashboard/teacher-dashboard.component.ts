import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/notice';
import { NoticeService } from 'src/app/services/notice.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  leaveCount =2;
  notices: Notice[];

  fullname: string = "Ishara Rathnayake";
  nameWithInitial: string = "R.M.I.M.Rathnayake";
  position: string = "Teacher";
  gender: string ="Male";
  dob: string = "1993-03-11";
  firstAppoinment: string = "2019-11-18";
  appoinmentToSchool: string = "2019-11-18";
  nic: string = "930713058v";
  address: string = "Ibbagamuwa";
  profileImage: string;
  contactNumber: string = "0776931433";
  email: string = "ishara@gmail.com";
  subject: string = "science";
  teacherId: string = "2312e";

  constructor(private noticeService: NoticeService) {
    
  }

  ngOnInit() {
    /**
    * call getAllNotices web service
    */
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
