import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { NoticeService } from "src/app/services/notice.service";
import { ParentService } from "src/app/services/parent.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-parent-dashboard",
  templateUrl: "./parent-dashboard.component.html",
  styleUrls: ["./parent-dashboard.component.css"]
})
export class ParentDashboardComponent implements OnInit {
  casualLeaves = 2;
  sickLeaves = 12;
  dutyLeaves = 9;
  notices: Notice[];

  fullname: string;
  nameWithInitial: string;
  relationship: string;
  nic: string;
  address: string;
  contact;
  email: string;
  parentId: string;

  constructor(
    private noticeService: NoticeService,
    public parentService: ParentService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getParentDetails();
  }

  getParentDetails() {
    this.parentService.getParentByUserId().subscribe(
      data => {
        this.fullname = data.parents[0].fullname;
        this.nameWithInitial = data.parents[0].nameinitials;
        this.relationship = data.parents[0].relationship;
        this.nic = data.parents[0].nic;
        this.address = data.parents[0].address;
        this.contact = data.parents[0].contact;
        this.email = data.parents[0].email;
        this.parentId = data.parents[0].parentId;
      },
      error => {
        handleResponseError(error);
      }
    );
    // this.fullname = "Namal Rajapakse";
    // this.nameWithInitial = "N.Rajapakse";
    // this.relationship = "Parent";
    // this.nic = "2454656";
    // this.address = "Baththaramulla";
    // this.contact = "345346356";
    // this.email = "namal@wso2.com";
    // this.parentId = "564fgv";
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
