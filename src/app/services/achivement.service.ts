import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Achievement } from "../models/achievement";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { AddAchivementRequest } from "../models/request/addAchivementRequest";
import { Exam } from "../models/exam";
import { Competition } from "../models/competition";

@Injectable({
  providedIn: "root"
})
export class AchivementService {
  apiUrl: string = "http://localhost:3000/api/achivements";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public addAchivements(
    achivement: AddAchivementRequest
  ): Observable<CommonResponse> {
    const addAchivement = new AddAchivementRequest();
    addAchivement.studentId = achivement.studentId;
    if (achivement.extraCuricular != null) {
      addAchivement.extraCuricular = achivement.extraCuricular;
      addAchivement.aLevel = {};
      addAchivement.oLevel = {};
      addAchivement.other = {};
    } else if (achivement.other != null) {
      addAchivement.extraCuricular = {};
      addAchivement.aLevel = {};
      addAchivement.oLevel = {};
      addAchivement.other = achivement.other;
    } else if (achivement.oLevel != null) {
      addAchivement.extraCuricular = {};
      addAchivement.aLevel = {};
      addAchivement.oLevel = achivement.oLevel;
      addAchivement.other = {};
    } else if (achivement.aLevel != null) {
      addAchivement.extraCuricular = {};
      addAchivement.aLevel = achivement.aLevel;
      addAchivement.oLevel = {};
      addAchivement.other = {};
    }

    return this.http.post<CommonResponse>(this.apiUrl, addAchivement, {
      headers: this.headers
    });
  }
}
