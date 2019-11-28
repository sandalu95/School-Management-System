import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';
import { Achievement } from 'src/app/models/achievement';

@Component({
  selector: 'app-student-achievements',
  templateUrl: './student-achievements.component.html',
  styleUrls: ['./student-achievements.component.css']
})
export class StudentAchievementsComponent implements OnInit {
  oLevelResults:Result[];
  aLevelResults:Result[];
  academicOther:Achievement[];
  extraCurricular:Achievement[];

  constructor() { }

  ngOnInit() {
    this.oLevelResults = [
      {
        subject:"Maths",
        grade:"A"
      },
      {
        subject:"Science",
        grade:"A"
      },
      {
        subject:"Sinhala",
        grade:"A"
      },
      {
        subject:"Buddhism",
        grade:"A"
      },
      {
        subject:"English",
        grade:"A"
      },
      {
        subject:"History",
        grade:"A"
      },
      {
        subject:"Health",
        grade:"A"
      },
      {
        subject:"Drama",
        grade:"A"
      },
      {
        subject:"Tamil",
        grade:"A"
      }
    ];
    this.aLevelResults = [
      {
        subject:"Biology",
        grade:"A"
      },
      {
        subject:"Chemistry",
        grade:"A"
      },
      {
        subject:"Physics",
        grade:"A"
      },
      {
        subject:"English",
        grade:"A"
      }
    ];
    this.academicOther=[
      {
        year: "2010",
        competition: "Olympiad",
        event: "Science",
        place: "2nd",
        description:"dsfcew"
      },
      {
        year: "2011",
        competition: "All island Chem Quiz",
        event: "Chemistry",
        place: "1st",
        description:"dsfcewsfdc"
      },
      {
        year: "2012",
        competition: "Olympiad",
        event: "Maths",
        place: "3rd",
        description:"sedewscsa"
      }
    ];
    this.extraCurricular=[
      {
        year: "2009",
        competition: "All island inter-school",
        event: "Cricket",
        place: "1st",
        description:"dscsdfcwwe"
      },
      {
        year: "2011",
        competition: "All island inter-school",
        event: "Football",
        place: "2nd",
        description:"sfeewfdc"
      },
      {
        year: "2012",
        competition: "School sports meet",
        event: "Swimming",
        place: "3rd",
        description:"gyguytngb"
      }
    ];
  }

}
