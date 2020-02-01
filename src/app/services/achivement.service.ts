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

  constructor(private http: HttpClient) {}

  public addAchivements(
    achivement: AddAchivementRequest
  ): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

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
      headers: headers
    });
  }

  public getAchivementByUserId(): Observable<GetAchivementResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetAchivementResponse>(`${this.apiUrl}/byuserid`, {
      headers: headers
    });
  }

  public getAchivementByAddmissionNumber(addmissionNumber: string): Observable<GetAchivementResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("addmissionNumber", addmissionNumber),
      headers: headers
    };

    return this.http.get<GetAchivementResponse>(`${this.apiUrl}/byaddmissionnumber`, options);
  }
}
