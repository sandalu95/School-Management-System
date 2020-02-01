import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { Assignment } from "../models/assignment";
import { TermTestMarks } from "../models/termtestmarks";
import { GetTermTestMarksResponse } from "../models/response/getTermTestMarks";
import { GetAssignmentMarksResponse } from '../models/response/getAssignmentMarksResponse';

@Injectable({
  providedIn: "root"
})
export class MarksService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/marks";
  // apiUrl: string = "http://localhost:3000/api/marks";

  constructor(private http: HttpClient) {}

  public saveAssignmentMarks(
    assignment: Assignment
  ): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.post<CommonResponse>(
      `${this.apiUrl}/assignment`,
      assignment,
      {
        headers: headers
      }
    );
  }

  public saveTermTestMarks(
    termTestMarks: TermTestMarks
  ): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.post<CommonResponse>(
      `${this.apiUrl}/termtest`,
      termTestMarks,
      {
        headers: headers
      }
    );
  }

  public getTermTestMarks(data): Observable<GetTermTestMarksResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("year", data.year);
    params = params.append("term", data.term);
    params = params.append("grade", data.grade);
    params = params.append("admissionNumber", data.admissionNumber);

    const options = {
      params: params,
      headers: headers
    };

    return this.http.get<GetTermTestMarksResponse>(`${this.apiUrl}/termtest`, options);
  }

  public getTermTestMarksForYear(data): Observable<GetTermTestMarksResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("year", data.year);
    params = params.append("grade", data.grade);
    params = params.append("admissionNumber", data.admissionNumber);

    const options = {
      params: params,
      headers: headers
    };

    return this.http.get<GetTermTestMarksResponse>(`${this.apiUrl}/termTestMarksForYear`, options);
  }

  public getAssignmentMarks(name:string, subject:string, gclass:string, grade:string): Observable<GetAssignmentMarksResponse>{
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("assignmentName", name);
    params = params.append("subject", subject);
    params = params.append("grade", grade);
    params = params.append("class", gclass);

    const options = {
      params: params,
      headers: headers
    };

    return this.http.get<GetAssignmentMarksResponse>(`${this.apiUrl}/assignment`, options);
  }
}
