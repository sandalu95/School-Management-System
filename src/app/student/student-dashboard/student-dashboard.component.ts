import { Component, OnInit } from "@angular/core";
import { Notice } from "src/app/models/notice";
import { Parent } from "src/app/models/parent";
import { StudentService } from "src/app/services/student.service";
import { NoticeService } from "src/app/services/notice.service";
import Swal from "sweetalert2";
import { AchivementService } from "src/app/services/achivement.service";
import { Competition } from "src/app/models/competition";

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"]
})
export class StudentDashboardComponent implements OnInit {
  notices: Notice[];

  achivements: Competition[];

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
  achievementPlace: string;
  achievementEvent: string;

  constructor(
    private noticeService: NoticeService,
    public studentService: StudentService,
    public achivementService: AchivementService
  ) {}

  ngOnInit() {
    this.getAllNotices();
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.studentService.getStudentByUserId().subscribe(
      data => {
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

    this.achivementService.getAchivementByUserId().subscribe(
      data => {
        this.achivements = data.achivement[0].extraCuricular;
        this.achivements = this.achivements.concat(data.achivement[0].other);

        this.achivements.sort((a, b) => (a.year < b.year ? 1 : -1));

        this.achievementName = this.achivements[0].competition;
        this.achievementDate = this.achivements[0].year;
        this.achievementPlace = this.achivements[0].place;
        this.achievementEvent = this.achivements[0].event;
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
