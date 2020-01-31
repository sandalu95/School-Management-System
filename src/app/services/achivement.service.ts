import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Achievement } from "../models/achievement";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { AddAchivementRequest } from "../models/request/addAchivementRequest";
import { Exam } from "../models/exam";
import { Competition } from "../models/competition";
import { GetAchivementResponse } from "../models/response/getAchivementResponse";

@Injectable({
  providedIn: "root"
})
export class AchivementService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/achivements";
  // apiUrl: string = "http://localhost:3000/api/achivements";

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

  public getAchivementByUserId(): Observable<GetAchivementResponse> {
    return this.http.get<GetAchivementResponse>(`${this.apiUrl}/byuserid`, {
      headers: this.headers
    });
  }

  public getAchivementByAddmissionNumber(addmissionNumber: string): Observable<GetAchivementResponse> {
    const options = {
      params: new HttpParams().set("addmissionNumber", addmissionNumber),
      headers: this.headers
    };

    return this.http.get<GetAchivementResponse>(`${this.apiUrl}/byaddmissionnumber`, options);
  }
}
