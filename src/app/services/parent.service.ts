import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Parent } from "../models/parent";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetParentResponse } from "../models/response/getParentsResponse";

@Injectable({
  providedIn: "root"
})
export class ParentService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/parent";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  private parentSource = new BehaviorSubject<Parent>(null);
  currentParent = this.parentSource.asObservable();

  constructor(private http: HttpClient) {}

  changeParent(parent: Parent) {
    this.parentSource.next(parent);
  }

  public getAllParents(): Observable<GetParentResponse> {
    return this.http.get<GetParentResponse>(this.apiURL, {
      headers: this.headers
    });
  }
}
