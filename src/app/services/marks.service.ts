import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { Assignment } from "../models/assignment";
import { TermTestMarks } from "../models/termtestmarks";
import { GetTermTestMarksResponse } from "../models/response/getTermTestMarks";

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

  public getTermTestMarks(data): Observable<GetTermTestMarksResponse> {
    let params = new HttpParams();
    params = params.append("year", data.year);
    params = params.append("term", data.term);
    params = params.append("grade", data.grade);
    params = params.append("admissionNumber", data.admissionNumber);

    const options = {
      params: params,
      headers: this.headers
    };

    return this.http.get<GetTermTestMarksResponse>(`${this.apiUrl}/termtest`, options);
  }
}
