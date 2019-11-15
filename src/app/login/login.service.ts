import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { LoginResponse } from "../models/response/loginResponse";
import { LoginRequest } from "../models/request/loginRequest";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/login";

  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiURL, loginRequest);
  }
}
