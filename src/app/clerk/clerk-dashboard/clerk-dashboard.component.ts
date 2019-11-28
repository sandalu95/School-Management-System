import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/notice';
import { NoticeService } from 'src/app/services/notice.service';
import { ClerkService } from 'src/app/services/clerk.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clerk-dashboard',
  templateUrl: './clerk-dashboard.component.html',
  styleUrls: ['./clerk-dashboard.component.css']
})
export class ClerkDashboardComponent implements OnInit {
  casualLeaves = 2;
  sickLeaves = 12;
  dutyLeaves = 9;
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
  clerkId: string;

  constructor(
    private noticeService: NoticeService,
    public clerkService: ClerkService) 
  { }

  ngOnInit() {
    this.getAllNotices();
    this.getClerkDetails();
  }

  getClerkDetails() {
    // this.clerkService.getClerkById().subscribe(
    //   data => {
    //     console.log(data.teachers[0]);
    //     this.fullname = data.teachers[0].fullname;
    //     this.nameWithInitial = data.teachers[0].nameinitials;
    //     this.position = data.teachers[0].position;
    //     this.gender = data.teachers[0].gender;
    //     this.dob = data.teachers[0].dob;
    //     this.firstAppoinment = data.teachers[0].firstadmission;
    //     this.appoinmentToSchool = data.teachers[0].scladmission;
    //     this.nic = data.teachers[0].nic;
    //     this.address = data.teachers[0].address;
    //     this.profileImage = data.teachers[0].file;
    //     this.contactNumber = data.teachers[0].contact;
    //     this.email = data.teachers[0].email;
    //     this.clerkId = data.teachers[0].id;
    //   },
    //   error => {
    //     handleResponseError(error);
    //   }
    // );
    this.fullname = "Sandalu Kalpanee";
    this.nameWithInitial = "S.Kalpanee";
    this.position = "Clerk";
    this.gender = "Female";
    this.dob = "1995-08-18";
    this.firstAppoinment = "2019-09-19";
    this.appoinmentToSchool = "2019-09-19";
    this.nic = "2454656";
    this.address = "Baththaramulla";
    this.profileImage = "";
    this.contactNumber = "43546546";
    this.email = "sand@wso2.com";
    this.clerkId = "fgrgtg";
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

