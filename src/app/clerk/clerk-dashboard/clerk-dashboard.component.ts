import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { NoticeService } from "src/app/services/notice.service";
import { ClerkService } from "src/app/services/clerk.service";
import Swal from "sweetalert2";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material";
import { LeaveService } from "src/app/services/leave.service";

@Component({
  selector: "app-clerk-dashboard",
  templateUrl: "./clerk-dashboard.component.html",
  styleUrls: ["./clerk-dashboard.component.css"]
})
export class ClerkDashboardComponent implements OnInit {
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
  clerkId: string;

  constructor(
    private noticeService: NoticeService,
    public clerkService: ClerkService,
    public leaveService: LeaveService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getClerkDetails();
    this.getLeavesCount();
  }

  getClerkDetails() {
    this.clerkService.getClerkByUserId().subscribe(
      data => {
        console.log(data)
        this.fullname = data.clerks[0].fullname;
        this.nameWithInitial = data.clerks[0].nameinitials;
        this.position = data.clerks[0].position;
        this.gender = data.clerks[0].gender;
        this.dob = data.clerks[0].dob;
        this.firstAppoinment = data.clerks[0].firstadmission;
        this.appoinmentToSchool = data.clerks[0].scladmission;
        this.nic = data.clerks[0].nic;
        this.address = data.clerks[0].address;
        this.profileImage = data.clerks[0].file;
        this.contactNumber = data.clerks[0].contact;
        this.email = data.clerks[0].email;
        this.clerkId = data.clerks[0].id;
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
