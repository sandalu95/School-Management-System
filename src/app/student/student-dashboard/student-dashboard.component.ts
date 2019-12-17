import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { Parent } from "src/app/models/parent";
import { StudentService } from "src/app/services/student.service";
import { NoticeService } from "src/app/services/notice.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"]
})
export class StudentDashboardComponent implements OnInit {
  notices: Notice[];

  fullname: string;
  nameWithInitial: string;
  id: string;
  gender: string;
  dob: string;
  grade: string;
  class: string;
  address: string;
  admissionNumber: string;
  admissionDate: string;
  profileImage: any;
  parent: Parent;
  parentName: string;
  parentEmail: string;
  parentContactNumber: string;
  relationship: string;
  achievementName: string;
  achievementDate: string;
  achievementDescription: string;

  constructor(
    private noticeService: NoticeService,
    public studentService: StudentService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.studentService.getStudentByUserId().subscribe(
      data => {
        console.log(data.students[0]);
        this.fullname = data.students[0].fullname;
        this.nameWithInitial = data.students[0].nameinitials;
        this.gender = data.students[0].gender;
        this.dob = data.students[0].dob;
        this.grade = data.students[0].grade;
        this.class = data.students[0].class;
        this.address = data.students[0].address;
        this.admissionNumber = data.students[0].admissionnumber;
        this.admissionDate = data.students[0].admissiondate;
        this.profileImage = data.students[0].profileImage;
        this.parent = data.students[0].parent;
        this.parentName = data.students[0].parent.fullname;
        this.parentEmail = data.students[0].parent.email;
        this.parentContactNumber = data.students[0].parent.contact;
        this.relationship = data.students[0].parent.relationship;
      },
      error => {
        handleResponseError(error);
      }
    );
    this.achievementName = "Olympiad 2010";
    this.achievementDate = "2019-08-12";
    this.achievementDescription = "sdcverhbrfgbfgbryfhbdggb";
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
