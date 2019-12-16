import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { Assignment } from "../models/assignment";
import { TermTestMarks } from "../models/termtestmarks";

@Injectable({
  providedIn: "root"
})
export class MarksService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/marks";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public saveAssignmentMarks(
    assignment: Assignment
  ): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      `${this.apiUrl}/assignCment`,
      assignment,
      {
        headers: this.headers
      }
    );
  }

  public saveTermTestMarks(
    termTestMarks: TermTestMarks
  ): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      `${this.apiUrl}/termtest`,
      termTestMarks,
      {
        headers: this.headers
      }
    );
  }
}
