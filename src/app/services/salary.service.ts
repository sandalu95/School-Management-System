import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Salary } from "../models/salary";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/response/commonResponse";
import { GetUsersResponse } from "../models/response/getUsersResponse";
import { GetSalaryResponse } from "../models/response/getSalaryResponse";

@Injectable({
  providedIn: "root"
})
export class SalaryService {
  apiURL: string = "http://localhost:3000/api/salary";
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

  public getSalaryByUser(
    year: string,
    month: string
  ): Observable<GetSalaryResponse> {
    let params = new HttpParams();
    params = params.append("year", year);
    params = params.append("month", month);

    const options = {
      params: params,
      headers: this.headers
    };
    return this.http.get<GetSalaryResponse>(`${this.apiURL}/byuser`, options);
  }
}
