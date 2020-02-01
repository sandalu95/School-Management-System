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
  apiURL: string = "https://sms-web-service.herokuapp.com/api/salary";
  apiURLGetUsers: string =
    "https://sms-web-service.herokuapp.com/api/user/user";

  constructor(private http: HttpClient) {}

  public addSalary(salary: Salary): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.post<CommonResponse>(this.apiURL, salary, {
      headers: headers
    });
  }

  public getUsers(): Observable<GetUsersResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetUsersResponse>(this.apiURLGetUsers, {
      headers: headers
    });
  }

  public getSalaryByUser(
    year: string,
    month: string
  ): Observable<GetSalaryResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("year", year);
    params = params.append("month", month);

    const options = {
      params: params,
      headers: headers
    };
    return this.http.get<GetSalaryResponse>(`${this.apiURL}/byuser`, options);
  }
}
