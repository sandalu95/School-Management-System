import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Salary } from "../models/salary";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { GetUsersResponse } from "../models/response/getUsersResponse";

@Injectable({
  providedIn: "root"
})
export class SalaryService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/salary";
  apiURLGetUsers: string =
    "https://sms-web-service.herokuapp.com/api/user/user";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public addSalary(salary: Salary): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.apiURL, salary, {
      headers: this.headers
    });
  }
  public getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(this.apiURLGetUsers, {
      headers: this.headers
    });
  }
}
