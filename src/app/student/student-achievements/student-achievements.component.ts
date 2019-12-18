import { Component, OnInit } from "@angular/core";
import { Result } from "src/app/models/result";
import { Achievement } from "src/app/models/achievement";
import { AchivementService } from "src/app/services/achivement.service";
import Swal from "sweetalert2";
import { Exam } from "src/app/models/exam";
import { Competition } from "src/app/models/competition";

@Component({
  selector: "app-student-achievements",
  templateUrl: "./student-achievements.component.html",
  styleUrls: ["./student-achievements.component.css"]
})
export class StudentAchievementsComponent implements OnInit {
  oLevelResults: Result[];
  aLevelResults: Result[];
  academicOther: Competition[];
  extraCurricular: Competition[];
  oLevelResultsLenght: number;
  aLevelResultsLenght: number;
  otherResultsLenght: number;

  constructor(private achivementService: AchivementService) {}

  ngOnInit() {
    this.achivementService.getAchivementByUserId().subscribe(
      data => {
        this.oLevelResultsLenght = data.achivement[0].aLevel.length;
        this.aLevelResultsLenght = data.achivement[0].oLevel.length;
        this.otherResultsLenght = data.achivement[0].other.length;
        console.log(this.oLevelResultsLenght);
        if (data.achivement.length > 0) {
          if (data.achivement[0].aLevel.length > 0) {
            this.aLevelResults = data.achivement[0].aLevel[0].results;
          }
          if (data.achivement[0].oLevel.length > 0) {
            this.oLevelResults = data.achivement[0].oLevel[0].results;
          }
          if (data.achivement[0].other.length > 0) {
            this.academicOther = data.achivement[0].other;
          }
          if (data.achivement[0].extraCuricular.length > 0) {
            this.extraCurricular = data.achivement[0].extraCuricular;
          }
        }
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  handleResponseError(error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
