import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { Assignment } from "../models/assignment";

@Injectable({
  providedIn: "root"
})
export class MarksService {
  // assignmnetApiUrl: string =
  //   "https://sms-web-service.herokuapp.com/api/marks/assignment";
  assignmnetApiUrl: string = "http://localhost:3000/api/marks/assignment";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public saveAssignmentMarks(
    assignment: Assignment
  ): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.assignmnetApiUrl, assignment, {
      headers: this.headers
    });
  }
}
